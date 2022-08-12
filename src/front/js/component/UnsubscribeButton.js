import React, { useContext } from "react";
import { Context } from "../store/appContext";

export const UnsubscribeButton = ({ caimaneraId }) => {
  const { actions } = useContext(Context);
  return (
    <button
      type="button"
      className="btn btn-danger content-center"
      onClick={() => {
        actions.unsubscribe(caimaneraId);
      }}
    >
      Desubscribirse
    </button>
  );
};
