import { useState, createContext, useEffect } from "react";
import axios from "axios";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [state, setState] = useState({
    user: null,
  });

  useEffect(() => {
    const authData = JSON.parse(window.localStorage.getItem("auth"));
    setState(authData || null);
  }, []);

  axios.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      let res = error.response;
      if (res.status === 401 && res.config && !res.config.__isRetryRequest) {
        setState(null);
        window.localStorage.removeItem("auth");
        window.location.href = "/login";
      }
    }
  );

  return (
    <UserContext.Provider value={[state, setState]}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
