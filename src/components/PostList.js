import React from "react";
import Post from "./Post";
import PropTypes from "prop-types";

function PostList(props){
  return (
    <React.Fragment>
      <hr />
      {Object.values(props.postList).map((post) =>
        <Post
          whenPostClicked = { props.onPostSelection }
          userName={post.userName}
          topic={post.topic}
          postBody={post.postBody}
          formattedWaitTime={post.formattedWaitTime}
          id={post.id}
          key={post.id}/>
      )}
    </React.Fragment>
  );
}
PostList.propTypes = {
  // The PropType below has been updated — it's now an object, not an array.
  PostList: PropTypes.object,
  onPostSelection: PropTypes.func
};

export default PostList;