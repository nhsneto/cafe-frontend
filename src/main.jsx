import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Cadastro from "./Routes/Cadastro";
import Edicao from "./Routes/Edicao";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "cadastro", element: <Cadastro /> },
  { path: "edicao", element: <Edicao /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
