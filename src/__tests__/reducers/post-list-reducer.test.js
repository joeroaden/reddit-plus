import postListReducer from '../../reducers/post-list-reducer';

describe('postListReducer', () => {

const currentState = {
    1:{
    userName: 'Ryan',
    topic: 'stuff',
    postBody: 'Redux action is not working correctly.',
    id: 1
  }, 2: {
    userName: 'Jasmine',
    topic: 'more stuff',
    postBody: 'Reducer has side effects.',
    id: 1
  }
}

  let action;
  const postData = {
    userName: 'Ryan',
    topic: 'stuff',
    postBody: 'Redux action is not working correctly.',
    id: 1
  };
  
  test('Should return default state if there is no action type passed into the reducer', () => {
    expect(postListReducer({}, { type: null })).toEqual({});
  });

  test('Should successfully add new post data to mainPostList', () => {
    const { userName, topic, postBody, id } = postData;
    action = {
      type: 'ADD_POST',
      userName: userName,
      topic: topic,
      postBody: postBody,
      id: id
    };

    expect(postListReducer({}, action)).toEqual({
      [id] : {
        userName: userName,
        topic: topic,
        postBody: postBody,
        id: id
      }
    });
  });
    test('Should successfully delete a post', () => {
      action = {
        type: 'DELETE_POST',
        id: 1
      };
      expect(postListReducer(currentState, action)).toEqual({
        2: {
          userName: 'Jasmine',
          topic: 'more stuff',
          postBody: 'Reducer has side effects.',
          id: 1
        }
      })
  })
});