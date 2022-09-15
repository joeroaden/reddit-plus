import React from "react";
import { v4 } from 'uuid';
import PropTypes from "prop-types"; 
import ReusableForm from "./ReusableForm";
import { formatDistanceToNow } from 'date-fns';

function NewPostForm(props){

  function handleNewPostFormSubmission(event) {
    event.preventDefault();
    props.onNewPostCreation({
      userName: event.target.userName.value, 
      topic: event.target.topic.value, 
      postBody: event.target.postBody.value, 
      id: v4(),
      timeOpen: new Date(),
      formattedWaitTime: formatDistanceToNow(new Date(), {
      addSuffix: true,
      upVote: 0,
      downVote: 0
      })
    });
  }

  return (
    <React.Fragment>
      <ReusableForm 
        formSubmissionHandler={handleNewPostFormSubmission}
        buttonText="new post" />
    </React.Fragment>
  );
}

NewPostForm.propTypes = {
  onNewPostCreation: PropTypes.func
};

export default NewPostForm;