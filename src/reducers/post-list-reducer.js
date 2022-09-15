import * as c from './../actions/ActionTypes';


const reducer = (state = {}, action) => {
  const { userName, topic, postBody, id, formattedWaitTime, timeOpen, upVote, downVote } = action;
  switch (action.type) {
  case c.ADD_POST:
    return Object.assign({}, state, {
      [id]: {
        userName: userName,
        topic: topic,
        postBody: postBody,
        formattedWaitTime: formattedWaitTime,
        timeOpen: timeOpen,
        upVote: 0,
        downVote: 0,
        id: id
      }
    });
  case c.DELETE_POST:
    let newState = { ...state};
    delete newState[id];
    return newState;
  case c.UPDATE_TIME:
  const newPost = Object.assign({}, state[id], {formattedWaitTime});
  const updatedState = Object.assign({}, state, {
    [id]: newPost
  });
    return updatedState;
  default:
  return state;
  }
};


export default reducer; 