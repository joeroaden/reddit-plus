import React from "react";
import PropTypes from "prop-types";

function Post(props){

  return (
    <React.Fragment>
      <div onClick = {() => props.whenPostClicked(props.id)}>
        <h3>{props.topic} - {props.userName}</h3>
        <p><em>{props.postBody}</em></p>
        <p><em>{props.formattedWaitTime}</em></p>
        <p><em>Upvotes: {parseInt(props.upVote)}</em></p>
        <p><em>Downvotes: {parseInt(props.downVote)}</em></p>
        <hr/>
      </div>
    </React.Fragment>
  );
}

Post.propTypes = {
  userName: PropTypes.string,
  topic: PropTypes.string,
  postBody: PropTypes.string,
  upVote: PropTypes.number,
  downVote: PropTypes.number,
  id: PropTypes.string,
  formattedWaitTime: PropTypes.string,
  whenPostClicked: PropTypes.func
}

export default Post;