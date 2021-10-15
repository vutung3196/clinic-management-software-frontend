import React from "react";
import { TheFooter, TheHeader } from "../../index";
import Sidebar from "../../../components/Sidebar";
import PatientHospitalizedProfiles from "src/components/PatientHospitalizedProfiles";
import { Helmet } from "react-helmet";

const PatientHospitalizedProfilesPage = () => {
  return (
    <div>
      <Helmet>
        <title>Danh sách hồ sơ y tế</title>
      </Helmet>
      <div className="c-app c-default-layout">
        <Sidebar />
        <div className="c-wrapper">
          <TheHeader />
          <div className="c-body">
            <PatientHospitalizedProfiles />
          </div>
          <TheFooter />
        </div>
      </div>
    </div>
  );
};

export default PatientHospitalizedProfilesPage;
