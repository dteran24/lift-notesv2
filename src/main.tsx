import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { WorkoutProvider } from "./util/WorkoutContext";
const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <WorkoutProvider>
      <App />
    </WorkoutProvider>
  </React.StrictMode>
);
