import React from "react";
import { TheFooter, TheHeader } from "../../index";
import Sidebar from "../../../components/Sidebar";
import ClinicManagement from "../../../components/ClinicManagement";

const ClinicManagementPage = (props) => {
  return (
    <div>
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
