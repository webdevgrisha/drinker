import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./style/reset.css";
import App from "./App.tsx";

import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { RootLayout } from "./layouts/index.ts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="coctails" />,
      },
      {
        path: "coctails",
        element: <h3>Coctails</h3>,
      },
      {
        path: "ingridients",
        element: <h3>ingridients</h3>,
      },
      {
        path: "liked",
        element: <h3>Liked</h3>,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
