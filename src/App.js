import { useEffect } from "react";
import "./app.css";
import Register from "./pages/register/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Search from "./pages/search/Search";
import Home from "./pages/home/Home";
import AdminPanel from "./pages/admin panel/AdminPanel";
import NoPage from "./pages/noPage/NoPage";
import {useAppContext} from './context/AuthContext';

function App() {

  const { state, dispatch } = useAppContext();
  
  useEffect(() => {
    dispatch({type: "ASSIGN", payload: JSON.parse(localStorage.getItem("loginUser"))});


  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/profile/:username"
          element={state.user ? <Profile /> : <Login />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/search/:name" element={<Search />} />
        <Route path="*" element={<NoPage />} />
        <Route
          path="/"
          element={
            state.user ? (
              state.user.username === "admin" ? (
                <AdminPanel />
              ) : (
                <Home />
              )
            ) : (
              <Login />
            )
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
