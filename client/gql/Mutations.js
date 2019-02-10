import gql from 'graphql-tag';

export default gql`
mutation($title: String) {
  addSong(title: $title){
    id
    title
  }
}
`;