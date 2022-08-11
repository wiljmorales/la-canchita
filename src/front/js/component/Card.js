import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import Datetime from "react-datetime";
import { GoogleMaps } from "../component/GoogleMap";
import { Marker } from "../pages/Marker";

export const Card = ({ item }) => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
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
          <hr className="my-2" />
          <div className="container-fluid justify-content-between p-0 d-flex"></div>
          <button
            type="button"
            className="btn btn-light border-primary border-2 text-primary content-center"
            onClick={() => {
              if (localStorage.getItem("jwt-token")) {
                const success = actions.subscribe(item.id);
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
          <button
            className="btn btn-primary text-white"
            data-bs-toggle="modal"
            data-bs-target={`#${item.name.split(" ").join("")}`}
          >
            {"Mas info"}
          </button>
          <div
            className="modal fade"
            id={item.name.split(" ").join("")}
            tabIndex="-1"
            aria-labelledby="homeModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="homeModalLabel">
                    {item.name}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <p className="card-text text-black">
                    Fecha y hora: {item.datetime}
                  </p>
                  <p className="card-text text-black">
                    Creador: {item.creator}
                  </p>
                  <div className="d-flex flex-nowrap w-100">
                    <GoogleMaps
                      center={{
                        lat: Number.parseFloat(item.location.lat),
                        lng: Number.parseFloat(item.location.long),
                      }}
                      zoom={12}
                      clickHandler={() => {}}
                      style={{
                        margin: "0 0 1.5rem 0",
                      }}
                    >
                      <Marker
                        draggable={false}
                        position={{
                          lat: Number.parseFloat(item.location.lat),
                          lng: Number.parseFloat(item.location.long),
                        }}
                        dragHandler={() => {}}
                      />
                    </GoogleMaps>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="button" className="btn btn-primary">
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
  item: PropTypes.object,
};
