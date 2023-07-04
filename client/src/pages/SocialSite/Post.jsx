import React from "react";

import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import AddPosts from "./AddPosts";
import PostsDetails from "./PostsDetails";
import "./Post.css";

const Post = () => {
  return (
    <div className="home-container-1">
      <LeftSidebar />
      <div className="site">
        <AddPosts />
        <PostsDetails />
        </div>
      </div>
  );
};

export default Post;
