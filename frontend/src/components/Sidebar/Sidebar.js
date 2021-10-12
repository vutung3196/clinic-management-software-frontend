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

import CIcon from "@coreui/icons-react";

// sidebar nav config
import navigation from "../../containers/_nav";
import adminNavigation from "../../containers/_adminNav";
import masterAdminNavigation from "../../containers/_masterAdminNav";
import receptionistNav from "src/containers/_receptionistNav";
import testSpecialistNav from "src/containers/_testSpecialistNav";
import doctorNav from "src/containers/_doctorNav";

export const CustomSideBar = () => {
  if (AuthService.isMasterAdmin()) {
    return (
      <CCreateElement
        items={masterAdminNavigation}
        components={{
          CSidebarNavDropdown,
          CSidebarNavItem,
          CSidebarNavTitle,
        }}
      />
    );
  } else if (AuthService.isAdmin()) {
    return (
      <CCreateElement
        items={adminNavigation}
        components={{
          CSidebarNavDropdown,
          CSidebarNavItem,
          CSidebarNavTitle,
        }}
      />
    );
  } else if (AuthService.isReceptionist()) {
    return (
      <CCreateElement
        items={receptionistNav}
        components={{
          CSidebarNavDropdown,
          CSidebarNavItem,
          CSidebarNavTitle,
        }}
      />
    );
  } else if (AuthService.isDoctor()) {
    return (
      <CCreateElement
        items={doctorNav}
        components={{
          CSidebarNavDropdown,
          CSidebarNavItem,
          CSidebarNavTitle,
        }}
      />
    );
  } else if (AuthService.isTestSpecialist()) {
    return (
      <CCreateElement
        items={testSpecialistNav}
        components={{
          CSidebarNavDropdown,
          CSidebarNavItem,
          CSidebarNavTitle,
        }}
      />
    );
  } else {
    <CCreateElement
      items={navigation}
      components={{
        CSidebarNavDropdown,
        CSidebarNavItem,
        CSidebarNavTitle,
      }}
    />;
  }
};

const Sidebar = () => {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.sidebarShow);

  return (
    <CSidebar
      show={show}
      onShowChange={(val) => dispatch({ type: "set", sidebarShow: val })}
    >
      <CSidebarNav>
        <CustomSideBar />
        {/* {AuthService.isMasterAdmin() ? (
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
        ) : AuthService.isReceptionist() ? (
          <CCreateElement
            items={receptionistNav}
            components={{
              CSidebarNavDropdown,
              CSidebarNavItem,
              CSidebarNavTitle,
            }}
          />
        ) :  AuthService.isDoctor() ? (
          <CCreateElement
          items={receptionistNav}
          components={{
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle,
          }}
        />) :
          <CCreateElement
            items={navigation}
            components={{
              CSidebarNavDropdown,
              CSidebarNavItem,
              CSidebarNavTitle,
            }}
          />
        )} */}
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none" />
    </CSidebar>
  );
};

export default Sidebar;
