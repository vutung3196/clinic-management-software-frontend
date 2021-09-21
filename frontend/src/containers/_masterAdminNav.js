import React from "react";
import CIcon from "@coreui/icons-react";

const _masterAdminNav = [
  {
    _tag: "CSidebarNavItem",
    name: "Trang chủ",
    to: "/dashboard",
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["Menu"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Phòng khám",
    to: "/clinicmanagement",
    icon: "cil-people",
  },
];

export default _masterAdminNav;
