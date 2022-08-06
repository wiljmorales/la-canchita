import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Card = ({ item }) => {
  const { store, actions } = useContext(Context);
  return (
    <div
      className="tab-pane ps-2 pb-1 pt-2 pe-2 w-25"
      role="tabpanel"
      aria-labelledby="profile-tab"
      tabIndex="0"
    >
      <div className="card border-success border-2">
        <img
          src={`https://www.diariodequeretaro.com.mx/incoming/yjs3qu-una-obra-mas.jpg/ALTERNATES/LANDSCAPE_768/UNA%20OBRA%20MAS.jpg`}
          className="card-img-top"
          alt="Imagen de una cancha"
        />
        <div className="card-body bg-primary">
          <h3 className="card-title text-white">{item.name}</h3>
          <p className="card-text text-white">{item.datetime}</p>
          <p className="card-text text-white">{item.creator}</p>
          <hr className="my-4" />
          <div className="container-fluid justify-content-between p-0 d-flex"></div>
          <button
            type="button"
            className="btn btn-light border-primary border-2 text-primary content-center"
            onClick={() => {
              const success = actions.subscribe(item.id);
              if (success) {
                alert("te inscribiste");
              } else {
                alert("no te pudiste inscribir");
              }
            }}
          >
            Subscribirse
          </button>
          <button
            type="button"
            className="btn btn-light border-primary border-2 text-primary content-center"
          >
            {"Mas Info"}
          </button>
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
  item: PropTypes.object,
};
