import React, { useState, useEffect, useCallback, useReducer } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Load from "../components/Load";
import "react-quill/dist/quill.snow.css";
import { getToken } from "../services/authorize";
import request from "../utils/request";
import BlogForm from "../components/BlogForm";
import formReducer from "../reducers/formReducer";

const initialForm = {
  title: "",
  author: "",
  content: "",
};

const EditBlog = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [form, dispatch] = useReducer(formReducer, initialForm);
  const { slug } = useParams();

  const fetchBlog = useCallback(async () => {
    try {
      const res = await request.get(`blog/${slug}`);
      setData(res.data);
      dispatch({
        type: "SET_DATA",
        payload: res.data,
      });
      setLoading(false);
    } catch (err) {
      Swal.fire("อุ้ปส์", err.response.data.error, "error");
    }
  }, [slug]);

  useEffect(() => {
    fetchBlog();
  }, [fetchBlog]);

  const handleOnChange = (field, value) => {
    dispatch({
      type: "HANDLE_INPUT",
      field,
      payload: value,
    });
  };

  const submitForm = async () => {
    const { title, author, content } = form;
    try {
      const res = await request.put(
        `/blog/${slug}`,
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
      );
      Swal.fire("แจ้งเตือน", `แก้ไข "${res.data.title}" สำเร็จ`, "success");
    } catch (err) {
      Swal.fire("อุ้ปส์", err.response.data.error, "error");
    }
  };

  return (
    <Load loading={loading}>
      <div className="container">
        <h1>Edit Article</h1>
        <BlogForm
          values={form}
          onChange={handleOnChange}
          onSubmit={submitForm}
          buttonText="Edit"
        />
      </div>
    </Load>
  );
};

export default EditBlog;
