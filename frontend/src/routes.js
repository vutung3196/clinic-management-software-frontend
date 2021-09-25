import React from "react";

const Dashboard = React.lazy(() => import("./components/dashboard/Dashboard"));

const Login = React.lazy(() => import("./containers/pages/Login"));

const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  { path: "/login", exact: true, name: "Login", component: Login },
];

export default routes;
