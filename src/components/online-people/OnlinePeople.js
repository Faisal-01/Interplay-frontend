import "./online-people.css";
import { Link } from "react-router-dom";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

export default function OnlinePeople({person}) {
const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <Link to={'/profile/' + person.username}>
      <li className="friend">
        <img
          className="friend-image"
          src={
            person.profilePic
              ? PF + person.profilePic
              : PF + "/images/default/defaultProfile.png"
          }
          alt=""
        />
        <FiberManualRecordIcon className="online-icon" />
        <span>{person.name}</span>
      </li>
    </Link>
  );
}
