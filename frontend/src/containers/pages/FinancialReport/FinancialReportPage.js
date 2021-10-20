import React from "react";
import { TheFooter, TheHeader } from "../../index";
import Sidebar from "../../../components/Sidebar";
import FinancialReports from "../../../components/FinancialReport";

const FinancialReportPage = (props) => {
  return (
    <div>
      <div className="c-app c-default-layout">
        <Sidebar />
        <div className="c-wrapper">
          <TheHeader />
          <div className="c-body">
            <FinancialReports />
          </div>
          <TheFooter />
        </div>
      </div>
    </div>
  );
};

export default FinancialReportPage;
