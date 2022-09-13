import React from "react";
import PropTypes from "prop-types";

function PostDetail(props){
  const { post, onClickingDelete } = props; //new code

  return (
    <React.Fragment>
      <h1>Post Details</h1>
      <h3>{post.topic} - {post.userName}</h3>
      <p><em>{post.postBody}</em></p>
      <button onClick={ props.onClickingEdit }>Update Post</button>
      <button onClick={()=> onClickingDelete(post.id) }>Delete Post</button> { /* new code */ }
      <hr/>
    </React.Fragment>
  );
}

PostDetail.propTypes = {
  post: PropTypes.object,
  onClickingDelete: PropTypes.func,
  onClickingEdit: PropTypes.func // new code
};

export default PostDetail;