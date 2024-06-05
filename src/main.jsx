import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./Pages/home.jsx";
import NotFoundPage from "./Pages/404.jsx";
import WishListProvider from "./context/WishListContext.jsx";
import { Provider } from "react-redux";
import { store } from "./redux/store/store.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <WishListProvider>
        <RouterProvider router={router} />
      </WishListProvider>
    </Provider>
  </React.StrictMode>
);
