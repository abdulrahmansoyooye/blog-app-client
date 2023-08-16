import React, { useState, useContext } from "react";
import Loader from "../components/Loader/Loader";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context";
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
  const navigate = useNavigate();
  // Logg in User
  async function login(e) {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await axios.post("https://blog-api-mu-two.vercel.app/login", {
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
        alert("You're Logged in");
      }

      navigate("/");
      console.log(userInfo);
    } catch (err) {
      setLoading(false);
      alert("That didn't work, Try later");
    }
  }
  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <form action="" className="login" onSubmit={login}>
          <h1>Login</h1>
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
