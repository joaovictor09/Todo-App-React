import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { Login } from "./pages/Login";
import { SignIn } from "./pages/SignIn";
import { Todos } from "./pages/Todos";

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
  return (
    <RouterProvider router={router} />
  )
}