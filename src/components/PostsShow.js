import React from 'react';
import { connect } from 'react-redux'
import { fetchPost, deletePost } from '../actions'
import { Link } from 'react-router-dom'

class PostsShow extends React.Component {
  componentDidMount() {
    if (!this.props.posts) {
      const { id } = this.props.match.params
      this.props.fetchPost(id);
    }
  }

  OnDeleteClick = () => {
    const { id } = this.props.match.params
    this.props.deletePost(id, () => {
      this.props.history.push('/');
    });
  }

  render() {
    const { post } = this.props
    if (!post) { return <h1>LOADING</h1>; }
    return (
      <div>
        <Link to="/">Back to index </Link>

        <button onClick={this.OnDeleteClick}>Delete Post</button>
        <h3>{post.title}</h3>
        <h6>Cats: {post.categories}</h6>
        <p>{post.content}</p>
      </div>
    );
  }
}

// function mapStateToProps(state) {
//     return {
//         posts: state.posts
//     }
// }

// Destructured

function mapStateToProps({ posts }, ownProps) {
  return { post: posts[ownProps.match.params.id] }
}


export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow)