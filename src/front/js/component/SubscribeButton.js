import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const SubscribeButton = ({ caimaneraId, buttonStyle }) => {
  const { actions } = useContext(Context);
  const navigate = useNavigate();
  return (
    <button
      type="button"
      className={`btn ${buttonStyle} content-center`}
      onClick={() => {
        if (localStorage.getItem("jwt-token")) {
          actions.subscribe(caimaneraId);
        } else navigate("/login");
      }}
    >
      Subscribirse
    </button>
  );
};
