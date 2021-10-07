import React from "react";
import { TheFooter, TheHeader } from "../../index";
import Sidebar from "../../../components/Sidebar";
import DoctorVisitingForms from "../../../components/DoctorVisitingForms";

const DoctorVisitingFormsPage = (props) => {
  return (
    <div>
      <div className="c-app c-default-layout">
        <Sidebar />
        <div className="c-wrapper">
          <TheHeader />
          <div className="c-body">
            <DoctorVisitingForms />
          </div>
          <TheFooter />
        </div>
      </div>
    </div>
  );
};

export default DoctorVisitingFormsPage;
