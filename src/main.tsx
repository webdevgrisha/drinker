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
import {
  CocktailsLayout,
  IngredientsLayout,
  RootLayout,
} from "./layouts/index.ts";
import {
  CocktailList,
  CocktailModalWindow,
} from "./pages/CocktailsPages/index.ts";
import { IngredientList, IngredientModalWindow } from "./pages/IngredientsPages/index.ts";

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
            element: <CocktailList />,
          },
          {
            path: ":id/*",
            element: <CocktailList />,
            children: [
              {
                index: true,
                element: <CocktailModalWindow />,
              },
            ],
          },
        ],
      },
      {
        path: "ingredients",
        element: <IngredientsLayout />,
        children: [
          {
            index: true,
            element: <IngredientList />,
          },
          {
            path: ":id/*",
            element: <IngredientList />,
            children: [
              {
                index: true,
                element: <IngredientModalWindow />,
              },
            ],
          },
        ],
      },
      {
        path: "favourites/",
        element: <CocktailsLayout />,
        children: [
          {
            index: true,
            element: <CocktailList />,
          },
          {
            path: ":id/*",
            element: <CocktailList />,
            children: [
              {
                index: true,
                element: <CocktailModalWindow />,
              },
            ],
          },
        ],
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
