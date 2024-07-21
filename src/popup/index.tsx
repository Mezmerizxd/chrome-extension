import ReactDOM from "react-dom/client";
import React from "react";
import { QueryClientProvider } from "react-query";
import { queryClient } from "./libs/react-query";

import "./index.css";

import App from "./app";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

async function main() {
  root.render(
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
}

main();
