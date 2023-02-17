import React, {useState} from 'react';
import './leftbar.css';
import RssFeedIcon from "@mui/icons-material/RssFeed";
import ChatIcon from "@mui/icons-material/Chat";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import GroupsIcon from "@mui/icons-material/Groups";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import WorkIcon from "@mui/icons-material/Work";
import EventIcon from "@mui/icons-material/Event";
import SchoolIcon from "@mui/icons-material/School";
import Friends from '../friends/Friends';
import {people} from '../../dummydata/dummypeople';

export default function Leftbar() {
  const [personList] = useState(people);
  return (
      <section className="leftbar">
        <ul className="options">
          <li className="option">
            <RssFeedIcon className="option-icon" />
            <p>Feed</p>
          </li>
          <li className="option">
            <ChatIcon className="option-icon" />
            <p>Chat</p>
          </li>
          <li className="option">
            <VideoLibraryIcon className="option-icon" />
            <p>Videos</p>
          </li>
          <li className="option">
            <GroupsIcon className="option-icon" />
            <p>Groups</p>
          </li>
          <li className="option">
            <BookmarkIcon className="option-icon" />
            <p>Bookmarks</p>
          </li>
          <li className="option">
            <QuestionMarkIcon className="option-icon" />
            <p>Questions</p>
          </li>
          <li className="option">
            <WorkIcon className="option-icon" />
            <p>Jobs</p>
          </li>
          <li className="option">
            <EventIcon className="option-icon" />
            <p>Events</p>
          </li>
          <li className="option">
            <SchoolIcon className="option-icon" />
            <p>Courses</p>
          </li>
        </ul>

        <button className="options-show-more-btn">Show More</button>

        <hr className="leftbar-hr" />

        {/* <div className="leftbar-friends">
          {personList.map((friend) => {
            return <Friends key={friend.id} friend={friend}/>
          })}
          
        </div> */}
      </section>
  );
}
