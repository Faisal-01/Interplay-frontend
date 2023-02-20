import "./login.css";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAppContext } from "../../context/AuthContext";

import { useNavigate } from "react-router-dom";
import Error from "../../components/error";
// import { Air } from "@mui/icons-material";

export default function Login() {
  const { state, dispatch } = useAppContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    let response;
    try {
      response = await axios.post(
        "https://interplay-backend.vercel.app/api/v1/login",
        {
          email: email,
          password: password,
        }
      );

      localStorage.setItem("loginUser", JSON.stringify(response.data));

      dispatch({ type: "SUCCESS", payload: response.data });

      navigate("/");
    } catch (e) {
      dispatch({ type: "ERROR", payload: e.response.data });

      console.log(e);
    }
  };

  return (
    <div className="login-container">
      <div className="login-heading">
        <h1 className="login-title">Interplay</h1>

        <span className="login-text">Connect with your friends and family</span>
      </div>

      <div className="login-credentials">
        <form className="login-form" onSubmit={submitHandler}>
          <input
            required
            className="login-email"
            type="email"
            placeholder="Enter Email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            required
            // minLength={4}
            className="login-password"
            type="password"
            placeholder="Enter Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="btn-login" type="submit">
            Login
          </button>
          <p>
            Don't have an account?
            <span>
              <Link className="login-register" to="/register">
                {" "}
                Register
              </Link>
            </span>
          </p>
          {state.isError && <Error />}
        </form>
      </div>
    </div>
  );
}
