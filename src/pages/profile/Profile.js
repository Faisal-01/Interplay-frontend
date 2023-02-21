import "./profile.css";
import ProfileTop from './profileTop/ProfileTop';
import Center from '../../components/center/Center';
import ProfileIntro from './profileIntro/ProfileIntro';
import Topbar from "../../components/topbar/Topbar";

import {useState, useEffect, useCallback} from 'react';
import axios from 'axios';
import { useParams } from "react-router";
import { useAppContext } from "../../context/AuthContext";

export default function Profile() {

  const [user, setUser] = useState({});
  const {rootPath, sidebarRef} = useAppContext();

  const params = useParams();

  const getUser = useCallback(async () => {
    try {
      const myUser = await axios.get(`${rootPath}/user?username=${params.username}`);
      setUser(myUser.data.others);
    } catch (error) {
      console.log(error);
    }
  }, [params.username]);

  useEffect(() => {
    getUser()
  }, [getUser])

  useEffect(() => {
    sidebarRef.current.classList.remove("show");
  }, []);

  return (
    <div className="profile-container">
      <Topbar user={user} />
      <ProfileTop user={user} />
      <div className="profile-center">
        <ProfileIntro user={user} />
        <Center user={user} />
      </div>
    </div>
  );
}
