import { useState } from "react";
import "./adminPanel.css";
import AdminPost from "../../components/admin posts/AdminPost";
import AdminUsers from "../../components/admin users/AdminUsers";

export default function AdminPanel() {

    const [isUserSelected, setIsUserSelected] = useState(false);

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div className="admin-container">
      <aside className="admin-aside">
        <div className="admin-logo-container">
          <img
            className="admin-logo"
            src={PF + "/images/interplay_logo.webp"}
            alt=""
          />
        </div>

        <ul className="admin-list">
          <li className={`admin-users ${isUserSelected && "select"} `} onClick={() => setIsUserSelected(true)}>
            Users
          </li>
          <li className={`admin-posts ${!isUserSelected && 'select'}`} onClick={() => setIsUserSelected(false)}>Posts</li>
        </ul>
      </aside>

      <div className="admin-main">
        <div className="admin-title">
          <h1>Admin Panel</h1>
        </div>

        {isUserSelected && <AdminUsers />}
        {!isUserSelected && <AdminPost />}
      </div>
    </div>
  );
}
