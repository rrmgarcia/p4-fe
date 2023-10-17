import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthController from "./controllers/AuthController";
import UserController from "./controllers/UserController";
import TodoController from "./controllers/TodoController";
import { AuthProvider } from "./models/Providers/AuthProvider";
import WelcomePage from "./views/WelcomePage";
import Home from "./views/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <WelcomePage />,
  },
  {
    path: "/register",
    element: <UserController />,
  },
  {
    path: "/signin",
    element: <AuthController />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/todo",
    element: <TodoController />,
  },
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
