import React from "react";
import { TheFooter, TheHeader } from "../../index";
import Sidebar from "../../../components/Sidebar";
import ClinicManagement from "../../../components/ClinicManagement";
import { Helmet } from "react-helmet";

const ClinicManagementPage = (props) => {
  return (
    <div>
      <Helmet>
        <title>Phần mềm quản lý phòng khám</title>
      </Helmet>
      <div className="c-app c-default-layout">
        <Sidebar />
        <div className="c-wrapper">
          <TheHeader />
          <div className="c-body">
            <ClinicManagement />
          </div>
          <TheFooter />
        </div>
      </div>
    </div>
  );
};

export default ClinicManagementPage;
