import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Card = () => {
    return (
    <div className="tab-pane ps-2 pb-1 pt-2 pe-2" role="tabpanel" aria-labelledby="profile-tab" tabIndex="0">
        <div className="card border-warning" style={{width: "18rem"}}>
  			<img src={`Imagen de caimanera`} className="card-img-top" alt="..." />
 			 <div className="card-body bg-dark">
   			 <h3 className="card-title text-warning">{item.name}</h3>	
			 <hr className="my-4" />
  				<div className="container-fluid justify-content-between p-0 d-flex">
  				
  	
				</div>
  			 </div>
		</div>
	</div>
       
    )

} 