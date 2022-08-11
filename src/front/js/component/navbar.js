import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
  const navigate = useNavigate();
  const { store, actions } = useContext(Context);

  useEffect(() => {
    if (localStorage.getItem("jwt-token")) {
      actions.getSubscriptions();
    }
  }, [store.userCaimaneras.length]);

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <Link to="/">
          <img
            src="https://i.imgur.com/gcEejdx.png"
            className="w-50 content-center"
            style={{
              maxWidth: "400px",
              maxHeight: "220px",
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
              <button
                className="btn btn-warning"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={actions.getSubscriptions}
              >
                {"Mis Caimaneras"}
              </button>
              <div
                className="modal fade"
                id="exampleModal"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">
                        Mis Caimaneras
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      <table className="table">
                        <thead>
                          <tr>
                            <th scope="col">Nombre</th>
                            <th scope="col">Hora</th>
                            <th scope="col">Fecha</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {store.userCaimaneras.map((caimanera) => {
                            return (
                              <tr key={caimanera.id}>
                                <td>{caimanera.name}</td>
                                <td>{caimanera.time}</td>
                                <td>{caimanera.date}</td>
                                <td
                                  className="text-danger"
                                  style={{ cursor: "pointer" }}
                                  onClick={() => {
                                    actions.unsubscribe(caimanera.id);
                                  }}
                                  // data-bs-dismiss="modal"
                                >
                                  Desubscribirse
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
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
