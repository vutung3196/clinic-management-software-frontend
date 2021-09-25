import React from "react";
import UserManagement from "../../../components/UserManagement";
import { TheFooter, TheHeader } from "../../index";
import Sidebar from "../../../components/Sidebar";
import { Helmet } from "react-helmet";

const UserManagementPage = (props) => {
  return (
    <div>
      <Helmet>
        <title>Phần mềm quản lý phòng khám</title>
      </Helmet>
      <div className="c-app c-default-layout">
        <Sidebar />
        <div className="c-wrapper">
          <TheHeader />
          <div className="c-body">
            <UserManagement />
          </div>
          <TheFooter />
        </div>
      </div>
    </div>
  );
};

export default UserManagementPage;
