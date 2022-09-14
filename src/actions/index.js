import * as c from './../actions/ActionTypes';

export const deletePost = id => ({
  type: c.DELETE_POST,
  id
});
export const toggleForm = () => ({
  type: c.TOGGLE_FORM
});
export const addPost = (post) => {
  const { userName, topic, postBody, id } = post;
  return {
    type: c.ADD_POST,
    userName: userName,
    topic: topic,
    postBody: postBody,
    id: id
  }
}