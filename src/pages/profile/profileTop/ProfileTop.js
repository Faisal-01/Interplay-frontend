import "./profileTop.css"

export default function ProfileTop({user}) {

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div className="profile-top-container">
      <div className="images">
        <img
          className="cover-image"
          src={`${PF}${
            user.coverPic === ""
              ? "/images/default/defaultCover.jpg"
              : user.coverPic
          }`}
          alt=""
        />
        <img
          className="profile-image"
          src={`${PF}${
            user.profilePic === ""
              ? "/images/default/defaultProfile.png"
              : user.profilePic
          }`}
          alt=""
        />
      </div>

      <div className="user-info">
        <h1>{user.name}</h1>
        <p>
          {user.desc}
        </p>
      </div>
    </div>
  );
}
