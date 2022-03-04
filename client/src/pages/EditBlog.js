import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import NavBar from "../components/Navbar/NavBar";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { getToken } from "../services/authorize";

const EditBlog = () => {
  const [data, setData] = useState({});
  const [content, setContent] = useState("");
  const { slug } = useParams();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/blog/${slug}`)
      .then((res) => {
        setData(res.data);
        setContent(res.data.content);
      })
      .catch((err) => {
        alert(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const inputValue = (name) => (event) => {
    setData({ ...data, [name]: event.target.value });
  };

  const submitForm = (e) => {
    e.preventDefault();
    console.table({ title, author, content });
    axios
      .put(
        `${process.env.REACT_APP_API}/blog/${slug}`,
        {
          title,
          author,
          content,
        },
        {
          headers: {
            authorization: `Bearer ${getToken()} `,
          },
        }
      )
      .then((res) => {
        Swal.fire("แจ้งเตือน", `แก้ไข ${res.data.title} สำเร็จ`, "success");
      })
      .catch((err) => {
        Swal.fire("อุ้ปส์", err.response.data.error, "error");
      });
  };

  const { title, author } = data;

  return (
    <>
      <NavBar />
      <div className="container">
        <h1>Edit Article</h1>
        <form onSubmit={submitForm}>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              className="form-control"
              value={title}
              onChange={inputValue("title")}
            />
          </div>
          <div className="form-group">
            <label>Author</label>
            <input
              type="text"
              className="form-control"
              value={author}
              onChange={inputValue("author")}
            />
          </div>
          <div className="form-group">
            <label>Content</label>
            <ReactQuill
              theme="snow"
              placeholder="input your content"
              value={content}
              onChange={setContent}
            />
          </div>
          <br />
          <button type="submit" className="btn btn-success">
            Edit
          </button>
        </form>
      </div>
    </>
  );
};

export default EditBlog;
