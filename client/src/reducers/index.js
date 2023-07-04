import { combineReducers } from "redux";
import authReducer from "./auth";
import currentUserReducer from './currentUser'
import questionsReducer from './questions.js'
import usersReducer from "./users";
import postsReducer from "./posts";
import planReducer from "./plan";
import subReducer from "./subs";

export default combineReducers({
    authReducer, currentUserReducer, questionsReducer, usersReducer, postsReducer, planReducer, subReducer
})