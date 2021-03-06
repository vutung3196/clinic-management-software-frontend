const _receptionistNav = [
  {
    _tag: "CSidebarNavItem",
    name: "Trang chủ",
    to: "/dashboard",
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["Menu"],
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Bệnh nhân",
    route: "/icons",
    icon: "cil-settings",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Danh sách bệnh nhân",
        to: "/patients",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Danh sách phiếu khám",
        to: "/doctorvisitingforms",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Danh sách phiếu chỉ định",
        to: "/laborderforms",
      },
    ],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Phiếu thu",
    route: "/receipts",
    to: "/receipts",
    icon: "cil-bell",
  },
];

export default _receptionistNav;
