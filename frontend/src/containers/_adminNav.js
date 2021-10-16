const _adminNav = [
  {
    _tag: "CSidebarNavItem",
    name: "Trang chủ",
    to: "/dashboard",
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["Menu"],
  },
  // {
  //   _tag: "CSidebarNavDropdown",
  //   name: "Dịch vụ",
  //   route: "/notifications",
  //   icon: "cil-bell",
  // },
  // {
  //   _tag: "CSidebarNavItem",
  //   name: "Báo cáo",
  //   to: "/report",
  //   icon: "cil-calculator",
  // },
  {
    _tag: "CSidebarNavDropdown",
    name: "Quản lý",
    route: "/icons",
    icon: "cil-settings",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Quản lý chung",
        to: "/informationmanagement",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Tài khoản đăng nhập",
        to: "/usermanagement",
      },
    ],
  },
];

export default _adminNav;
