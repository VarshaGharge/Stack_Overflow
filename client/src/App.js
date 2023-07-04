import { BrowserRouter as Router } from 'react-router-dom'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';


import './App.css';
import Navbar from './components/Navbar/Navbar'
import AllRoutes from './AllRoutes' 
import { fetchAllQuestions } from './actions/question.js';
import { fetchAllUsers } from './actions/users.js';
import { fetchAllPosts } from './actions/Posts';
import { fetchAllPlans } from './actions/plans';
import Chat from './components/Chatbot/chat';

function App() {

  const dispatch = useDispatch()
 


  

  useEffect(() => {
    dispatch(fetchAllQuestions())
    dispatch(fetchAllPosts())
    dispatch(fetchAllUsers())
    dispatch(fetchAllPlans())
  }, [dispatch])

  return (
    <div className="App">
    <Router>
      <Navbar />
      <AllRoutes />
      {window.location.pathname !=='/Auth' && <Chat/>}
    </Router>
    </div>
    
  );
}

export default App;
