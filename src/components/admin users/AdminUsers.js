import axios from "axios";
import { useState, useEffect } from "react";
import "./adminUsers.css";
import { useAppContext } from "../../context/AuthContext";

export default function AdminUsers() {
    const {rootPath} = useAppContext();
    const [allUsers, setAllUsers] = useState();

    async function getAllUsers(){
        try {
            const response = await axios.get(rootPath + "/user/all");
            setAllUsers(response.data);
        } catch (error) {
        console.log(error);
            
        }
    }

    useEffect(() => {
        getAllUsers();
    }, [])
  return (
    <div className="admin-user-container">
      <h1 className="admin-user-title">All Users</h1>

      {allUsers && (
        <table className="user-list">
            <thead>
          <tr className="admin-user">

            <th>Username</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
            </thead>
            <tbody>

          {allUsers.map((user) => {
              return (
              <tr className="admin-user" key={user._id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  <div className="admin-controllers">
                    <button>View</button>
                    <button>Delete</button>
                  </div>
                </td>
              </tr>
            );
        })}
        </tbody>
        </table>
      )}
    </div>
  );
}
