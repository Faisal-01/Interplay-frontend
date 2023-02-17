import React, { useEffect } from 'react';
import { useAppContext } from '../context/AuthContext';

export default function Error() {

    const {state, dispatch} = useAppContext();

    useEffect(() => {
      const timer = setTimeout(() => {
        dispatch({ type: "RESET" });
      }, 3000);
      return () => clearTimeout(timer);
    }, [dispatch]);

  return (
    <div style={{ color: "red" }} className="response">
      {state.Message}
    </div>
  );
}
