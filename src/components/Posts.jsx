import React from "react";
import { format } from "date-fns";
import { Link } from "react-router-dom";

const Posts = ({ _id, title, summary, createdAt, author, image }) => {
  return (
    <div className="post">
      <div className="image">
        <Link to={`/post/${_id}`}>
          <img src={"https://graceful-tick-kimono.cyclic.cloud/" + image} alt="image" />
        </Link>
      </div>

      <div className="texts">
        <Link to={`post/${_id}`}>
          <h2>{title}</h2>
        </Link>
        <p className="info">
          <a className="author">{author}</a>
          <time>{format(new Date(createdAt), "MMMM d, yyy HH:mm")}</time>
        </p>
        <p className="summary">{summary}</p>
      </div>
    </div>
  );
};

export default Posts;
