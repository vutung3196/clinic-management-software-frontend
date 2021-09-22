import React, { useState, useEffect, lazy } from "react";
import {
  CBadge,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CCallout,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {
  CChartBar,
  CChartLine,
  CChartDoughnut,
  CChartRadar,
  CChartPie,
  CChartPolarArea,
} from "@coreui/react-chartjs";

import MainChartExample from "../charts/MainChartExample.js";
import dashboardService from "src/services/dashboard/dashboard.service";
import authService from "../../services/authentication/auth.service";

const WidgetsDropdown = lazy(() => import("../widgets/WidgetsDropdown.js"));
const WidgetsBrand = lazy(() => import("../widgets/WidgetsBrand.js"));

const Dashboard = () => {
  const [reportData, setReportData] = useState("");

  const getReport = () => {
    var currentUser = authService.getCurrentUser();
    dashboardService
      .get(currentUser.clinicId)
      .then((response) => {
        setReportData(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(getReport, []);

  return (
    <>
      <WidgetsDropdown reportData={reportData} />
      <CCard>
        <CCardBody>
          <CRow>
            <CCol sm="5">
              <h4 id="traffic" className="card-title mb-0">
                Số lượng bệnh nhân theo tháng
              </h4>
              <div className="small text-muted">Năm 2021</div>
            </CCol>
          </CRow>
          <CCol sm="10" className="d-none d-md-block">
            <CChartBar
              datasets={[
                {
                  label: "Số bệnh nhân",
                  backgroundColor: "#f87979",
                  data: reportData.numberOfPatientsByMonthInformation,
                },
              ]}
              labels="months"
              options={{
                tooltips: {
                  enabled: true,
                },
              }}
            />
          </CCol>
        </CCardBody>
      </CCard>
    </>
  );
};

export default Dashboard;
