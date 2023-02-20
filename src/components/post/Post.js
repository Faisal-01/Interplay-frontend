import { useEffect, useState, useCallback } from "react";
import "./post.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import CommentIcon from "@mui/icons-material/Comment";
import ShortcutIcon from "@mui/icons-material/Shortcut";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAppContext } from "../../context/AuthContext";

export default function Post({ post }) {
  const { state, rootPath } = useAppContext();

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const [user, setUser] = useState({});

  const [likes, setLikes] = useState(post.likes.length);

  const [isLiked, setIsLiked] = useState(false);

  const getUser = useCallback(async () => {
    try {
      const user = await axios.get(`${rootPath}/user?id=${post.userId}`);
      setUser(user.data.others);
    } catch (error) {
      console.log(error);
    }
  }, [post.userId]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  function getDate(date) {
    var delta = Math.round((+new Date() - new Date(date).getTime()) / 1000);

    var minute = 60,
      hour = minute * 60,
      day = hour * 24,
      week = day * 7,
      month = week * 4,
      year = month * 12;

    var fuzzy;

    if (delta < 30) {
      fuzzy = "just then.";
    } else if (delta < minute) {
      fuzzy = delta + " seconds ago.";
    } else if (delta < 2 * minute) {
      fuzzy = "a minute ago.";
    } else if (delta < hour) {
      fuzzy = Math.floor(delta / minute) + " minutes ago.";
    } else if (Math.floor(delta / hour) === 1) {
      fuzzy = "1 hour ago.";
    } else if (delta < day) {
      fuzzy = Math.floor(delta / hour) + " hours ago.";
    } else if (delta < day * 2) {
      fuzzy = "yesterday";
    } else if (delta < week) {
      fuzzy = "1 week ago";
    } else if (delta < week * 2) {
      fuzzy = "2 weeks ago";
    } else if (delta < week * 3) {
      fuzzy = "3 weeks ago";
    } else if (delta < month) {
      fuzzy = "1 month ago";
    } else if (delta < year) {
      fuzzy = "1 year ago";
    }

    return fuzzy;
  }

  async function likeHandler() {
    try {
      const response = await axios.patch(`${rootPath}/post/${post._id}/like`, {
        userId: state.user._id,
      });
      setLikes(response.data.length);
      setIsLiked(response.data.isLiked);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    
    if(post.likes.includes(state.user._id)){
      setIsLiked(true);
    }

  }, [])

  return (
    <div className="post-container">
      <div className="post-top-container">
        <div className="post-top">
          <Link to={`/profile/${user.username}`}>
            <img
              className="post-user-image"
              src={`${PF}${
                user.profilePic === ""
                  ? "/images/default/defaultProfile.png"
                  : user.profilePic
              }`}
              alt=""
            />
          </Link>
          <span className="post-username">{user.name}</span>
          <p className="post-time">{getDate(post.createdAt)}</p>
        </div>
        <MoreVertIcon style={{ fontSize: "30px" }} />
      </div>

      <div className="post-middle">
        <div className="post-description">
          <p>{post.desc}</p>
        </div>
        <img className="post-image" src={PF + post.img} alt="" />
      </div>

      <div className="post-bottom">
        <div className="post-counts">
          <div className="like-counts">{likes}</div>

          <div className="comments-count">{post.comments}</div>
        </div>

        <div className="post-attributes">
          <div onClick={likeHandler} className="attribute">
            <ThumbUpAltIcon style={{color: isLiked ? 'blue' : 'black'}}/>
            Like
          </div>

          <div className="attribute">
            <CommentIcon />
            Comment
          </div>

          <div className="attribute">
            <ShortcutIcon />
            Share
          </div>
        </div>
      </div>
    </div>
  );
}
