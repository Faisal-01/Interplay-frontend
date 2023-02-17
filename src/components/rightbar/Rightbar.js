import React, { useEffect, useState } from 'react'
import './rightbar.css';
import OnlinePeople from '../online-people/OnlinePeople';
import axios from 'axios';

export default function Rightbar() {
  const [allUsers, setAllUsers] = useState();

  useEffect(() => {
    const getAllUsers = async () => {
      const response = await axios.get("/user/all");
      setAllUsers(response.data);
    }

    getAllUsers();
  }, [])

  return (
    <section className="rightbar">
      <h1 className="rightbar-title">All Users</h1>

      <ul className="online-friends">
        {allUsers && allUsers.map((person) => {
          return <OnlinePeople key={person._id} person={person}/> 
        })}
      </ul>
    </section>
  );
}
