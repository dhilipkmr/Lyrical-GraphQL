import React, {Component} from 'react';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';
import {Link, hashHistory} from 'react-router';
import query from '../gql/Queries';

class SongList extends Component {
  deleteSong(id) {
    this.props.mutate({
      variables: { id }
    }).then((res) => {
      this.props.data.refetch();
    }).catch((err) => {
      console.log(err);
    });
  }

  getSongDetails(id) {
    hashHistory.push('songs/' + id);
  }

  renderSongs() {
    const {data} = this.props;
    if (data.songs) {
      return data.songs.map((song, index) => {
        return (
          <li className="collection-item hp"key={song.id} onClick={() => this.getSongDetails(song.id)}>
            {song.title}
            <button className="right red btn waves-light" onClick={() => this.deleteSong(song.id)}>Delete</button>
          </li>
      );
    });
  }
  return null;
}

  render() {
    return (
      <div>
        <ul className="collection">
          {this.props.data.loading ? <div>Loading...</div>
          :this.renderSongs()}
        </ul>
        <Link to='songs/new' className="waves-effect waves-light btn">
          + Add New
        </Link>
      </div>
    );
  }
}

const mutation = gql`
mutation DeleteSong ($id: ID) {
  deleteSong(id: $id){
    id
  }
}`;

export default graphql(mutation)(
  graphql(query)(SongList)
); 