import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
} from "@coreui/react";
import AuthService from "../../services/authentication/auth.service";

// sidebar nav config
import navigation from "../../containers/_nav";
import adminNavigation from "../../containers/_adminNav";
import masterAdminNavigation from "../../containers/_masterAdminNav";

const Sidebar = () => {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.sidebarShow);

  return (
    <CSidebar
      show={show}
      onShowChange={(val) => dispatch({ type: "set", sidebarShow: val })}
    >
      <CSidebarNav>
        {AuthService.isMasterAdmin() ? (
          <CCreateElement
            items={masterAdminNavigation}
            components={{
              CSidebarNavDropdown,
              CSidebarNavItem,
              CSidebarNavTitle,
            }}
          />
        ) : AuthService.isAdmin() ? (
          <CCreateElement
            items={adminNavigation}
            components={{
              CSidebarNavDropdown,
              CSidebarNavItem,
              CSidebarNavTitle,
            }}
          />
        ) : (
          <CCreateElement
            items={navigation}
            components={{
              CSidebarNavDropdown,
              CSidebarNavItem,
              CSidebarNavTitle,
            }}
          />
        )}
        ;
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none" />
    </CSidebar>
  );
};

export default Sidebar;
