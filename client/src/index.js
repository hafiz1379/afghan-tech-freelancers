import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const root = ReactDOM.createRoot(document.getElementById("root"));
const queryCleint = new QueryClient();

root.render(
  <QueryClientProvider client={queryCleint}>
    <App />
  </QueryClientProvider>,
);
