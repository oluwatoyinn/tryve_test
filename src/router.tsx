// src/router.js
import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./components/dashboard/Dashboard";
import NotFound from "./pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/dashboard" />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "savings",
        element: <Dashboard />,
      },
      {
        path: "investments",
        element: <Dashboard />,
      },
      {
        path: "transactions",
        element: <Dashboard />,
      },
      {
        path: "goals",
        element: <Dashboard />,
      },
      {
        path: "settings",
        element: <Dashboard />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
