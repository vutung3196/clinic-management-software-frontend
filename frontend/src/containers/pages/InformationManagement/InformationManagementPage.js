import React from "react";
import { TheFooter, TheHeader } from "../../index";
import InformationManagement from "../../../components/InformationManagement";
import Sidebar from "../../../components/Sidebar";

const InformationManagementPage = (props) => {
  return (
    <div>
      <div className="c-app c-default-layout">
        <Sidebar />
        <div className="c-wrapper">
          <TheHeader />
          <div className="c-body">
            <InformationManagement />
          </div>
          <TheFooter />
        </div>
      </div>
    </div>
  );
};

export default InformationManagementPage;
