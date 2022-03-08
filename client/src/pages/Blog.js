import { useParams } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import Swal from "sweetalert2";
import dayjs from "dayjs";
import request from "../utils/request";
import Load from "../components/Load";

const Blog = () => {
  const [blog, setBlog] = useState("");
  const [loading, setLoading] = useState("");
  const { slug } = useParams();

  const fetchData = useCallback(async () => {
    try {
      const res = await request.get(`/blog/${slug}`);
      setBlog(res.data);
      setLoading(false);
    } catch (err) {
      Swal.fire("อุ้ปส์", err.response.data.error, "error");
    }
  }, [slug]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <Load loading={loading}>
      <div className="container">
        <div className="col pt-3 pb-2 "></div>
        <h3>{blog.title}</h3>
        <p>{blog.content}</p>
        <p>
          ผู้เขียน {blog.author} , เผยแพร่ :{" "}
          {dayjs(blog.createdAt).format("DD/MM/YYYY")}
        </p>
      </div>
    </Load>
  );
};

export default Blog;
