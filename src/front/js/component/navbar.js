import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
				<img
					src="https://i.imgur.com/wy3b33A.png"
					className="w-50 content-center"
					style={{
						maxWidth: "300px",
						maxHeight: "120px"
					}}
				/>
				</Link>
				<div className="ml-auto">
					<Link to="/demo">
						<button className="btn btn-primary">Check the Context in action</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};
