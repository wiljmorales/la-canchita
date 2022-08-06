import React from "react";
import { useNavigate } from "react-router-dom";

export const Jumbotron = () => {
  const navigate = useNavigate();
  return (
    <div className="container mb-5">
      <div className="mt-4 p-5 bg-primary bg-gradient text-white rounded">
        <h1>Crea, Comparte y juega!</h1>
        <p>
          Un espacio dedicado a todos los deportistas con ambicion de jugar
          futbol futbol pelota con gran habilidad de regateo con titkitaka como
          campeon del mundo competencia de champions y diviertete
        </p>
        <button
          type="button"
          className="btn btn-success"
          onClick={() => navigate("/caimaneras")}
        >
          {"Crea tu Caimanera"}
        </button>
      </div>
    </div>
  );
};
