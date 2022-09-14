import React from "react";
import PropTypes from "prop-types";

function Post(props){

  return (
    <React.Fragment>
      <div onClick = {() => props.whenPostClicked(props.id)}>
        <h3>{props.topic} - {props.userName}</h3>
        <p><em>{props.postBody}</em></p>
        <p><em>{props.formattedWaitTime}</em></p>
        <hr/>
      </div>
    </React.Fragment>
  );
}

Post.propTypes = {
  userName: PropTypes.string,
  topic: PropTypes.string,
  postBody: PropTypes.string,
  id: PropTypes.string,
  formattedWaitTime: PropTypes.string,
  whenPostClicked: PropTypes.func
}

export default Post;