import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const SignUp = (props) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  return (
    <div
      className="portrait-signup d-flex align-items-center justify-content-center"
      style={{ height: "80vh" }}
    >
      <div
        className="container fondocaimaneras flex-column d-flex align-items-center justify-content-around opacity-75 py-5 w-50 h-75"
        style={{ borderRadius: "25px" }}
      >
        <h2 className="text-white">Signup de jugador</h2>
        <form>
          <input
            type="text"
            name="name"
            className="form-control my-3"
            value={name}
            placeholder="name"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            name="email"
            className="form-control my-3"
            value={email}
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name="password"
            className="form-control my-3"
            value={password}
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </form>
        <button
          type="button"
          className="btn btn-success"
          onClick={async (e) => {
            const success = await actions.signUp({
              name: name,
              email: email,
              password: password,
            });
            if (success) {
              navigate("/login");
              return;
            }
            alert("something happened while creating");
          }}
        >
          {"Sign up"}
        </button>
      </div>
    </div>
  );
};
