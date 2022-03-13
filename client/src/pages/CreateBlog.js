import React, { useReducer } from "react";

import Swal from "sweetalert2";
import BlogForm from "../components/BlogForm";
import "react-quill/dist/quill.snow.css";
import { getToken } from "../services/authorize";
import formReducer from "../reducers/formReducer";
import request from "../utils/request";

const initialForm = {
  title: "",
  subTitle: "",
  author: "",
  content: "",
};

const CreateBlog = () => {
  const [data, dispatch] = useReducer(formReducer, initialForm);

  const handleOnChange = (field, value) => {
    dispatch({
      type: "HANDLE_INPUT",
      field,
      payload: value,
    });
  };

  const submitForm = async () => {
    console.table({ title, subTitle, author, content });
    try {
      const res = await request.post(
        "/create",
        {
          title,
          subTitle,
          author,
          content,
        },
        {
          headers: {
            authorization: `Bearer ${getToken()} `,
          },
        }
      );
      Swal.fire("แจ้งเตือน", `บันทึก "${res.data.title}" สำเร็จ`, "success");
      dispatch({
        type: "RESET",
        payload: initialForm,
      });
    } catch (err) {
      Swal.fire("อุ้ปส์", err.response.data.error, "error");
    }
  };

  const { title, subTitle, author, content } = data;

  return (
    <>
      <div className="container">
        <BlogForm
          values={data}
          onChange={handleOnChange}
          onSubmit={submitForm}
          buttonText="Create"
          header="Create Blog"
        />
      </div>
    </>
  );
};

export default CreateBlog;
