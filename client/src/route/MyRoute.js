import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "../App";
import CreateBlog from "../pages/CreateBlog";
import EditBlog from "../pages/EditBlog";
import Blog from "../pages/Blog";
import Login from "../pages/Login";
import { getUser } from "../services/authorize";

const MyRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route
          path="/create"
          element={getUser() ? <CreateBlog /> : <Navigate to="/login" />}
        />
        <Route path="/blog/:slug" element={<Blog />} />
        <Route
          path="edit/blog/:slug"
          element={getUser() ? <EditBlog /> : <Navigate to="/login" />}
        />
        <Route path="login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MyRoute;
