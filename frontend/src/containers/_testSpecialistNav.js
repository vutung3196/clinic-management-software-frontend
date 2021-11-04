const testSpecialistNav = [
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
        name: "Phiếu chỉ định",
        to: "/laborderforms",
      },
    ],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Xét nghiệm",
    to: "/labtests",
  },
];

export default testSpecialistNav;
