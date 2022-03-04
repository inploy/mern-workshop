import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import NavBar from "../components/Navbar/NavBar";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { getToken } from "../services/authorize";

const CreateBlog = () => {
  const [data, setData] = useState({
    title: "",
    author: "",
  });
  const [content, setContent] = useState("");

  const inputValue = (name) => (event) => {
    setData({ ...data, [name]: event.target.value });
  };

  const submitForm = (e) => {
    e.preventDefault();
    console.table({ title, author, content });
    axios
      .post(
        `${process.env.REACT_APP_API}/create`,
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
        Swal.fire("แจ้งเตือน", `บันทึก ${res.data.title} สำเร็จ`, "success");
        console.log(data);
        setData({ ...data, title: "", author: "" });
        setContent("");
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
        <h1>Article</h1>
        <form onSubmit={submitForm}>
          <div className="form-group">
            <label>ชื่อบทความ</label>
            <input
              type="text"
              className="form-control"
              value={title}
              onChange={inputValue("title")}
            />
          </div>
          <div className="form-group">
            <label>ผู้แต่ง</label>
            <input
              type="text"
              className="form-control"
              value={author}
              onChange={inputValue("author")}
            />
          </div>
          <div className="form-group">
            <label>รายละเอียด</label>
            <ReactQuill
              theme="snow"
              placeholder="input your content"
              value={content}
              onChange={setContent}
            />
          </div>
          <br />
          <button type="submit" className="btn btn-success">
            Create
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateBlog;
