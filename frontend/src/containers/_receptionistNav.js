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
    icon: "cil-bell",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Dịch vụ",
    route: "/notifications",
    icon: "cil-bell",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Báo cáo",
    to: "/report",
    icon: "cil-calculator",
  },
];

export default _receptionistNav;
