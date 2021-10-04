import React from "react";
import { TheFooter, TheHeader } from "../../index";
import Sidebar from "../../../components/Sidebar";
import Patients from "../../../components/Patients";

const PatientsPage = (props) => {
  return (
    <div>
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
