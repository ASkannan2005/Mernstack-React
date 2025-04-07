import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"; // Global styles
import App from "./App";
import RockPaperScissors from "./RockPaperScissors";

import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    <RockPaperScissors />
  </React.StrictMode>
);

reportWebVitals();
