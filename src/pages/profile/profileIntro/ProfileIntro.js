import "./profileIntro.css";
import {useState} from 'react';
// import {people} from '../../../dummydata/dummypeople';
import Follow from "../../../components/follow/Follow";
import { useAppContext } from "../../../context/AuthContext";
import { useEffect } from "react";
import axios from "axios";
import {Link} from 'react-router-dom';

export default function ProfileIntro({user}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [personFollowings, setPersonFollowings] = useState();
  const [personFollowers, setPersonFollowers] = useState();

  const {state, rootPath} = useAppContext();

  useEffect(() => {
    async function getFollowings(){
      const response = await axios.get(`${rootPath}/user/following/${user._id}`);
      setPersonFollowings(response.data);
    }
    async function getFollowers() {
      const response = await axios.get(`${rootPath}/user/follower/${user._id}`);
      setPersonFollowers(response.data);
    }
    if(Object.keys(user).length !== 0 )
    {
      getFollowers();
      getFollowings();
    }
  }, [user])

  return (
    <div className="profile-intro-container">
      {!(state.user._id === user._id) && <Follow user={user} />}
      <h1 className="profile-intro-heading">Introduction</h1>

      <span className="country">Country: {user.country}</span>
      <span className="city">City: {user.city}</span>
      <span className="relationship">Relationship: {user.relationship}</span>

      <h1 className="user-friend-heading">User Followings</h1>
      <div className="user-friends">
        {personFollowings && (personFollowings.length === 0 ? <p>Nothing to show</p> :
          personFollowings.map((person) => {
            return (
              <Link
                to={`/profile/${person.username}`}
                className="user-friend-div"
              >
                <img
                  key={person._id}
                  className="user-friend"
                  src={
                    person.profilePic
                      ? PF + person.profilePic
                      : PF + "/images/default/defaultProfile.png"
                  }
                  alt=""
                />

                <p style={{ textAlign: "center", color: "black" }}>{person.name}</p>
              </Link>
            );
          }))}
      </div>

      <h1 className="user-friend-heading">User Followers</h1>
      <div className="user-friends">
        {personFollowers && (personFollowers.length === 0 ? <p>Nothing to show</p> :
          personFollowers.map((person) => {
            return (
              <Link
                to={`/profile/${person.username}`}
                className="user-friend-div"
              >
                <img
                  key={person._id}
                  className="user-friend"
                  src={
                    person.profilePic
                      ? PF + person.profilePic
                      : PF + "/images/default/defaultProfile.png"
                  }
                  alt=""
                />

                <p style={{ textAlign: "center", color: "black" }}>{person.name}</p>
              </Link>
            );
          }))}
      </div>
    </div>
  );
}
