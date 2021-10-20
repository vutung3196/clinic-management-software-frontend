import React from "react";
import { TheFooter, TheHeader } from "../../index";
import Sidebar from "../../../components/Sidebar";
import Prescriptions from "../../../components/Prescriptions";
import { Helmet } from "react-helmet";

const PrescriptionsPage = (props) => {
  return (
    <div>
      <Helmet>
        <title>Danh sách đơn thuốc</title>
      </Helmet>
      <div className="c-app c-default-layout">
        <Sidebar />
        <div className="c-wrapper">
          <TheHeader />
          <div className="c-body">
            <Prescriptions />
          </div>
          <TheFooter />
        </div>
      </div>
    </div>
  );
};

export default PrescriptionsPage;
