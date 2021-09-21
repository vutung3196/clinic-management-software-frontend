import React from "react";
import { TheContent, TheFooter, TheHeader } from "./../../index";
import Sidebar from "../../../components/Sidebar";

const Main = () => {
  return (
    <div>
      <div className="c-app c-default-layout">
        <Sidebar />
        <div className="c-wrapper">
          <TheHeader />
          <div className="c-body">
            <TheContent />
          </div>
          <TheFooter />
        </div>
      </div>
    </div>
  );
};

export default Main;
