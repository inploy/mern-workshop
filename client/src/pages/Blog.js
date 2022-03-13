import { useParams } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import ReactQuill from "react-quill";
import Swal from "sweetalert2";
import dayjs from "dayjs";
import request from "../utils/request";
import Load from "../components/Load";
import "./style.css";

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
        <h1 className="mt-4">{blog.title}</h1>
        <h6 class="text-muted mb-4">{blog.subTitle}</h6>
        <ReactQuill
          className="blog-detail"
          value={blog.content}
          readOnly={true}
          theme={"bubble"}
        />

        <p className="fw-normal">
          Last Updated {dayjs(blog.createdAt).format("MMMM DD,YYYY")} - by{" "}
          <span className="fw-bold text-info">{blog.author}</span>
        </p>
      </div>
    </Load>
  );
};

export default Blog;
