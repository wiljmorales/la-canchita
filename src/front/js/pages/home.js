import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Jumbotron } from "../component/Jumbotron";
import { Card } from "../component/Card";
import { Headline } from "../component/Headlines";

import "../../styles/home.css";

export const Home = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getCaimaneras();
    if (localStorage.getItem("jwt-token")) {
      actions.getSubscriptions();
    }
  }, [store.userCaimaneras.length]);

  return (
    <div className="container">
      <Jumbotron />
      <h2 className="text-primary text-center">Caimaneras</h2>
      <div className="d-flex flex-wrap w-100">
        <div className="d-flex overflow-visible flex-wrap">
          {store.caimaneras.map((caimanera) => {
            return <Card key={caimanera.id} item={caimanera} />;
          })}
        </div>
      </div>
      <Headline />
    </div>
  );
};
