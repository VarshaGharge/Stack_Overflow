import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";


import './Comments.css'
import send from '../../assets/send.svg'
import { postComment } from '../../actions/Posts.js'

const Comments = ({post}) => {
    const dispatch = useDispatch()

    const [comment, setComment] = useState(' ') 

    var User = useSelector((state) => state.currentUserReducer);

    const handlePostCom = (e, commentLength, postId) => {
        e.preventDefault();
        dispatch(postComment({id :postId, noOfComments: commentLength + 1, commentBody: comment, userCommented: User?.result?.name}));
        setComment("");
    }

  return (
              <div className='comment'>
                  <div className="write">
                      <form onSubmit={(e) => {handlePostCom(e, post.comment.length, post._id);}}>
                          <input type='text' placeholder='Write a Comment!' value={comment} onChange={(e) => setComment(e.target.value)} />
                          <button type='submit' className='send-btn'><img src={send} alt='' width='18'/></button>
                      </form>
                  </div>
              </div>
  )
}

export default Comments
