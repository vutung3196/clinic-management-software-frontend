import React from "react";
import { TheFooter, TheHeader } from "../../index";
import Sidebar from "../../../components/Sidebar";
import AuthService from "../../../services/authentication/auth.service";
import DoctorVisitingFormsForDoctor from "../../../components/DoctorVisitingFormsForDoctor";
import DoctorVisitingFormsForReceptionist from "../../../components/DoctorVisitingFormsForReceptionist";
import { Helmet } from "react-helmet";

const DoctorVisitingFormsPage = () => {
  return (
    <div>
      <Helmet>
        <title>Phiếu khám</title>
      </Helmet>
      <div className="c-app c-default-layout">
        <Sidebar />
        <div className="c-wrapper">
          <TheHeader />
          <div className="c-body">
            {AuthService.isReceptionist() ? (
              <DoctorVisitingFormsForReceptionist />
            ) : (
              <DoctorVisitingFormsForDoctor />
            )}
          </div>
          <TheFooter />
        </div>
      </div>
    </div>
  );
};

export default DoctorVisitingFormsPage;
