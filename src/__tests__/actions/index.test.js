import * as actions from './../../actions';
import * as c from './../../actions/ActionTypes';

describe('Post actions', () => {
  it('deletePost should create DELETE_POST action', () => {
    expect(actions.deletePost(1)).toEqual({
      type: c.DELETE_POST,
      id: 1
    });
  });
  it('toggleForm should create TOGGLE_FORM action', () => {
    expect(actions.toggleForm()).toEqual({
      type: c.TOGGLE_FORM
    });
  });
  it('addPost should create ADD_POST action', () => {
    expect(actions.addPost({
      userName: 'Jo and Jasmine', 
      topic: 'coding', 
      postBody: 'Coding is fun!', 
      timeOpen: 0,
      formattedWaitTime: 'les than a minute ago',
      id: 1
    })).toEqual({
      type: c.ADD_POST,
      userName: 'Jo and Jasmine', 
      topic: 'coding', 
      postBody: 'Coding is fun!', 
      timeOpen: 0,
      formattedWaitTime: 'les than a minute ago',
      id: 1
    });
  });
  it('updateTime should create UPDATE_TIME action', () => {
    expect(actions.updateTime(1, 'less than a minute ago')).toEqual({
      type: c.UPDATE_TIME,
      id: 1,
      formattedWaitTime: 'less than a minute ago'
    });
  });
});