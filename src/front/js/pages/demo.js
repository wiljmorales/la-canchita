import React, { useState, useEffect, useContext, Fragment } from "react";
import { Link } from "react-router-dom";
import { GoogleMaps } from "../component/GoogleMap";

import { Context } from "../store/appContext";

export const Demo = () => {
	const { store, actions } = useContext(Context);

	return (
		<h2>hello world</h2>
		
	);
};
