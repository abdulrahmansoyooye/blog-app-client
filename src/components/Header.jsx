import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../context";
const Header = () => {
  // User Logged  in user's information
  const { userInfo, setUserInfo, setSearch, search } = useContext(UserContext);
  const [isResponsive, setIsResponsive] = useState(true);

  const toggleResponsive = () => {
    setIsResponsive(!isResponsive);
  };
  const username = userInfo?.username;
  // Fetch the user info from server
  useEffect(() => {
    // get the token stored in local storage
    const token = localStorage.getItem("token");

    const fetch = async () => {
      try {
        const response = await axios.get(
          "https://graceful-tick-kimono.cyclic.cloud/profile",
          {
            headers: {
              Authorization: token,
            },
          }
        );
        // setting user data

        const { username, id } = response.data;
        setUserInfo({ username, id });
      } catch (err) {
        console.log(err);
      }
    };
    if (token) fetch();
  }, []);
  // Logout user and remove token
  const logout = () => {
    localStorage.removeItem("token");

    setUserInfo({});
  };
  return (
    <header className={`header ${isResponsive ? "responsive" : ""}`}>
      <a href="/" className="logo">
        Daily Blog
      </a>

      <nav>
        {username && (
          <>
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search"
            />
            <button className="nav-btn">
              <Link to="/create">Add Post</Link>
            </button>{" "}
            <button onClick={logout} className="nav-btn">
              {" "}
              Log out
            </button>
            <p>{username}</p>
          </>
        )}
        {!username && (
          <>
            <p>{username}</p>
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search"
            />
            <button className="nav-btn">
              <Link to="/login">Login</Link>
            </button>
            <button className="nav-btn">
              <Link to="/register">Register</Link>
            </button>

            <p>{username}</p>
          </>
        )}
      </nav>
      <button className="icon" onClick={toggleResponsive}>
        &#9776;
      </button>
    </header>
  );
};

export default Header;
