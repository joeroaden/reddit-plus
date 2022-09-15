import React from 'react';
import NewPostForm from './NewPostForm';
import PostList from './PostList';
import EditPostForm from './EditPostForm';
import { connect } from 'react-redux';
import PostDetail from './PostDetail';
import PropTypes from "prop-types";
import * as a from './../actions';
import { formatDistanceToNow } from 'date-fns';
import { orderBy } from 'lodash'

class PostControl extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedPost: null,
      editing: false,
      collection: props,
       sortParams: {
         direction: undefined
      }
    }
    // this.handleClick = this.handleClick.bind(this);
  }
   handleColumnHeaderClick() {
     const {
      collection,
     sortParams: { direction }
   } = this.state;
     const sortDirection = direction === "desc" ? "asc" : "desc";
     const sortedCollection = orderBy(
      collection,
      ["upVote"]
      [sortDirection]
     )
     this.setState({
      collection: sortedCollection,
      sortParams: {
        direction:sortDirection
      }
     })
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

  // handleAddUpVote = (postToUpvote) => {
  //   const { dispatch } = this.props;
  //   const action = a.addPost(postToUpvote);
  //   // dispatch(action)
  //   const newUpVoteCount = (this.upVote + 1)
    // const selectedPost = this.props.selectedPost;
    // const add = Object.assign({}, selectedPost, {upVote: selectedPost.upVote + 1});
    // const editMainPost = this.props.mainPostList
    //   .filter(post => post.id !== this.props.selectedPost.id)
    //   .concat(add);
    // this.setState({
    //   mainPostList: editMainPost,
    //   selectedPost: add
  //   });
  // }

  // handleAddDownVote = () => {
  //   const selectedPost = this.state.selectedPost;
  //   const add = Object.assign({}, selectedPost, {downVote: selectedPost.downVote + 1});
  //   const editMainPost = this.state.mainPostList
  //     .filter(post => post.id !== this.state.selectedPost.id)
  //     .concat(add);
  //   this.setState({
  //     mainPostList: editMainPost,
  //     selectedPost: add
  //   });
  // }

  handleAddDownVote = (id) => {
    const setCount = this.props.mainPostList[id];
    setCount.downVote +=1;
    this.setState({setCount: setCount})
  }
  handleAddUpVote = (id) => {
    const setCount = this.props.mainPostList[id];
    setCount.upVote +=1;
    this.setState({setCount: setCount})
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
      onClickingEdit = {this.handleEditClick} 
      onClickingUpVote = {this.handleAddUpVote}
      onClickingDownVote = {this.handleAddDownVote}
      onClickingSort = {this.handleColumnHeaderClick}/>
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

