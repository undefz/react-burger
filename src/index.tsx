import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from "./components/app/app";
import {Provider} from "react-redux";
import {store} from "./services/store";
import {BrowserRouter} from "react-router-dom";

const rootElement = document.getElementById("root");
if (!rootElement) {
    throw new Error("No root element");
}
const root = ReactDOM.createRoot(rootElement);

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <App/>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>
);
