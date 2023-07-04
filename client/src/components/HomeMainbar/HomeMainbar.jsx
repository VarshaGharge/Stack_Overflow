import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./HomeMainbar.css";
import QuestionList from "./QuestionList";
import { questionLimit } from "../../actions/question";

const HomeMainbar = () => {
  const location = useLocation();
  const user = useSelector(state => state.currentUserReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const questionsList = useSelector((state) => state.questionsReducer);

  const checkAuth = () => {
    if (user === null) {
      alert("login or signup to ask a question");
      return false;
    } 
    return true;
  };

  const validateLimit = () => {
    if(!checkAuth()){
      navigate("/Auth");
    }else {
      dispatch(questionLimit(user.result._id,navigate));
    }
  };

  return (
    <div className="main-bar">
      <div className="main-bar-header">
        {location.pathname === "/" ? (
          <h1>Top Questions</h1>
        ) : (
          <h1>All Questions</h1>
        )}
        <button onClick={validateLimit} className="ask-btn">
          Ask Question
        </button>
      </div>
      <div>
        {questionsList.data === null ? (
          <h1>Loading...</h1>
        ) : (
          <>
            <p>{questionsList.data.length} questions</p>
            <QuestionList questionsList={questionsList.data} />
          </>
        )}
      </div>
    </div>
  );
};

export default HomeMainbar;