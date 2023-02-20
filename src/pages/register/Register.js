import "./register.css";
import {Link} from 'react-router-dom';
import { useState } from "react";
import axios from "axios";
import { useAppContext } from "../../context/AuthContext";
import Error from "../../components/error";
import { useNavigate } from "react-router-dom";

export default function Register() {

  const {state, dispatch, rootPath} = useAppContext();

  const navigate = useNavigate();

  const [register, setRegister] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  })

  const registerHandler = async (e) => {
    e.preventDefault();

    if(register.password !== register.confirmPassword){
      dispatch({type: "ERROR", payload: "Password and confirm password are not same"});
    }
    else{
      const user = {
        name: register.name,
        username: register.username,
        email: register.email,
        password: register.password
      }

      try {
        const response = await axios.post(rootPath + '/register', user);
        
        setTimeout(() => {
          dispatch({type: "MESSAGE", payload: "User Registered Successfully"})
          navigate('/');
        }, 3000)

      } catch (error) {
        dispatch({ type: "ERROR", payload: e.response.data });
        console.log(error);
      }
    }

  }

  return (
    <div className="register-container">
      <div className="register-heading">
        <h1 className="register-title">Interplay</h1>

        <span className="register-text">
          Connect with your friends and family
        </span>
      </div>

      <div className="register-credentials">
        <form className="register-form" onSubmit={registerHandler}>
          <input
            className="register-name"
            type="text"
            placeholder="Enter Name"
            required
            value={register.name}
            onChange={(e) => setRegister({ ...register, name: e.target.value })}
          />
          <input
            className="register-username"
            type="text"
            placeholder="Enter Username"
            required
            value={register.username}
            onChange={(e) =>
              setRegister({ ...register, username: e.target.value })
            }
          />
          <input
            className="register-email"
            type="email"
            placeholder="Enter Email"
            required
            value={register.email}
            onChange={(e) =>
              setRegister({ ...register, email: e.target.value })
            }
          />
          <input
            className="register-password"
            type="password"
            placeholder="Enter Password"
            required
            value={register.password}
            onChange={(e) =>
              setRegister({ ...register, password: e.target.value })
            }
          />
          <input
            className="register-password-confirm"
            type="password"
            placeholder="Confirm Password"
            required
            value={register.confirmPassword}
            onChange={(e) =>
              setRegister({ ...register, confirmPassword: e.target.value })
            }
          />
          <button className="btn-register" type="submit">
            register
          </button>
          <p>
            Already have an account?
            <span>
              <Link className="register-login" to="/login">
                {" "}
                Login
              </Link>
            </span>
          </p>
          {state.isError && <Error />}
          {!state.isError && <p style={{color: "green"}}>state.Message</p>}
        </form>
      </div>
    </div>
  );
}
