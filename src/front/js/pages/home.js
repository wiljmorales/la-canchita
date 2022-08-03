import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Jumbotron } from "../component/Jumbotron";

import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container">
			<Jumbotron />
			<div className="d-flex flex-wrap w-100">
					<h2 className="text-warning">Caimaneras</h2>
					<div className="d-flex overflow-scroll">
						{store.Caimaneras.map(
							(caimaneras, item) => {
								return (
								<Card 
								key={caimaneras.id}
								item={item} />
								)
							}
						)}
					</div>  
			</div>

		</div>
		
	
		
	);
};
