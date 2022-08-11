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
          const success = actions.subscribe(caimaneraId);
          if (success) {
            alert("te inscribiste");
          } else {
            alert("no te pudiste inscribir");
          }
        } else navigate("/login");
      }}
    >
      Subscribirse
    </button>
  );
};
