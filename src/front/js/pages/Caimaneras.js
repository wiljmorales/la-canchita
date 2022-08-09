import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import Datetime from "react-datetime";
import { GoogleMaps } from "../component/GoogleMap";
import { Marker } from "./Marker";

export const Caimaneras = () => {
  const { store, actions } = useContext(Context);
  const [name, setName] = useState("");
  const [datetime, setDatetime] = useState(new Date());
  const [latLong, setLatLong] = useState({
    lat: parseFloat(store.userPosition.latitude),
    lng: parseFloat(store.userPosition.longitude),
  });
  const navigate = useNavigate();
  return (
    <section className="fondocaimaneras h-100 h-custom">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-8 col-xl-6">
            <div className="cardregistro rounded-3">
              <img
                src="https://t3.ftcdn.net/jpg/04/32/82/80/240_F_432828076_oObmCMDFy2p3s6pT3Z0AZPatmE74T817.jpg"
                className="w-100 height-150px"
                alt="Sample photo"
              ></img>
              <div className="card-body bg-white p-4 p-md-5">
                <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2 justify-content-center">
                  Registrar Caimaneras
                </h3>
                <form className="px-md-2">
                  <div className="form-outline mb-4">
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      value={name}
                      placeholder="nombre de la caimanera"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="form-outline mb-4">
                    <Datetime
                      value={datetime}
                      onChange={(momentValue) => setDatetime(momentValue)}
                    />
                  </div>
                  <div className="d-flex flex-nowrap w-100">
                    {store.userPosition.latitude && (
                      <GoogleMaps
                        center={{
                          lat: store.userPosition.latitude,
                          lng: store.userPosition.longitude,
                        }}
                        zoom={12}
                        clickHandler={(e) => {
                          setLatLong({
                            lat: e.latLng.lat(),
                            lng: e.latLng.lng(),
                          });
                        }}
                        style={{
                          margin: "0 0 1.5rem 0",
                        }}
                      >
                        <Marker
                          draggable={true}
                          position={latLong}
                          dragHandler={(e) => {
                            setLatLong({
                              lat: e.latLng.lat(),
                              lng: e.latLng.lng(),
                            });
                          }}
                        />
                      </GoogleMaps>
                    )}
                  </div>
                </form>
                <div className="row">
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={async (e) => {
                      const success = await actions.caimanera({
                        name: name,
                        datetime: datetime.toISOString(),
                        location: latLong,
                      });
                      if (success) {
                        navigate("/");
                        return; //poner modal de caimanera creada
                      }
                      alert("something happened while creating");
                    }}
                  >
                    {"Registrar"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
