import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import NavBar from "../components/Navbar/NavBar";
import { authenticate, getUser } from "../services/authorize";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const { username, password } = data;

  const inputValue = (name) => (event) => {
    setData({ ...data, [name]: event.target.value });
  };

  const submitForm = (e) => {
    e.preventDefault();
    console.table({ username, password });
    axios
      .post(`${process.env.REACT_APP_API}/login`, {
        username,
        password,
      })
      .then((res) => {
        Swal.fire("แจ้งเตือน", `login สำเร็จ`, "success");
        console.log(res);
        authenticate(res, () => navigate("/create"));
        setData({ ...data, username: "", password: "" });
      })
      .catch((err) => {
        Swal.fire("error", err.response.data.error, "error");
      });
  };

  useEffect(() => {
    getUser() && navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <NavBar />
      <div className="container">
        <h1>เข้าสู่ระบบ | Admin</h1>
        <form onSubmit={submitForm}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={inputValue("username")}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={inputValue("password")}
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
