import React from "react";
import ReusableForm from "./ReusableForm";
import PropTypes from "prop-types";

function EditPostForm (props) {
  const { post } = props;

  function handleEditPostFormSubmission(event) {
    event.preventDefault();
    props.onEditPost({
      userName: event.target.userName.value, 
      topic: event.target.topic.value, 
      postBody: event.target.postBody.value, 
      formattedWaitTime: post.formattedWaitTime,
      timeOpen: post.timeOpen,
      id: post.id
    });
  }

  return (
    <React.Fragment>
      <ReusableForm 
        formSubmissionHandler={handleEditPostFormSubmission} 
        buttonText="Update Post" />
    </React.Fragment>
  );
}

EditPostForm.propTypes = {
  onEditPost: PropTypes.func,
  post: PropTypes.object
};

export default EditPostForm;
