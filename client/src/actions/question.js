
import * as api from '../api/index.js'

export const askQuestion = (questionData, navigate) => async (dispatch) => {
  try{
    const { data } = await api.postQuestion(questionData)
    dispatch({ type: "POST_QUESTION", payload: data })
    dispatch(fetchAllQuestions())
    navigate('/')
  } catch (error){
        console.log(error)
  }
};

export const fetchAllQuestions = () => async (dispatch) => {
  try {
    const { data } = await api.getAllQuestions();
    dispatch({ type: "FETCH_ALL_QUESTIONS", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const questionLimit = (userId,navigate) => async (dispatch) => {
  try {
    console.log("Here",userId);
    const { data } = await api.questionLimit(userId);
    if(data.limitExceeded){
      alert("You've reached your daily limit");
    }else{
      navigate("/AskQuestion");
    }
  } catch (error) {
    console.log(error)
  }
}

export const voteQuestion = (id, value) => async (dispatch) => {
  try {
    await api.voteQuestion(id, value);
    dispatch(fetchAllQuestions());
  } catch (error) {
    console.log(error);
  }
};

export const deleteQuestion = (id, navigate) => async (dispatch) => {
  try {
    api.deleteQuestion(id)
    dispatch(fetchAllQuestions())
    navigate('/')
  } catch (error) {
    console.log(error)
  }
};

export const postAnswer = (answerData) => async (dispatch) => {
  try {
    const { id, noOfAnswers, answerBody, userAnswered } = answerData;
    const { data } = await api.postAnswer( id, noOfAnswers, answerBody, userAnswered );
    dispatch({ type: "POST_ANSWER", payload: data });
    dispatch(fetchAllQuestions());
  } catch (error) {
    console.log(error);
  }
};

export const deleteAnswer = (id, answerId, noOfAnswers) => async (dispatch) => {
  try {
    await api.deleteAnswer(id, answerId, noOfAnswers);
    dispatch(fetchAllQuestions());
  } catch (error) {
    console.log(error);
  }
};