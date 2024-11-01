import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import {ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import App from "./App";
const root = ReactDOM.createRoot(document.getElementById("root"));
import './index.css'
import { StateContextProvider } from "./context";
root.render(
    <ThirdwebProvider desiredChainId = {ChainId.Goerli}>
        <Router>
            <StateContextProvider>
            <App/>
            </StateContextProvider>
        </Router>
    </ThirdwebProvider>
)