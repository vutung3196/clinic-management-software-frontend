import React from "react";

const Dashboard = React.lazy(() => import("./components/dashboard/Dashboard"));

const Login = React.lazy(() => import("./containers/pages/Login"));
const ClinicManagement = React.lazy(() =>
  import("./components/ClinicManagement/ClinicManagement")
);

const routes = [
  { path: "/", exact: true, name: "Home" },
  // { path: "/dashboard", name: "Dashboard", component: Dashboard },
  { path: "/login", exact: true, name: "Login", component: Login },
  // {
  //   path: "/clinicmanagement",
  //   exact: true,
  //   name: "Clinic management page",
  //   component: ClinicManagement,
  // },
];

export default routes;
