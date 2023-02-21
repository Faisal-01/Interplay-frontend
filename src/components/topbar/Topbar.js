import {useState} from 'react';
import "./topbar.css";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import MessageIcon from "@mui/icons-material/Message";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import {Link} from 'react-router-dom';
import { useAppContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function Topbar() {

  const {state, rootPath, sidebarRef} = useAppContext();
  const [search, setSearch] = useState();
  const navigate = useNavigate();

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  function logoutHandler(){
    localStorage.removeItem("loginUser");
    navigate("/login");
  }

  async function searchHandler(e){
    e.preventDefault();
    navigate("/search/" + search);
  }

  function crossHandler(){
    sidebarRef.current.classList.remove('show');
  }

  function barsHandler() {
    sidebarRef.current.classList.add("show");

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

      <form className="search-container" onSubmit={searchHandler}>
        <SearchIcon className="search-icon" />

        <div className="search-input">
          <input
            type="text"
            placeholder="Search for friend"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </form>

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

      <div className="logout-container">
        <LogoutIcon className="logout" onClick={logoutHandler} />
      </div>

      <div className="bars" onClick={barsHandler}>
        <MenuIcon style={{ fontSize: "40px" }} />
      </div>

      <aside className="sidebar" ref={sidebarRef}>
        <div className="close" onClick={crossHandler}>
          <CloseIcon style={{ fontSize: "40px" }} />
        </div>

        <ul className="profile-items">
          <li className="profile-item">
            <Link to={`/profile/${state.user.username}`}>Profile</Link>
          </li>
          <li className="profile-item">
            <Link to="/search/a">Search</Link>
          </li>
          <LogoutIcon className="logout" onClick={logoutHandler} />
        </ul>
      </aside>
    </div>
  );
}
