import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";

import axios from "axios";
import Loader from "../components/Loader/Loader";

const PostPage = () => {
  const [post, setPost] = useState("");
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://graceful-tick-kimono.cyclic.cloud/post/${id}`);
        setLoading(false);

        setPost(response.data);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    fetch();
  }, []);
  return (
    <div className="post-page">
      {loading ? (
        <Loader />
      ) : (
        <>
          <h1>{post.title}</h1>
          <time>{post.createdAt}</time>
          <div class="image">
            <img src={"https://graceful-tick-kimono.cyclic.cloud/" + post.image} alt="image" />
          </div>

          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </>
      )}
    </div>
  );
};

export default PostPage;
