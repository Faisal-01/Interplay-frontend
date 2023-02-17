import "./friends.css"

export default function Friends({friend}) {
const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div className="leftbar-friend">
      <img src={PF + friend.image} alt="" />
      <p>{friend.name}</p>
    </div>
  );
}
