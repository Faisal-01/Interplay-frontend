import axios from "axios";
import { useState, useEffect } from "react";
import "./adminPost.css";
import { useAppContext } from "../../context/AuthContext";

export default function AdminUsers() {
  const [allPosts, setAllPosts] = useState();
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { state, rootPath } = useAppContext();

  async function getAllPosts() {
    try {
      const response = await axios.get(rootPath + "/post/all");
      setAllPosts(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllPosts();
  }, []);

  async function postDeleteHandler(id) {
    try {
      await axios.delete(
        `${rootPath}/post/${id}`,
        {
          data: {userId: state.user._id}
        }

      );
      alert("Post deleted successfully");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="admin-post-container">
      <h1 className="admin-post-title">All Posts</h1>

      {allPosts && (
        <table className="post-list">
          <thead>
            <tr className="admin-post">
              <th>Posted By</th>
              <th>Description</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {allPosts.map((post) => {
              return (
                <tr className="admin-post">
                  <td>{post.userId}</td>
                  <td>{post.desc}</td>
                  <td>
                    {post.img && (
                      <img className="admin-pics" src={PF + post.img} />
                    )}
                  </td>
                  <td>
                    <div className="admin-controllers">
                      <button>View</button>
                      <button onClick={() => postDeleteHandler(post._id)}>
                        Delete
                      </button>
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
