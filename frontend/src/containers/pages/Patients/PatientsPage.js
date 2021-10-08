import React from "react";
import { TheFooter, TheHeader } from "../../index";
import Sidebar from "../../../components/Sidebar";
import Patients from "../../../components/Patients";
import { Helmet } from "react-helmet";

const PatientsPage = (props) => {
  return (
    <div>
      <Helmet>
        <title>Danh sách bệnh nhân</title>
      </Helmet>
      <div className="c-app c-default-layout">
        <Sidebar />
        <div className="c-wrapper">
          <TheHeader />
          <div className="c-body">
            <Patients />
          </div>
          <TheFooter />
        </div>
      </div>
    </div>
  );
};

export default PatientsPage;
