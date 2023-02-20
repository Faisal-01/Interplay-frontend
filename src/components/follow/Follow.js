import "./follow.css";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useState, useEffect } from "react";
import { useAppContext } from "../../context/AuthContext";
import axios from "axios";

export default function Follow({ user }) {
  const { state, rootPath } = useAppContext();

  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    if (
      Object.keys(user).length !== 0 &&
      Object.keys(state.user).length !== 0
    ) {
      if (state.user.followings.includes(user._id)) {
        setIsFollowing(true);
        console.log(state.user, user);
      } else {
        setIsFollowing(false);
        console.log("not following");
      }
    }

    // console.log(state.user.followings.includes(user._id.toString()));
  }, [user, state.user]);

  async function followHandler() {
    try {
      if (isFollowing) {
        const response = await axios.patch(`${rootPath}/user/unfollow/${user._id}`, {
          userId: state.user._id,
        });
        localStorage.setItem("loginUser", JSON.stringify(response.data));
        setIsFollowing(false);
      } else {
        const response = await axios.patch(`${rootPath}/user/follow/${user._id}`, {
          userId: state.user._id,
        });
        localStorage.setItem("loginUser", JSON.stringify(response.data));

        setIsFollowing(true);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <button type="button" className="follow-btn" onClick={followHandler}>
      {!isFollowing ? (
        <div className="follow-div">
          <AddIcon /> Follow
        </div>
      ) : (
        <div className="follow-div">
          <RemoveIcon /> Unfollow
        </div>
      )}
    </button>
  );
}
