import React from "react";
import { useState } from "react";
import axios from "axios";
import Loader from "../components/Loader/Loader";
import { useNavigate } from "react-router-dom";
import Error from "../components/Error/Error";
import Success from "../components/Success/Success";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);
  const [success, SetSuccess] = useState(false);
  const navigate = useNavigate();

  async function register(e) {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/register", {
        username,
        password,
      });
      if (response.status === 200) {
        setLoading(false);
        SetSuccess(true);

        navigate("/login");
      }
    } catch (err) {
      setLoading(false);
      setErr(true);
    }
  }
  return (
    <>
      {loading ? (
        <>
          <Loader />
        </>
      ) : (
        <form action="" className="register" onSubmit={register}>
          <h1>Register</h1>
          {err && <Error message={"Try again with a new username"} />}
          <input
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button>Register</button>
        </form>
      )}
    </>
  );
};

export default RegisterPage;
