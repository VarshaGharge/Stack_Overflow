import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";

import like from "../../assets/like.svg";
import post_comment from "../../assets/post_comment.svg";
import bin from "../../assets/bin.svg";
import share from "../../assets/share.svg";
import liked from "../../assets/liked.svg";
import Avatar from "../../components/Avatar/Avatar";
import "./Post.css";
import Comments from "./Comments";
import { deletePost, likePost, postContent, sharePost } from "../../actions/Posts.js";
import DisplayComments from "./DisplayComments";

const PostsDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleReShare = (post) => {
    dispatch(
      postContent({
        content: post.content,
        picture: post.picture,
        userPosted: User?.result?.name,
        userId: User?.result?._id,
      }, navigate),
    );
    dispatch(sharePost(post._id, "Share", navigate))
  };

  const [isLiked, setIsLiked] = useState(false);

  const postsList = useSelector((state) => state.postsReducer);

  const User = useSelector((state) => state.currentUserReducer);

  const handleDelete = (postId) => {
    dispatch(deletePost(postId, navigate));
  };

  const fetchUntilParent = (element) => {
    if (
      element &&
      element.parentElement &&
      (!element.className || !element.className.includes("post-content"))
    ) {
      return fetchUntilParent(element.parentElement);
    }
    return element;
  };

  const handleLike = (postId) => {
    dispatch(
      likePost(postId, isLiked ? "like" : "disLike", {
        userId: User.result._id,
      })
    );
    setIsLiked(!isLiked);
  };

  const toggleComment = (event) => {
    var element = fetchUntilParent(event.target);
    if (element) {
      var commentSection = element.querySelector("#commentSection");
      if (commentSection) {
        if (commentSection.style.display === "none") {
          commentSection.style.display = "block";
        } else {
          commentSection.style.display = "none";
        }
      }
    }
  };

  return (
    <div className="post-site">
      {postsList.data === null ? (
        <h1>Loading...</h1>
      ) : (
        <>
          {postsList.data
            .filter((post) => post._id)
            .sort((a, b) => moment(b.postedOn) - moment(a.postedOn))
            .map((post) => (
              <div key={post._id} post={post}>
                <div className="post-content">
                  <div className="user">
                    <Avatar
                      backgroundColor="#ef8236"
                      px="10px"
                      py="7px"
                      borderRadius="50%"
                    >
                      <Link
                        to={`/Users/${post.userId}`}
                        className="user-link"
                        style={{ color: "white", textDecoration: "none" }}
                      >
                        {post?.userPosted?.charAt(0).toUpperCase()}
                      </Link>
                    </Avatar>
                    <div className="name">{post.userPosted}</div>
                  </div>
                  <div style={{ width: "100%" }}>
                    <div className="post-body">
                      {post.content}
                      {post.picture && post.picture.includes("image") && (
                        <img
                          alt="Post"
                          src={post.picture}
                          accept="image/jpeg, image/png"
                        />
                      )}
                      {post.picture && post.picture.includes("video") && (
                        <video controls>
                          <source
                            src={post.picture}
                            type="video/mp4"
                            accept="video/mp4"
                          />
                        </video>
                      )}
                    </div>
                    <div className="post-time">
                      <p>Posted {moment(post.postedOn).fromNow()}</p>
                    </div>
                  </div>
                  <div className="post-components">
                    <div className="like-btn">
                      {post?.Like?.some(
                        (u) => u && User && u.userId === User.result._id
                      ) ? (
                        <button
                          type="button"
                          className="liked-btn"
                          onClick={() => handleLike(post._id, false)}
                        >
                          <img src={liked} alt="" width="18" />
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="like-btn"
                          onClick={() => handleLike(post._id, true)}
                        >
                          <img src={like} alt="" width="18" />
                        </button>
                      )}
                      {post?.Like?.length}
                    </div>
                    <div className="comment-btn" onClick={toggleComment}>
                      <button type="button">
                        <img src={post_comment} alt="" width="18" />
                      </button>
                      {post.noOfComments}
                    </div>
                      <div className="share-btn">
                        <button
                          type="button"
                          onClick={() => handleReShare(post)}
                        >
                          <img src={share} alt="" width="16" /> 
                        </button>
                        {post.share}
                      </div>
                      <div className="delete-btn">
                    {User?.result?._id === post?.userId && (
                        <button
                          type="button"
                          onClick={() => handleDelete(post._id)}
                        >
                          <img src={bin} alt="" width="14" />
                        </button>
                    )}
                     </div>
                  </div>
                  <div id="commentSection" style={{ display: "none" }}>
                    <Comments post={post} />
                    <section>
                      <DisplayComments key={post._id} post={post} />
                    </section>
                  </div>
                </div>
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default PostsDetails;
