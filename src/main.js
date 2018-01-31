import React from "react";
import ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import App from "./App";

function render(AppComponent) {
  ReactDOM.render(
    <AppContainer>
      <AppComponent />
    </AppContainer>,
    document.getElementById("app")
  );
}

document.addEventListener("DOMContentLoaded", function () {
  render(App);
});

// For development
if (module.hot) {
  module.hot.accept("./App", () => {
    render(require("./App").default);
  });
}
