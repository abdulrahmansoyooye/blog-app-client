import React, { useContext, useState } from "react";
import Posts from "../components/Posts";
import { useEffect } from "react";
import axios from "axios";
import Loader from "../components/Loader/Loader";
import Error from "../components/Error/Error";
import Success from "../components/Success/Success";
import { UserContext } from "../context";
const IndexPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);
  const { search } = useContext(UserContext);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://graceful-tick-kimono.cyclic.cloud/post"
        );
        setPosts(response.data);
        setLoading(false);
      } catch (err) {
        setErr(true);
        setLoading(false);

        console.log(err);
      }
    };
    fetch();
  }, []);
  return (
    <div>
      {loading ? (
        <>
          <Loader />
        </>
      ) : err ? (
        <Error message={"There was an Error. Reload the page"} />
      ) : (
        posts
          .filter((post) => {
            if (search === "") {
              return post;
            } else if (
              post.title.toLowerCase().includes(search.toLowerCase())
            ) {
              return post;
            }
          })
          .map((post) => {
            return <Posts key={post._id} {...post} />;
          })
      )}
    </div>
  );
};

export default IndexPage;
