import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Marker } from "../pages/Marker";
import { Context } from "../store/appContext";
import { GoogleMaps } from "./GoogleMap";
import { SubscribeButton } from "./SubscribeButton";
import { UnsubscribeButton } from "./UnsubscribeButton";

export const InfoModal = ({ item }) => {
  const { store } = useContext(Context);
  return (
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
            <div className="d-flex justify-content-between">
              <p className="card-text text-black">Fecha: {item.date}</p>
              <p className="card-text text-black">Hora: {item.time}</p>
              <p className="card-text text-black">Creador: {item.creator}</p>
            </div>
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
            {item.subscribed.length > 0 ? (
              <>
                <h3 className="text-center">Jugadores Inscritos</h3>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Nombre</th>
                      <th scope="col">Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {item.subscribed.map((suscriptor) => {
                      return (
                        <tr key={suscriptor.id}>
                          <td>{suscriptor.name}</td>
                          <td>{suscriptor.email}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </>
            ) : (
              <h3 className="text-center">Se el primero en inscribirte</h3>
            )}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            {localStorage.getItem("jwt-token") ? (
              store.userCaimaneras.find(
                (caimanera) => caimanera.id === item.id
              ) ? (
                <UnsubscribeButton caimaneraId={item.id} />
              ) : (
                <SubscribeButton
                  caimaneraId={item.id}
                  buttonStyle={"btn-primary text-white"}
                />
              )
            ) : (
              <Link to="/login">
                <button className="btn btn-primary">{"Iniciar Sesión"}</button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
