import React, { useState } from "react";
import Posts from "../components/Posts";
import { useEffect } from "react";
import axios from "axios";
import Loader from "../components/Loader/Loader";
const IndexPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:3001/post");
        setPosts(response.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);

        console.log(err);
      }
    };
    fetch();
  }, []);
  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        posts.map((post) => {
          return <Posts key={post._id} {...post} />;
        })
      )}
    </div>
  );
};

export default IndexPage;