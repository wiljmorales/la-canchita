import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";
import { GoogleMaps } from "../component/GoogleMap";
import { Marker } from "../pages/Marker";
import { SubscribeButton } from "./SubscribeButton";
import { UnsubscribeButton } from "./UnsubscribeButton";
import { InfoModal } from "./InfoModal";

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
          <p className="card-text text-white">Fecha: {item.date}</p>
          <p className="card-text text-white">Hora: {item.time}</p>
          <p className="card-text text-white">Creador: {item.creator}</p>
          <hr className="my-2" />
          <div className="container-fluid justify-content-between p-0 d-flex"></div>
          {localStorage.getItem("jwt-token") ? (
            store.userCaimaneras.find(
              (caimanera) => caimanera.id === item.id
            ) ? (
              <UnsubscribeButton caimaneraId={item.id} />
            ) : (
              <SubscribeButton
                caimaneraId={item.id}
                buttonStyle={"btn-light border-primary border-2 text-primary"}
              />
            )
          ) : (
            <SubscribeButton
              caimaneraId={item.id}
              buttonStyle={"btn-light border-primary border-2 text-primary"}
            />
          )}
          <button
            className="btn btn-primary text-white"
            data-bs-toggle="modal"
            data-bs-target={`#${item.name.split(" ").join("")}`}
          >
            {"Mas info"}
          </button>
          <InfoModal item={item} />
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
  item: PropTypes.object,
};
