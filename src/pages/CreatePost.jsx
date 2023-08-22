import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader/Loader";
import Error from "../components/Error/Error";
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
const CreatePost = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [err, setErr] = useState(false);
  const [success, SetSuccess] = useState(false);
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const createNewPost = async (e) => {
    setLoading(true);

    e.preventDefault();
    const token = localStorage.getItem("token");

    const formData = new FormData();

    formData.append("image", selectedFile);
    formData.set("title", title);
    formData.set("content", content);
    formData.set("summary", summary);
    try {
      const response = await axios.post(
        "https://graceful-tick-kimono.cyclic.cloud/post",
        formData,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (response.status === 200) {
        setLoading(false);
        SetSuccess(true);
        navigate("/");
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
        <form onSubmit={createNewPost}>
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
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            required
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

export default CreatePost;
