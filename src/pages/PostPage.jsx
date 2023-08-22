import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";

import axios from "axios";
import Loader from "../components/Loader/Loader";
import { UserContext } from "../context";
import Error from "../components/Error/Error";

const PostPage = () => {
  const [post, setPost] = useState("");
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const { userInfo } = useContext(UserContext);
  const [err, setErr] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:3001/post/${id}`);
        setLoading(false);
        setPost(response.data);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    fetch();
  }, []);
  const Delete = async () => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:3001/delete/${id}`);
      setLoading(false);
      navigate("/");
    } catch (err) {
      console.log(err);
      setLoading(false);
      setErr(true);
    }
  };
  return (
    <div className="post-page">
      {loading ? (
        <Loader />
      ) : (
        <>
          <h1>{post.title}</h1>
          <time>{post.createdAt}</time>
          {err && <Error message={"Cannot Delete. Try again"} />}
          {userInfo.username === post.author && (
            <div className="edit-row">
              <Link to={`/edit/${post._id}`}>
                <button className="edit-btn">Edit Post</button>
              </Link>

              <button onClick={Delete} className="del-btn">
                Delete
              </button>
            </div>
          )}
          <div class="image">
            <img src={"http://localhost:3001/" + post.image} alt="image" />
          </div>

          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </>
      )}
    </div>
  );
};

export default PostPage;
