import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import image from "../../assets/image.png";
import friends from "../../assets/friends.svg";
import Avatar from "../../components/Avatar/Avatar";
import { postContent } from "../../actions/Posts";
import "./Post.css";

const AddPosts = () => {
  const [content, setContent] = useState("");
  var [picture, setPicture] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFile = (event) => {
    setPicture(event.target.files[0]);
    console.log(event.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!content && !picture){
      return;
    }
    const formData = new FormData();
    if(picture){
      formData.append("picture", picture);

      const reader = new FileReader();
      reader.readAsDataURL(picture);
      reader.onloadend = async () => {
        const fileData = reader.result;
        postData(content,fileData);
      };
    }else{
      postData(content,"");
      setPicture(null);
      setContent("");
    }
   
  };

  function postData(content,fileData){
    try {
      dispatch(
        postContent(
          {
            picture: fileData,
            content,
            userPosted: User?.result?.name,
            userId: User?.result?._id,
          },
          navigate
        )
      );
    } catch (error) {
    }
  }

  var User = useSelector((state) => state.currentUserReducer);

  return (
      <div className="post">
        <div className="post-container">
          <Avatar
            backgroundColor="#ef8236"
            fontWeight="bolder"
            px="10px"
            py="7px"
            borderRadius="50%"
          >
            <Link
              to={`/Users/${User?.result?._id} `}
              style={{ color: "white", textDecoration: "none" }}
            >
              {User?.result?.name.charAt(0).toUpperCase()}
            </Link>
          </Avatar>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="What's on your mind?"
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
              }}
            />
            <label htmlFor="upload" className="nav-item nav-btn">
              <img src={image} alt="home" width="30" />
              <input
                type="file"
                id="upload"
                name="upload"
                multiple={false}
                style={{ display: "none" }}
                onChange={handleFile}
              />
            </label>
            <button type="submit">POST</button>
          </form>
        </div>
        <hr />
        <nav className="Nav">
          <div className="post-nav">
            <Link to="/Post/Add_Friends" className="nav-item nav-btn">
              <img src={friends} alt="home" width="20" /> Add Friends
            </Link>
          </div>
        </nav>
      </div>
  );
};

export default AddPosts;
