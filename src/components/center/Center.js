import React, { useState, useEffect, useCallback, useRef } from "react";
import "./center.css";
import CreatePost from "../createPost/CreatePost";
import Post from "../post/Post";
import axios from "axios";
import { useAppContext } from "../../context/AuthContext";
import NoPost from "../NoPost";

export default function Center({ user }) {

  
  const [postList, setPostList] = useState([]);

  const { state, rootPath } = useAppContext();

  const getTimeline = useCallback(async () => {
    try {
      const posts = user
        ? await axios.get(`${rootPath}/post/userposts/${user._id}`)
        : state.user._id && await axios.get(`${rootPath}/post/timeline/${state.user._id}`);
        const postsSorted = posts.data.posts.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt)
        })
      setPostList(postsSorted);
    } catch (error) {
      console.log(error);
    }
  }, [user, state.user._id]);

  

  useEffect(() => {
    getTimeline();
  }, [getTimeline]);

  

  return (
    <section className="center">
      {user === undefined ? (
        <CreatePost getTimeline={getTimeline}/>
      ) : (
        user.username === state.user.username && <CreatePost />
      )}

      {postList.length > 0 ? (
        postList.map((post) => {
          return <Post key={post._id} post={post} />;
        })
      ) : (
        <NoPost />
      )}
    </section>
  );
}
