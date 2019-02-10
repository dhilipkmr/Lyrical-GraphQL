import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-client';
import {ApolloProvider} from 'react-apollo';
import SongList from './components/SongLIst';
import App from './components/App';
import SongCreate from './components/SongCreate';
import {Router, Route, hashHistory, IndexRoute} from 'react-router';
import SongDetails from './components/SongDetails';

const apolloClient = new ApolloClient({});
const Root = () => {
  
  return (
    <ApolloProvider client={apolloClient}>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={SongList}/>
          <Route path='songs/new' component={SongCreate}></Route>
          <Route path='songs/:id' component={SongDetails}></Route>
        </Route>
      </Router>
    </ApolloProvider>
  );
};

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
);
