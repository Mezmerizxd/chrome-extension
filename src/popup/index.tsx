import ReactDOM from "react-dom/client";
import React from "react";

import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

async function main() {
  root.render(
    <div className="w-[500px] h-[300px] bg-background border-none outline-none">
      <h1 className="flex items-center justify-center h-full text-lg text-accent-light">
        I REMEMBERED HOW TO CENTER DIV
      </h1>
    </div>
  );
}

main();
