import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Jumbotron } from "../component/Jumbotron";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<Jumbotron />
	
		
	);
};
