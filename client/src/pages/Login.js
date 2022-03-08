import React, { useEffect, useReducer } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import formReducer from "../reducers/formReducer";
import request from "../utils/request";
import { authenticate, getUser } from "../services/authorize";

const initialForm = {
  username: "",
  password: "",
};

const Login = () => {
  const navigate = useNavigate();
  const [data, dispatch] = useReducer(formReducer, initialForm);

  const { username, password } = data;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    dispatch({
      type: "HANDLE_INPUT",
      field: name,
      payload: value,
    });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const res = await request.post("/login", {
        username,
        password,
      });
      Swal.fire("แจ้งเตือน", `เข้าสู่ระบบสำเร็จ`, "success");
      authenticate(res, () => navigate("/blog/create"));
      dispatch({
        type: "RESET",
        payload: initialForm,
      });
    } catch (err) {
      console.log({ err });
      Swal.fire("อุ้ปส์", err.response.data.error, "error");
    }
  };

  useEffect(() => {
    getUser() && navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="container">
        <h1>เข้าสู่ระบบ | Admin</h1>
        <form onSubmit={submitForm}>
          <div className="form-group">
            <label>Username</label>
            <input
              name="username"
              type="text"
              className="form-control"
              value={username}
              onChange={handleOnChange}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              name="password"
              type="password"
              className="form-control"
              value={password}
              onChange={handleOnChange}
            />
          </div>
          <br />
          <button type="submit" className="btn btn-success">
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
