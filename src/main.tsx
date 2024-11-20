import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./style/index.css";
import "./style/reset.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { CocktailsLayout, RootLayout } from "./layouts/index.ts";
// import getCotails from "./services/cotails-api.ts";
import { CardList, CocktailsModalWindow } from "./components/index.ts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="cocktails/?page=1" />,
      },
      {
        path: "cocktails/",
        element: <CocktailsLayout />,
        children: [
          {
            index: true,
            element: <CardList />,
          },
          {
            path: ':id/*',
            element: <CardList />,
            children: [
              {
                index: true,
                element: <CocktailsModalWindow />,
              },
            ],
          },
        ],
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

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
