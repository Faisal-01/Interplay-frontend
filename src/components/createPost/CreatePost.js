import "./createPost.css";
import { useRef, useState, useEffect } from "react";
import { useAppContext } from "../../context/AuthContext";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";


export default function CreatePost({getTimeline}) {
  const chooseFile = useRef(null);
  const displayImage = useRef(null);
  const previewImageContainer = useRef(null);
  
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const [postDesc, setPostDesc] = useState("");

  const [file, setFile] = useState(null);

  const { state, rootPath } = useAppContext();

  const postHandler = async (e) => {
    e.preventDefault();

    const newPost = {
      userId: state.user._id,
      desc: postDesc,
    };

    if (file) {
      const fileData = new FormData();
      const fileName = new Date().getTime() + file.name;
      fileData.append("name", "/posts/" + fileName);
      fileData.append("file", file);
      newPost.img = "/images/posts/" + fileName;

      try {
        await axios.post(rootPath + "/upload", fileData);
      } catch (error) {
        console.log(error);
      }
    }

    try {
      await axios.post(rootPath + "/post", newPost);
      alert("Post uploaded successfully");
      getTimeline();
    } catch (error) {
      console.log(error);
    }

    setPostDesc("");
    setFile(null);
  };

  useEffect(() => {
    var textarea = document.querySelector("textarea");

    const myEvent = textarea.addEventListener("keydown", autosize);

    function autosize() {
      var el = this;
      setTimeout(function () {
        el.style.cssText = "height:auto; padding:0";
        // for box-sizing other than "content-box" use:
        // el.style.cssText = '-moz-box-sizing:content-box';
        el.style.cssText = "height:" + el.scrollHeight + "px";
      }, 0);
    }

    return removeEventListener("keydown", myEvent);
  }, []);

  function previewImage(e) {
    previewImageContainer.current.style.display = "flex";
    setFile(e.target.files[0]);
    var file = document.getElementById("file").files;
    if (file.length > 0) {
      var fileReader = new FileReader();

      fileReader.onload = function (event) {
        document
          .getElementById("preview")
          .setAttribute("src", event.target.result);
      };

      fileReader.readAsDataURL(file[0]);
    }
  }

  function cancelHandler() {
    chooseFile.current.value = "";
    setFile("");
    displayImage.current.src = "";
    previewImageContainer.current.style.display = "none";
  }
  return (
    <form className="add-post-container" onSubmit={postHandler}>
      <div className="add-post-top">
        <img
          src={
            state.user.profilePic
              ? PF + state.user.profilePic
              : PF + "/images/default/defaultProfile.png"
          }
          alt=""
        />
        <textarea
          className="add-post-input"
          placeholder={"What's in your mind " + state.user.name}
          onChange={(e) => setPostDesc(e.target.value)}
        />
      </div>

      <hr className="add-post-hr" />

      <div
        className="preview-container"
        style={{ display: "none" }}
        ref={previewImageContainer}
      >
        <img id="preview" ref={displayImage} />
        <div className="cancel">
          <CloseIcon
            style={{ fontSize: "40px", cursor: "pointer" }}
            onClick={cancelHandler}
          />
        </div>
      </div>

      <div className="add-post-bottom">
        <ul className="add-post-options">
          <li className="add-post-option">
            <label htmlFor="file">
              <InsertPhotoIcon style={{ color: "red" }} />
              <p>Photo</p>
            </label>

            <input
              type="file"
              id="file"
              ref={chooseFile}
              style={{ display: "none" }}
              accept="image/*"
              onChange={(e) => previewImage(e)}
            />
          </li>
          {/* <li className="add-post-option">
            <LocalOfferIcon style={{ color: "blue" }} />
            <p>Tag</p>
          </li>
          <li className="add-post-option">
            <LocationOnIcon style={{ color: "green" }} />
            <p>Location</p>
          </li>
          <li className="add-post-option">
            <SentimentVerySatisfiedIcon style={{ color: "goldenrod" }} />
            <p>Feelings</p>
          </li> */}
        </ul>

        <button type="submit" className="share-btn">
          Share
        </button>
      </div>
    </form>
  );
}
