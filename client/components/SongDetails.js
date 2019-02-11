import React, {Component} from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import {Link} from 'react-router';
import LyricCreate from './LyricCreate';
import query from '../gql/songDetailsQuery';

class SongDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  
  render() {
    const {song, lyrics} = this.props.data;
    // console.log(this.props.data.song.title);
    return (<div>
      {song && <h3>{song.title}</h3>}
      <h4>LYRICS</h4>
      <ul className="collection">
        {song && song.lyrics && song.lyrics.map((lyric, i)=> {
          return <li key={i} className="collection-item">{lyric.content}</li>
        })}
      </ul>
      <LyricCreate id={this.props.params.id}/>
      <Link to='/' className="waves-effect waves-light btn">Back</Link>
    </div>)
  }
}


export default graphql(query, {
  options: (props) => { return { variables: { id: props.params.id } } }
})(SongDetails);