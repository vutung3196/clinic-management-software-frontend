import React from "react";
import { TheFooter, TheHeader } from "../../index";
import Sidebar from "../../../components/Sidebar";
import LabTests from "../../../components/LabTests";
import { Helmet } from "react-helmet";

const LabTestsPage = () => {
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
            <LabTests />
          </div>
          <TheFooter />
        </div>
      </div>
    </div>
  );
};

export default LabTestsPage;
