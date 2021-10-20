import React from "react";
import { TheFooter, TheHeader } from "../../index";
import Sidebar from "../../../components/Sidebar";
import MedicalServices from "../../../components/MedicalServicesManagement";
import { Helmet } from "react-helmet";

const MedicalServicesPage = (props) => {
  return (
    <div>
      <Helmet>
        <title>Danh sách nhóm chỉ định</title>
      </Helmet>
      <div className="c-app c-default-layout">
        <Sidebar />
        <div className="c-wrapper">
          <TheHeader />
          <div className="c-body">
            <MedicalServices />
          </div>
          <TheFooter />
        </div>
      </div>
    </div>
  );
};

export default MedicalServicesPage;
