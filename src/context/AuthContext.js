import { createContext, useContext, useReducer, useState, useRef } from "react";

const AppContext = createContext();

export const useAppContext = () => {
  return useContext(AppContext);
};

export const AppContextProvider = ({ children }) => {
  const initialState = {
    user: {},
    isError: false,
    Message: ""
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "SUCCESS":
        return { ...state, user: action.payload };

      case "ASSIGN":
        return { ...state, user: action.payload };

      case "ERROR":
        return { ...state, isError: true, Message: action.payload };

      case "RESET":
        return { user: {}, isError: false, Message: "" };

      case "MESSAGE":
        return { ...state, Message: action.payload };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const [rootPath] = useState("https://interplay-backend.vercel.app/api/v1");
  // const [rootPath] = useState("http://localhost:5000/api/v1");
  const sidebarRef = useRef(null);


  return (
    <AppContext.Provider value={{ state, dispatch, rootPath, sidebarRef }}>
      {children}
    </AppContext.Provider>
  );
};
