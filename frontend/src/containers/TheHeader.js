import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CHeader,
  CToggler,
  CHeaderBrand,
  CHeaderNav,
  CHeaderNavItem,
  CHeaderNavLink,
  CSubheader,
  CBreadcrumbRouter,
  CImg,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { Image, Transformation } from "cloudinary-react";
import clinicService from "src/services/clinicservice/clinic.service";
import authService from "src/services/authentication/auth.service";

// routes config
import routes from "../routes";

import { TheHeaderDropdown } from "./index";

const TheHeader = () => {
  const constClinic = {
    id: 24,
    name: "Hà phạm Clinic 123",
    emailAddress: "tungvu3196@gmail.com",
    phoneNumber: "+84912068946",
    description: null,
    addressStreet: "",
    addressDistrict: "",
    addressCity: "",
    addressDetailInformation: ", , , ",
    addressDetail: "",
    imageFile: null,
  };

  const [clinic, setClinic] = React.useState(constClinic);
  const dispatch = useDispatch();
  const sidebarShow = useSelector((state) => state.sidebarShow);

  const toggleSidebar = () => {
    const val = [true, "responsive"].includes(sidebarShow)
      ? false
      : "responsive";
    dispatch({ type: "set", sidebarShow: val });
  };

  const toggleSidebarMobile = () => {
    const val = [false, "responsive"].includes(sidebarShow)
      ? true
      : "responsive";
    dispatch({ type: "set", sidebarShow: val });
  };

  const retrieveClinicInformation = () => {
    var currentUser = authService.getCurrentUser();
    clinicService
      .getClinicInformation(currentUser.clinicId)
      .then((response) => {
        var clinic = response.data;
        setClinic(clinic);
        console.log(clinic);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  React.useEffect(() => {
    retrieveClinicInformation();
  }, []);

  return (
    <CHeader withSubheader>
      <CToggler
        inHeader
        className="ml-md-3 d-lg-none"
        onClick={toggleSidebarMobile}
      />
      <CToggler
        inHeader
        className="ml-3 d-md-down-none"
        onClick={toggleSidebar}
      />
      <CHeaderBrand className="mx-auto d-lg-none" to="/">
        <CIcon name="logo" height="48" alt="Logo" />
      </CHeaderBrand>

      <CHeaderNav className="d-md-down-none mr-auto">
        {clinic.imageFile !== null ? (
          <div className="c-avatar">
            <Image
              cloudName="dzftzmcxb"
              secure="true"
              upload_preset="xdf93shk"
              publicId={clinic.imageFile.publicId}
            >
              <Transformation
                width="50"
                height="50"
                gravity="south"
                crop="fill"
              />
            </Image>
          </div>
        ) : (
          ""
        )}

        <CHeaderNavItem className="px-3">
          {/* <CHeaderNavLink class="header-text1">
            Phòng khám Hà Phạm
          </CHeaderNavLink> */}
          <p class="header-text1">Phòng khám {clinic.name}</p>
        </CHeaderNavItem>

        <CHeaderNavItem className="px-3"></CHeaderNavItem>
        {/* <CHeaderNavItem className="px-3">
          <CHeaderNavLink to="/dashboard">Phòng khám Hà Phạm</CHeaderNavLink>
        </CHeaderNavItem> */}
      </CHeaderNav>

      <CHeaderNav className="px-3">
        <TheHeaderDropdown />
      </CHeaderNav>

      <CSubheader className="px-3 justify-content-between">
        <CBreadcrumbRouter
          className="border-0 c-subheader-nav m-0 px-0 px-md-3"
          routes={routes}
        />
      </CSubheader>
    </CHeader>
  );
};

export default TheHeader;
