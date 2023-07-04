import axios from 'axios'

const API = axios.create({ baseURL: 'http://localhost:5000' })

API.interceptors.request.use((req) => {
    if (localStorage.getItem("Profile")) {req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem("Profile")).token}`;
    }
    return req;
  });

export const logIn = (authData) => API.post('/user/login', authData);
export const signUp = (authData) => API.post('/user/signup', authData);


export const postQuestion = (questionData) => API.post('/questions/Ask', questionData);
export const getAllQuestions = () => API.get('/questions/get');
export const deleteQuestion = (id) => API.delete(`/questions/delete/${id}`)
export const voteQuestion = (id, value) => API.patch(`/questions/vote/${id}`, { value });
export const questionLimit = (userId) => API.post('/questions/limit', {userId})

export const postAnswer = (id, noOfAnswers, answerBody, userAnswered) =>API.patch(`/answer/post/${id}`, { noOfAnswers, answerBody, userAnswered });
export const deleteAnswer = (id, answerId , noOfAnswers) => API.patch(`/answer/delete/${id}`, {answerId, noOfAnswers})

export const getAllUsers = () => API.get("/user/getAllUsers");
export const updateProfile = (id, updateData) => API.patch(`/user/update/${id}`, updateData);
export const updatePlan = (id, plan, planDate) => API.post(`/user/updatePlan/${id}`, {plan, planDate});

export const addPost = (postData) => API.post('/posts/postUpload', postData);
export const getAllPosts = () => API.get('/posts/see');
export const deletePost = (id) => API.delete(`/posts/delete/${id}`)
export const likePost = (id, value, userId) => API.patch(`/posts/vote/${id}`, { value, userId });
export const sharePost = (id, value) => API.patch(`/posts/share/${id}`, { value });

export const postComment = (id, noOfComments, commentBody, userCommented) =>API.patch(`/comment/post/${id}`, { noOfComments, commentBody, userCommented });
export const deleteComment = (id, commentId, noOfComments) => API.patch(`/comment/delete/${id}`, {commentId, noOfComments})


export const getAllPlans = () => API.get('/plans/get');

export const addSub = (subData) => API.post('/payment/success', subData)

export const addFriend = ( id, friendId ) => API.post(`/friends/Add/${id}`, {friendId})

