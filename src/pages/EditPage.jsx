import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader/Loader.jsx";
import ReactQuill from "react-quill";
import Error from "../components/Error/Error.jsx";
const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }],
    ["bold", "italic", "underline", "strike"],
    ["link", "image", "video"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["clean"],
  ],
};

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "link",
  "image",
  "video",
];
const EditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const [err, setErr] = useState(false);

  const EditPost = async (e) => {
    setLoading(true);
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("summary", summary);
    formData.append("content", content);

    console.log(title);
    try {
      const response = await axios.put(
        `http://localhost:3001/post/${id}`,
        formData
      );
      if (response.status === 200) {
        setLoading(false);
        navigate(`/post/${id}`);
      }
    } catch (err) {
      setErr(true);
      setLoading(false);
    }
  };
  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <form onSubmit={EditPost}>
          {err && <Error message={"There was an Error. Please Try again"} />}
          <input
            type="title"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="summary"
            placeholder="Summary"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />

          <ReactQuill
            modules={modules}
            formats={formats}
            value={content}
            onChange={(newContent) => setContent(newContent)}
          />
          <button style={{ marginTop: "10px" }}>Create post</button>
        </form>
      )}
    </div>
  );
};

export default EditPage;
