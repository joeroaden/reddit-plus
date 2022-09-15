import postListReducer from '../../reducers/post-list-reducer';
import * as c from '../../actions/ActionTypes';
import { formatDistanceToNow } from 'date-fns';

describe('postListReducer', () => {

const currentState = {
    1:{
    userName: 'Ryan',
    topic: 'stuff',
    postBody: 'Redux action is not working correctly.',
    upVote: 0,
    downVote: 0,
    id: 1
  }, 2: {
    userName: 'Jasmine',
    topic: 'more stuff',
    postBody: 'Reducer has side effects.',
    upVote: 0,
    downVote: 0,
    id: 1
  }
}

  let action;
  const postData = {
    userName: 'Ryan',
    topic: 'stuff',
    postBody: 'Redux action is not working correctly.',
    upVote: 0,
    downVote: 0,
    timeOpen : new Date(),
    formattedWaitTime: formatDistanceToNow(new Date(), {
      addSuffix: true
    }),
    id: 1
  };
  
  test('Should return default state if there is no action type passed into the reducer', () => {
    expect(postListReducer({}, { type: null })).toEqual({});
  });

  test('should successfully add a post to the post list that includes date-fns-formatted wait times', () => {
    const { userName, topic, postBody, timeOpen, formattedWaitTime, upVote, downVote, id } = postData;
    action = {
      type: c.ADD_POST,
      userName: userName,
      topic: topic,
      postBody: postBody,
      timeOpen: timeOpen,
      upVote: upVote,
      downVote: downVote,
      formattedWaitTime: formattedWaitTime,
      id: id
    };
    expect(postListReducer({}, action)).toEqual({
      [id] : {
        userName: userName,
        topic: topic,
        postBody: postBody,
        timeOpen: timeOpen,
        formattedWaitTime: 'less than a minute ago',
        upVote: upVote,
        downVote: downVote,
        id: id
      }
    });
  });
  
    test('Should successfully delete a post', () => {
      action = {
        type: c.DELETE_POST,
        id: 1
      };
      expect(postListReducer(currentState, action)).toEqual({
        2: {
          userName: 'Jasmine',
          topic: 'more stuff',
          postBody: 'Reducer has side effects.',
          upVote: 0,
          downVote: 0,
          id: 1
        }
      });
    });
  

    test('Should add a formatted wait time to post entry', () => {
      const { userName, topic, postBody, timeOpen, upVote, downVote, id } = postData;
      action = {
        type: c.UPDATE_TIME,
        formattedWaitTime: '4 minutes ago',
        id: id
      };
      expect(postListReducer({ [id] : postData }, action)).toEqual({
        [id] : {
          userName: userName,
          topic: topic,
          postBody: postBody,
          timeOpen: timeOpen,
          upVote: upVote,
          downVote: downVote,
          id: id,
          formattedWaitTime: '4 minutes ago'
        }
      });
    });
  });