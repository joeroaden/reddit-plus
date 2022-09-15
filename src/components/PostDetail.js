import React from "react";
import PropTypes from "prop-types";

function PostDetail(props){
  const { post, onClickingDelete } = props; //new code

  return (
    <React.Fragment>
      <h1>Post Details</h1>
      <h3>{post.topic} - {post.userName}</h3>
      <p><em>{post.postBody}</em></p>
      <button onClick= {() => props.onClickingUpVote(post.id)}>UpVote</button>
      <button onClick= {() => props.onClickingDownVote(post.id)}>DownVote</button>
      <button onClick={ props.onClickingEdit }>Update Post</button>
      <button onClick={()=> onClickingDelete(post.id) }>Delete Post</button> { /* new code */ }
      <button onClick={()=> props.onClickingSort() }>sort</button>
      <hr/>
    </React.Fragment>
  );
}

PostDetail.propTypes = {
  post: PropTypes.object,
  onClickingUpVote: PropTypes.func,
  onClickingDownVote: PropTypes.func,
  onClickingDelete: PropTypes.func,
  onClickingEdit: PropTypes.func,
  onClickingSort: PropTypes.func // new code
};

export default PostDetail;