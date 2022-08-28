import React from "react";
import ReactDOM from "react-dom/client";
import App from "./Components/App";
import "./Assets/CSS/index.css";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import GlobalReducer from "./Redux/GlobalSlice";

const store = configureStore({
  reducer: {
    Global: GlobalReducer,
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
      <BrowserRouter>
    <Provider store={store}>
        <App />
    </Provider>
      </BrowserRouter>
  </React.StrictMode>
);
