const _doctorNav = [
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
    name: "Khám bệnh",
    route: "/icons",
    icon: "cil-settings",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Danh sách cần khám",
        to: "/doctorvisitingforms",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Hồ sơ y tế",
        to: "/doctorvisitingforms",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Đơn thuốc",
        to: "/prescriptions",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Phiếu chỉ định",
        to: "/laborderforms",
      },
    ],
  },
];

export default _doctorNav;
