const reducer = (state = {}, action) => {
  const { userName, topic, postBody, id } = action;
  switch (action.type) {
  case 'ADD_POST':
    return Object.assign({}, state, {
      [id]: {
        userName: userName,
        topic: topic,
        postBody: postBody,
        id: id
      }
    });
  case 'DELETE_POST':
    let newState = { ...state};
    delete newState[id];
    return newState;
  default:
  return state;
  }
};

export default reducer; 