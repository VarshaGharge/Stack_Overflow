import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link,useNavigate } from "react-router-dom";

import Search from "../../assets/Search.svg";
import Avatar from "../../components/Avatar/Avatar";
import add_Friend from "../../assets/add-friend.svg";
import remove_Friend from "../../assets/remove-friend.svg";
import "./Friend.css";
import { addFriend } from "../../actions/users.js";

const FriendsList = () => {
  const users = useSelector((state) => state.usersReducer);
  const User = useSelector((state) => state.currentUserReducer);
  const currentUser = users.filter(u => u._id === User?.result?._id)[0];
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const patchFriend = (userId) => {
    dispatch(
      addFriend({ id: User?.result?._id, friendId: userId }, navigate));
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredUsers = users.filter((user) => {
    const searchValue = searchQuery.toLowerCase();
    return user.name.toLowerCase().includes(searchValue);
  });

  return (
    <div className="friends">
      <div className="search-1">
        <form>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
          <img src={Search} alt="search" width="18" className="search" />
          <button className="search-btn">
            <img src={Search} alt="search" width="18" />
          </button>
        </form>
        <div className="add-friends">
          <div className="friend-list-container">
            {filteredUsers
              .filter(
                (u) =>
                u?._id !== currentUser?._id && (!currentUser?.friend || !currentUser?.friend?.includes(u?._id))
              )
              .map((user) => (
                <div key={user.id}>
                  <div className="users">
                    <div className="name">
                      <div className="Avatar">
                      <Avatar
                        backgroundColor="#009dff"
                        px="10px"
                        py="7px"
                        borderRadius="50%"
                        textDecoration="none"
                      >
                        <Link
                          to={`/Users/${user._id} `}
                          style={{ color: "white", textDecoration: "none" }}
                        >
                          {user.name.charAt(0).toUpperCase()}
                        </Link>
                      </Avatar>
                      </div>
                      {user.name}
                      </div>
                    <div
                      className="friend-btn"
                      onClick={() => patchFriend(user._id)}
                    >
                      <button type="button" className="add-btn">
                        <img src={add_Friend} alt="" width="18" /> Follow
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <div className="friend-list-container">
            {filteredUsers
              .filter(
                (u) =>
                u?._id !== currentUser?._id &&  currentUser?.friend && currentUser?.friend?.includes(u?._id)
              )
              .map((user) => (
                <div key={user.id}>
                  <div className="users">
                    <div className="name">
                    <div className="Avatar">
                      <Avatar
                        backgroundColor="#009dff"
                        px="10px"
                        py="7px"
                        borderRadius="50%"
                        textDecoration="none"
                      >
                        <Link
                          to={`/Users/${user._id} `}
                          style={{ color: "white", textDecoration: "none" }}
                        >
                          {user.name.charAt(0).toUpperCase()}
                        </Link>
                      </Avatar>
                      </div>
                      {user.name}
                      </div>
                    <div
                      className="friend-btn"
                      onClick={() => patchFriend(user._id)}
                    >
                      <button type="button" className="remove-btn">
                        <img src={remove_Friend} alt="" width="18" /> UnFollow
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendsList;
