import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";


import { Provider } from "react-redux";
import { store } from "store/store";
import { AppRouter } from "router/AppRouter";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={ store }>
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  </Provider>
);
