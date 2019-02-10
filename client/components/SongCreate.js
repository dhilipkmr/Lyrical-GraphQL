import React, { Component } from 'react';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';
import {Link, hashHistory} from 'react-router';
import mutation from '../gql/Mutations';
import query from '../gql/Queries';

class SongCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ''
    };
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.mutate({
      variables: {
        title : this.state.title
      },
      refetchQueries:[{ query: query}]
    }).then((resp) => {
      hashHistory.push('/');
    }).catch((err) => {
      console.log('Submit Error', err);
    });
  }

  render() {
    return (
      <div>
        <h3>New Song</h3>
        <form onSubmit={this.onSubmit.bind(this)}>
          <label>Song Title:</label>
          <input value={this.state.title} onChange={(e) => this.setState({ title : e.target.value})}/>
        </form>
        <Link to='/' className="waves-effect waves-light btn"> Back </Link>
      </div>
    );
  }
}

export default graphql(mutation)(SongCreate);