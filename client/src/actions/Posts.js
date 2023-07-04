import * as api from '../api/index.js'

export const postContent = (postData, navigate) => async (dispatch) => {
  try{
    const { data } = await api.addPost(postData)
    dispatch({ type: "POST_CONTENT", payload: data })
    dispatch(fetchAllPosts())
    navigate('/Post')
  } catch (error){
        console.log(error)
  }
};


export const fetchAllPosts = () => async (dispatch) => {
  try {
    const { data } = await api.getAllPosts();
    dispatch({ type: "FETCH_ALL_POSTS", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = (id, navigate) => async (dispatch) => {
  try {
    api.deletePost(id)
    dispatch(fetchAllPosts())
    navigate('/Post')
  } catch (error) {
    console.log(error)
  }
};


export const postComment = (commentData) => async (dispatch) => {
  try {
    const { id, noOfComments, commentBody, userCommented } = commentData;
    const { data } = await api.postComment( id, noOfComments, commentBody, userCommented );
    dispatch({ type: "POST_COMMENT", payload: data });
    dispatch(fetchAllPosts());
  } catch (error) {
    console.log(error);
  }
};

export const deleteComment = (id, commentId, noOfComments) => async (dispatch) => {
  try {
    await api.deleteComment(id, commentId, noOfComments);
    dispatch(fetchAllPosts());
  } catch (error) {
    console.log(error);
  }
};

export const likePost = (id, value, userId) => async (dispatch) => {
  try {
    await api.likePost(id, value, userId);
    dispatch(fetchAllPosts());
  } catch (error) {
    console.log(error);
  }
};

export const sharePost = (id, value) => async (dispatch) => {
  try {
    await api.sharePost(id, value);
    dispatch(fetchAllPosts());
  } catch (error) {
    console.log(error);
  }
};