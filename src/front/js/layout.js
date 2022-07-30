import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { SignUp } from "./pages/SignUp";
import { Login } from "./pages/Login";
import { Caimaneras } from "./pages/Caimaneras";
import { Wrapper, Status } from "@googlemaps/react-wrapper";

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    return (
        <div>
            <Wrapper apiKey={process.env.GOOGLE_MAPS_API_KEY}>
                <BrowserRouter basename={basename}>
                    <ScrollToTop>
                        <Navbar />
                        <Routes>
                            <Route element={<Home />} path="/" />
                            <Route element={<Demo />} path="/demo" />
                            <Route element={<Single />} path="/single/:theid" />
                            <Route element={<SignUp />} path="/sign-up" />
                            <Route element={<Login />} path="/login" />
                            <Route
                                element={<Caimaneras />}
                                path="/caimaneras"
                            />
                            <Route element={<h1>Not found!</h1>} />
                        </Routes>
                        <Footer />
                    </ScrollToTop>
                </BrowserRouter>
            </Wrapper>
        </div>
    );
};

export default injectContext(Layout);
