import React, { useState, useContext } from "react";
import Loader from "../components/Loader/Loader";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context";
import Error from "../components/Error/Error";
import Success from "../components/Success/Success";
const LoginPage = () => {
  // User name and passsword sent to the server
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });
  // userdata destructing
  const { username, password } = userData;
  // Loader state
  const [loading, setLoading] = useState(false);
  // user info gotten from the server
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [err,setErr] = useState(false)
  const [success,SetSuccess] = useState(false)
  const navigate = useNavigate();
  // Logg in User
  async function login(e) {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await axios.post("https://graceful-tick-kimono.cyclic.cloud/login", {
        username,
        password,
      });
      // On success
      if (response.status === 200) {
        // 'token' gotten from server response
        const token = response.data.token;
        // storing token in local storage
        localStorage.setItem("token", token);

        const { username, id } = response.data;
        setUserInfo({ username, id });
        // Notifying User about successful login
        setLoading(false);
        SetSuccess(true)
      }

      navigate("/");
    } catch (err) {
      setLoading(false);
      setErr(true)
    }
  }
  return (
    <div>
      
      {loading ? (
        <Loader />
      ) : (
        <form action="" className="login" onSubmit={login}>
          <h1>Login</h1>
          {err && <Error message={'Try again'}/>}
          <input
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) =>
              setUserData({ ...userData, username: e.target.value })
            }
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value })
            }
          />
          <button>Login</button>
        </form>
      )}
    </div>
  );
};

export default LoginPage;
