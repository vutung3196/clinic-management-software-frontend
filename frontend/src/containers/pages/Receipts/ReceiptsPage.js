import React from "react";
import { TheFooter, TheHeader } from "../../index";
import Sidebar from "../../../components/Sidebar";
import Receipts from "src/components/Receipts";
import { Helmet } from "react-helmet";

const ReceiptsPage = () => {
  return (
    <div>
      <Helmet>
        <title>Danh sách phiếu thu</title>
      </Helmet>
      <div className="c-app c-default-layout">
        <Sidebar />
        <div className="c-wrapper">
          <TheHeader />
          <div className="c-body">
            <Receipts />
          </div>
          <TheFooter />
        </div>
      </div>
    </div>
  );
};

export default ReceiptsPage;
