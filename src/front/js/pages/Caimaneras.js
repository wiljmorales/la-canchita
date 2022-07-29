import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import Datetime from 'react-datetime';



export const Caimaneras = () => {
    const [name, setName] = useState("");
    const { store, actions } = useContext(Context);

    return(
        <section className="fondocaimaneras h-100 h-custom" >
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-lg-8 col-xl-6">
                        <div className="cardregistro rounded-3">
                            <img src="https://img.freepik.com/foto-gratis/accion-jugador-futbol-estadio_1150-14598.jpg?w=826&t=st=1659114587~exp=1659115187~hmac=bd3f69295c5c7c4470b751375cb891ca6f5f5a9141b21797db1dc95cf4d9db70"
                                className="w-100 height-150px" 
                                alt="Sample photo">
                            </img>
                            <div class="card-body bg-white p-4 p-md-5">
                                <h3 class="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2 justify-content-center">Registrar Caimaneras</h3>
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
                                        <input 
                                        type="datetime-local" 
                                        name="datetime"
                                        className="form-control" 
                                        value={Datetime}
                                        placeholder="fecha y hora"
                                        onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-outline mb-4">
                                        <input 
                                        type="text" 
                                        name="location"
                                        className="form-control" 
                                        value={Location}
                                        placeholder="location"
                                        onChange={(e) => setName(e.target.value)}
                                        />
                                        
                                    </div>
                                </form>
                                <div className="row">
                                    <button
                                        type="button"
                                        className="btn btn-success"
                                        onClick={async (e) => {
                                            const success = await actions.caimanera({
                                                name: name,
                                                Datetime: Datetime,
                                                location: location,
                                            });
                                            if (success) {
                                          //  navigate("/login"); a donde lo enviaria?
                                            return;
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



    );}