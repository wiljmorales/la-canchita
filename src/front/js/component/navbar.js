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
        <div className="ml-auto d-flex">
          {localStorage.getItem("jwt-token") ? (
            <>
              <button
                className="btn btn-danger me-5"
                onClick={(e) => {
                  console.log("test");
                  localStorage.removeItem("jwt-token");
                  navigate("/login");
                }}
              >
                {"Cerrar sesión"}
              </button>
              <button className="btn btn-warning">{"Mis Caimaneras"}</button>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className="btn btn-primary me-5">
                  {"Iniciar Sesión"}
                </button>
              </Link>
              <Link to="/sign-up">
                <button className="btn btn-success">{"Registrase"}</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
