import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";
import NavBar from "../components/Navbar/NavBar";

const Blog = () => {
  const [blog, setBlog] = useState("");
  const { slug } = useParams();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/blog/${slug}`)
      .then((res) => {
        setBlog(res.data);
      })
      .catch((err) => {
        alert(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <NavBar />
      <div className="container">
        <div className="col pt-3 pb-2 "></div>
        <h3>{blog.title}</h3>
        <p>{blog.content}</p>
        <p>
          ผู้เขียน {blog.author} , เผยแพร่ :{" "}
          {dayjs(blog.createdAt).format("DD/MM/YYYY")}
        </p>
      </div>
    </>
  );
};

export default Blog;
