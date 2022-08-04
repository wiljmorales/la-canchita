import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <Link to="/">
          <img
            src="https://i.ibb.co/MnhyZTD/logo-canchita.jpg"
            className="w-50 content-center"
            style={{
              maxWidth: "300px",
              maxHeight: "120px",
            }}
          />
        </Link>
        <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex flex-row">
          <li className="nav-item">
            <Link to="/caimaneras" className="nav-link">
              Crear Caimanera
            </Link>
          </li>
          <li className="nav-item ms-4">
            <Link to="/" className="nav-link">
              Buscar Caimanera
            </Link>
          </li>
        </ul>
        <div className="ml-auto d-flex">
          <div className=" ms-2">
            {localStorage.getItem("jwt-token") ? (
              <button
                className="btn btn-danger"
                onClick={(e) => {
                  console.log("test");
                  localStorage.removeItem("jwt-token");
                  navigate("/login");
                }}
              >
                Logout!
              </button>
            ) : (
              <Link to="/login">
                <button className="btn btn-primary">Login</button>
              </Link>
            )}
          </div>
          <div className="ms-2">
            <Link to="/sign-up">
              <button className="btn btn-success">Sign up!</button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
