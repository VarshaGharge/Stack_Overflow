import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Avatar from "../../components/Avatar/Avatar";
import bin from '../../assets/bin.svg'
import { deleteComment } from "../../actions/Posts";
import './Comments.css'

const DisplayComments = ({post}) => {

  var User = useSelector((state) => state.currentUserReducer);
  const dispatch = useDispatch()

  const handleDelete = (commentId, noOfComments) => {
    dispatch(deleteComment(post._id, commentId, noOfComments - 1));
  }

  return (
    <div className="comments">
      {post?.comment?.map((com) => (
        <div className="display-com" key={com._id}>
            <div className="post-comment">
                <div className="container">
                    <div className="post-actions-user">
                        <Link to={`/Users/${com.userId}`} style={{ color: "#0086d8", textDecoration:'none' }} >
                            <Avatar backgroundColor="lightgreen" px="8px" py="5px" borderRadius="4px" textDecoration='none'>
                                {com?.userCommented?.charAt(0).toUpperCase()}
                            </Avatar>
                        </Link>
                    </div>
                    <div className="component">
                    <div className="comment-body">
                        <p>{com.commentBody}</p>
                    </div>
                  <div className="delete-comment">
                  {
                      User?.result?._id === com?.userId && (
                          <button type="button" onClick={() => handleDelete(com._id, post.noOfComments)} style={{ backgroundColor: "white" }} >
                            <img src={bin} alt='' width='14'/>
                          </button>
                  )}
                  </div>
                  </div>
                </div>
                <div className="comment-time" >
                    <p>commented {moment(com.commentedOn).fromNow()}</p>
                </div>
            </div>
        </div>
      ))}
    </div>
  );
};

export default DisplayComments;
