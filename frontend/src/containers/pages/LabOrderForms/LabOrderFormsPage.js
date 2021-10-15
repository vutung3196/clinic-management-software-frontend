import React from "react";
import { TheFooter, TheHeader } from "../../index";
import Sidebar from "../../../components/Sidebar";
import AuthService from "../../../services/authentication/auth.service";
import LabOrderFormsForReceptionist from "../../../components/LabOrderForms";
import LabOrderFormsForDoctor from "../../../components/LabOrderForms";
import LabOrderFormsForTestSpecialist from "../../../components/LabOrderForms";
import { Helmet } from "react-helmet";

export const CustomLabOrderFormsPage = () => {
  if (AuthService.isDoctor()) {
    return <LabOrderFormsForDoctor />;
  } else if (AuthService.isTestSpecialist()) {
    return <LabOrderFormsForTestSpecialist />;
  } else if (AuthService.isReceptionist()) {
    return <LabOrderFormsForReceptionist />;
  } else {
    return;
  }
};

const LabOrderFormsPage = () => {
  return (
    <div>
      <Helmet>
        <title>Danh sách phiếu khám</title>
      </Helmet>
      <div className="c-app c-default-layout">
        <Sidebar />
        <div className="c-wrapper">
          <TheHeader />
          <div className="c-body">
            <CustomLabOrderFormsPage />
          </div>
          <TheFooter />
        </div>
      </div>
    </div>
  );
};

export default LabOrderFormsPage;
