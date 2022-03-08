import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getUser, logout } from "../../services/authorize";
import { useNavigate } from "react-router-dom";
import "./style.css";

const NavBar = () => {
  const navigate = useNavigate();
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const handleNavCollapse = () => setIsNavCollapsed((prevState) => !prevState);

  return (
    <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <img
          className="img"
          src="/logo.png"
          alt="logo"
          onClick={() => navigate("/blog")}
        />
        <button
          className="custom-toggler navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarsExample09"
          aria-controls="navbarsExample09"
          aria-expanded={!isNavCollapsed ? true : false}
          aria-label="Toggle navigation"
          onClick={handleNavCollapse}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className={`${isNavCollapsed ? "collapse" : ""} navbar-collapse`}
          id="navbarsExample09"
        >
          <Link to="blog/create" className="nav-link text-light">
            Create Blog
          </Link>
          {!getUser() && (
            <Link to="/login" className="nav-link text-light">
              Login
            </Link>
          )}
          {getUser() && (
            <button
              className="btn btn-link nav-link text-light"
              onClick={() => logout(() => navigate("/"))}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
