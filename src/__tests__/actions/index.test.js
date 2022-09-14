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
      id: 1
    })).toEqual({
      type: c.ADD_POST,
      userName: 'Jo and Jasmine', 
      topic: 'coding', 
      postBody: 'Coding is fun!', 
      id: 1
    });
  });
});