import React, {Component} from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import {Link} from 'react-router';
import query from '../gql/songDetailsQuery';

class LyricCreate extends Component {
  constructor(props) {
    super(props);
    this.submitLyric = this.submitLyric.bind(this);
    this.updateLyric = this.updateLyric.bind(this);
    this.state={
      content: ''
    };
  }

  submitLyric(e) {
    e.preventDefault();
    this.props.mutate({
      variables: { "contentVal": this.state.content, "songId": this.props.id }
    }).then((resp) => {
      this.setState({ content: ''});
    })
  }

  updateLyric(e) {
    this.setState({ content: e.target.value });
  }

  render(){
    return (
      <div>
        <form onSubmit={this.submitLyric}>
          <label>Add a lyric</label>
          <input value={this.state.content} onChange={this.updateLyric}/>
        </form>
      </div>
    )
  }
}

const mutation = gql`
mutation addLyricToSong($contentVal: String, $songId: ID) {
  addLyricToSong(content: $contentVal, songId: $songId){
    id
    title,
    lyrics {
      id
      content
      likes
    }
  }
}
`;
export default graphql(mutation)(LyricCreate);