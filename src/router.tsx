// src/router.js
import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Savings from "./components/savings";

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
        element: <Savings />,
      },
      // {
      //   path: "investments",
      //   element: <Investments />,
      // },
      // {
      //   path: "transactions",
      //   element: <Transactions />,
      // },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
