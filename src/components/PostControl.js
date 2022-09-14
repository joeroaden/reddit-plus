import React from 'react';
import NewPostForm from './NewPostForm';
import PostList from './PostList';
import EditPostForm from './EditPostForm';
import { connect } from 'react-redux';
import PostDetail from './PostDetail';
import PropTypes from "prop-types";
import * as a from './../actions';
import { formatDistanceToNow } from 'date-fns';


class PostControl extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedPost: null,
      editing: false
    };
  }

  componentDidMount() {
    this.waitTimeUpdateTimer = setInterval(() =>
      this.updatePostElapsedWaitTime(),
    60000
    );
  }

  // componentDidUpdate() {
  //   console.log("component updated!");
  // }

  componentWillUnmount(){
    console.log("component unmounted!");
    clearInterval(this.waitTimeUpdateTimer);
  }

  updatePostElapsedWaitTime = () => {
    const { dispatch } = this.props;
    Object.values(this.props.mainPostList).forEach(post => {
        const newFormattedWaitTime = formatDistanceToNow(post.timeOpen, {
          addSuffix: true
        });
      const action = a.updateTime(post.id, newFormattedWaitTime);
      dispatch(action);
    });
  }


  handleClick = () => {
    if (this.state.selectedPost != null) {
      this.setState({
        selectedPost: null,
        editing: false
      });
    } else {
        const { dispatch } = this.props;
        const action = a.toggleForm()
        dispatch(action);
      };
    }
  

  handleDeletingPost = (id) => {
    const { dispatch } = this.props;
    const action = a.deletePost(id)
    dispatch(action);
    this.setState({selectedPost: null});
  }

  handleEditClick = () => {
    this.setState({editing: true});
  }


    handleEditingPostInList = (postToEdit) => {
      const { dispatch } = this.props;
      const action = a.addPost(postToEdit);
      dispatch(action);
      this.setState({
        editing: false,
        selectedPost: null
      });
    }



  handleAddingNewPostToList = (newPost) => {
    const { dispatch } = this.props;
    const action = a.addPost(newPost);
    dispatch(action);
    const action2 = a.toggleForm();
    dispatch(action2);
  };

  handleChangingSelectedPost = (id) => {
    const selectedPost = this.props.mainPostList[id];
    this.setState({selectedPost: selectedPost});
  }

  render(){
    let currentlyVisibleState = null;
    let buttonText = null; 
    if (this.state.editing ) {      
      currentlyVisibleState = <EditPostForm post = {this.state.selectedPost} onEditPost = {this.handleEditingPostInList} />
      buttonText = "Return to Post List";
    } else if (this.state.selectedPost != null) {
      currentlyVisibleState = <PostDetail 
      post={this.state.selectedPost} 
      onClickingDelete={this.handleDeletingPost}
      onClickingEdit = {this.handleEditClick} />
      buttonText = "Return to Post List";
    } else if (this.props.formVisibleOnPage) {
      currentlyVisibleState = <NewPostForm onNewPostCreation={this.handleAddingNewPostToList}/>;
      buttonText = "Return to Post List"; 
    } else {
      currentlyVisibleState = <PostList postList={this.props.mainPostList} onPostSelection={this.handleChangingSelectedPost} />;
      buttonText = "Add Post"; 
    }
    return (
      <React.Fragment>
        {currentlyVisibleState}
        <button onClick={this.handleClick}>{buttonText}</button> 
      </React.Fragment>
    );
  }
}

PostControl.propTypes = {
  mainPostList: PropTypes.object,
  formVisibleOnPage: PropTypes.bool
};

const mapStateToProps = state => {
  return {
    mainPostList: state.mainPostList,
    formVisibleOnPage: state.formVisibleOnPage
  }
}

PostControl = connect(mapStateToProps)(PostControl);

export default PostControl;

