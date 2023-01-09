import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { useState } from "react";

import { Login } from "./pages/Login";
import { SignIn } from "./pages/SignIn";
import { Todos } from "./pages/Todos";
import Cookies from "universal-cookie";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: '/signin',
    element: <SignIn />,
  },
  {
    path: '/todos',
    element: <Todos />
  }
]);

export function App() {
    <RouterProvider router={router} />
}