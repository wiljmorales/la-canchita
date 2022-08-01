import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  return (
    <div
      className=" d-flex portrait-login align-items-center justify-content-center"
      style={{ height: "80vh" }}
    >
      <div
        className="w-50 h-75 d-flex fondocaimaneras container flex-column align-items-center justify-content-around opacity-75"
        style={{ borderRadius: "25px" }}
      >
        <h2>Login de jugador</h2>
        <form>
          <input
            type="text"
            name="email"
            className="form-control my-1"
            value={email}
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name="password"
            className="form-control my-5"
            value={password}
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </form>
        <button
          type="button"
          className="btn btn-success"
          onClick={async (e) => {
            const success = await actions.login({
              email: email,
              password: password,
            });
            if (success) {
              navigate("/private");
              return;
            }
            alert("something happened while creating");
          }}
        >
          {"Login"}
        </button>
      </div>
    </div>
  );
};
