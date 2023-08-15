import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../context";
const Header = () => {
  // User Logged  in user's information
  const { userInfo, setUserInfo } = useContext(UserContext);

  const username = userInfo?.username;
  // Fetch the user info from server
  useEffect(() => {
    // get the token stored in local storage
    const token = localStorage.getItem("token");

    const fetch = async () => {
      try {
        const response = await axios.get("http://localhost:3001/profile", {
          headers: {
            Authorization: token,
          },
        });
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
    <header>
      <a href="/" className="logo">
        Blog
      </a>
      <nav>
        {username && (
          <>
            <Link to="/create" className="login">
              Create new post
            </Link>

            <a onClick={logout}> Log out</a>
          </>
        )}
        {!username && (
          <>
            <Link to="/login" className="login">
              Login
            </Link>
            <Link to="/register" className="register">
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
