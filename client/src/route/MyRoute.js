import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import CreateBlog from "../pages/CreateBlog";
import EditBlog from "../pages/EditBlog";
import Blog from "../pages/Blog";
import Login from "../pages/Login";
import MainLayout from "../components/MainLayout";
import NotFound from "../components/NotFound";

import { getUser } from "../services/authorize";

function RequireAuth({ children }) {
  const isAuthenticated = getUser();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
}

const MyRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="/blog" />} />
          <Route path="login" element={<Login />} />
          <Route path="blog">
            <Route
              index
              path="create"
              element={
                <RequireAuth>
                  <CreateBlog />
                </RequireAuth>
              }
            />
            <Route path=":slug" element={<Blog />} />
            <Route
              path=":slug/edit"
              element={
                <RequireAuth>
                  <EditBlog />
                </RequireAuth>
              }
            />
            <Route index element={<Home />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default MyRoute;
