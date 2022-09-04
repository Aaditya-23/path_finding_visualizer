import React from "react";
import ReactDOM from "react-dom/client";
import App from "./Components/App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import AlgorithmsSlice from "./Redux/AlgorithmsSlice";

const store = configureStore({
  reducer: {
    algorithms: AlgorithmsSlice,
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
