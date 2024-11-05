import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Check from "./Pages/Check.jsx";
import { get_all_pending } from "./apiFunction/apiFunction.js";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
    },
    {
      path: "/check",
      element: <Check />,
      loader: async () => {
        let allPending = await get_all_pending();
        if (allPending) {
          return allPending;
        } else {
          return [];
        }
      },
    },
  ],
  { basename: "/check_in" }
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
