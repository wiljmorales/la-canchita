import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const SignUp = (props) => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    return(
        <div className="portrait-signup">
            <div className="table align-items-center justify-content-center">
                <div
                    style={{ height: "100vh" }}
                    className="container flex-column d-flex align-items-center justify-content-center">
                    <div className="row">
                        <h1 className="text-white">Signup de jugador</h1>
                    </div>
                    <div className="row">
                        <form>
                            <input
                                type="text"
                                name="name"
                                className="form-control my-1"
                                value={name}
                                placeholder="name"
                                onChange={(e) => setName(e.target.value)}
                            />
                            <input
                                type="text"
                                name="email"
                                className="form-control my-1"
                                value={email}
                                placeholder="email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                type="password"
                                name="password"
                                className="form-control my-1"
                                value={password}
                                placeholder="password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </form>
                    </div>
                    <div className="row">
                        <button
                            type="button"
                            className="btn btn-success"
                            onClick={async (e) => {
                                const success = await actions.signUp({
                                    name: name,
                                    email: email,
                                    password: password,
                                });
                                if (success) {
                                navigate("/login");
                                return;
                                }
                                alert("something happened while creating");
                            }}
                            >
                            {"Sign up"}
                        </button>
                    </div>
                </div>


            </div>
        </div>
        

    )

} 