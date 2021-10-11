import React from "react";
import { TheFooter, TheHeader } from "../../index";
import Sidebar from "../../../components/Sidebar";
import AuthService from "../../../services/authentication/auth.service";
import LabOrderFormsForReceptionist from "../../../components/LabOrderFormsForReceptionist";
import { Helmet } from "react-helmet";

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
            {AuthService.isReceptionist() ? (
              <LabOrderFormsForReceptionist />
            ) : (
              <h1>aaa</h1>
              // <DoctorVisitingFormsForDoctor />
            )}
          </div>
          <TheFooter />
        </div>
      </div>
    </div>
  );
};

export default LabOrderFormsPage;
