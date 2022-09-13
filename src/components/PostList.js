import React from "react";
import Post from "./Post";
import PropTypes from "prop-types";

function PostList(props){
  return (
    <React.Fragment>
      <hr />
      {Object.values(props.PostList).map((Post) =>
        <Post
          whenPostClicked = { props.onPostSelection }
          userName={Post.userName}
          topic={Post.topic}
          postBody={Post.postBody}
          formattedWaitTime={Post.formattedWaitTime}
          id={Post.id}
          key={Post.id}/>
      )}
      {/* Don't forget to add the curly brace above — otherwise there will be a syntax error. */}
    </React.Fragment>
  );
}
PostList.propTypes = {
  // The PropType below has been updated — it's now an object, not an array.
  PostList: PropTypes.object,
  onPostSelection: PropTypes.func
};

export default PostList;