import React from "react";
import "./topbar.css";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import MessageIcon from "@mui/icons-material/Message";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import LogoutIcon from "@mui/icons-material/Logout";
import {Link} from 'react-router-dom';
import { useAppContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Topbar() {

  const {state} = useAppContext();
  const navigate = useNavigate();

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  function logoutHandler(){
    localStorage.removeItem("loginUser");
    navigate("/login");
  }

  return (
    <div className="topbar-container">
      <div className="logo-container">
        <Link to="/">
          <h1 className="logo">
            <img
              className="logo-image"
              src={`/assets/images/image.png`}
              alt=""
            />
          </h1>
        </Link>
      </div>

      <div className="search-container">
        <SearchIcon className="search-icon" />

        <div className="search-input">
          <input type="text" placeholder="Search for friend, post or video" />
        </div>
      </div>

      <div className="pages-container">
        <ul className="pages">
          <li>Home</li>
          <li>Timeline</li>
        </ul>
      </div>

      <div className="links-container">
        <ul className="links">
          <li>
            <PersonIcon className="link" />
            <div className="count">1</div>
          </li>
          <li>
            <MessageIcon className="link" />
            <div className="count">2</div>
          </li>
          <li>
            <NotificationsNoneIcon className="link" />
            <div className="count">1</div>
          </li>
        </ul>
      </div>

      <Link
        to={`/profile/${state.user.username}`}
        className="profile-pic-container"
      >
        <img
          className="profile-pic"
          src={
            state.user.profilePic
              ? PF + state.user.profilePic
              : PF + "/images/default/defaultProfile.png"
          }
          alt=""
        />
      </Link>

      <LogoutIcon className="logout" onClick={logoutHandler}/>
    </div>
  );
}
