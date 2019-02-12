import React, {Component} from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import {Link} from 'react-router';
import LyricCreate from './LyricCreate';
import query from '../gql/songDetailsQuery';

class SongDetails extends Component {
  constructor(props) {
    super(props);
    this.onLike = this.onLike.bind(this);
  }
  
  onLike(id, likes) {
    this.props.mutate({
      variables: { id: id },
      optimisticResponse: {
        __typename: 'Mutation',
        likeLyric: {
          __typename: 'LyricType',
          id: id,
          likes: likes + 1
        }
      }
    }).then((resp) => {
      console.log('Liked', resp)
    });
  }

  render() {
    const {song, lyrics} = this.props.data;
    // console.log(this.props.data.song.title);
    return (<div>
      {song && <h3>{song.title}</h3>}
      <h4>LYRICS</h4>
      <ul className="collection">
        {song && song.lyrics && song.lyrics.map((lyric, i)=> {
          return (
            <li key={lyric.id} className="collection-item">
              {lyric.content}
              <i className="material-icons right" onClick={()=> this.onLike(lyric.id, lyric.likes)}>thumb_up</i>
              <span className="right ">{lyric.likes}</span>
            </li>
          );
        })}
      </ul>
      <LyricCreate id={this.props.params.id}/>
      <Link to='/' className="waves-effect waves-light btn">Back</Link>
    </div>)
  }
}

const likeMutation = gql`
mutation likeLyric($id: ID) {
  likeLyric(id: $id){
    id
    likes
    content
  }
}`;

export default graphql(likeMutation) (
  graphql(query, {
    options: (props) => { return { variables: { id: props.params.id } } }
  })(SongDetails)
);