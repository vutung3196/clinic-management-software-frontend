import React, { useState, useEffect } from "react";
import * as Icon from "react-bootstrap-icons";
import CIcon from "@coreui/icons-react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CButton,
  CDropdownItem as option,
  CCollapse,
  CDropdown,
} from "@coreui/react";
import DatePicker from "react-datepicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { vi } from "date-fns/locale";
import Stack from "@mui/material/Stack";
import financialReportService from "src/services/financialReport/financial.report.service";
import TextField from "@mui/material/TextField";
import {
  CChartBar,
  CChartLine,
  CChartDoughnut,
  CChartRadar,
  CChartPie,
  CChartPolarArea,
} from "@coreui/react-chartjs";

const FinancialReports = () => {
  const [totalReceiptAmount, setTotalReceiptAmount] = useState("");
  const [patientPaymentInformation, setPatientPaymentInformation] = useState(
    []
  );
  const [receiptByDayInformations, setReceiptByDayInformations] = useState([]);
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [report, setReport] = useState(reportConst);
  const [showSelectDate, setShowSelectDate] = useState(false);
  const [selectedMainDate, setSelectedMainDate] = useState("");
  const [fromDateDisplayed, setFromDateDisplayed] = useState("");
  const [toDateDisplayed, setToDateDisplayed] = useState("");

  const retrieveFinancialReports = (previous, current) => {
    console.log(fromDate, toDate);
    financialReportService
      .getFinancialReports(previous, current)
      .then((response) => {
        console.log(response.data);
        var data = response.data;
        setReport(data);
        setTotalReceiptAmount(data.totalReceiptAmountDisplayed);
        setPatientPaymentInformation(data.patientPaymentInformation);
        setReceiptByDayInformations(data.receiptByDayInformations);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const reportConst = {
    totalReceiptAmount: 3600000,
    totalReceiptAmountDisplayed: "3,600,000",
    totalNumberDoctorVisitingForms: 17,
    totalNumberNewPatients: 11,
    totalNumberPrescriptions: 21,
    totalNumberTestPerformed: 5,
    patientPaymentInformation: [
      {
        name: "Nguy???n V??n B",
        dateOfBirth: "10/08/2005",
        gender: "Nam",
        emailAddress: "tungvu3196@gmail.com",
        phoneNumber: "+84912068946",
        address: "59/100, Nam, Qu???n Th???t N???t, Th??nh ph??? C???n Th??",
        amount: 1550000,
        amountDisplayed: "1,550,000",
      },
      {
        name: "V?? T??ng",
        dateOfBirth: "10/08/2021",
        gender: "Nam",
        emailAddress: "mr.mocmoc@gmail.com",
        phoneNumber: "+84912068946",
        address: "399, Hoang Mai, Hoang Mai , Th??nh ph??? H?? N???i",
        amount: 1400000,
        amountDisplayed: "1,400,000",
      },
      {
        name: "Nguy???n V??n A",
        dateOfBirth: "10/25/1990",
        gender: "Nam",
        emailAddress: "mr.mocmoc@gmail.com",
        phoneNumber: "+84912068946",
        address: "59/100, Ahihi, Qu???n Ninh Ki???u, Th??nh ph??? C???n Th??",
        amount: 450000,
        amountDisplayed: "450,000",
      },
      {
        name: "John Doe 1",
        dateOfBirth: "10/04/2018",
        gender: "N???",
        emailAddress: "mr.mocmoc@gmail.com",
        phoneNumber: "+84912068946",
        address: "59/102, Truong Chinh, Dong Da, Th??nh ph??? H?? N???i",
        amount: 50000,
        amountDisplayed: "50,000",
      },
      {
        name: "V?? T??ng 1",
        dateOfBirth: "10/08/2021",
        gender: "Nam",
        emailAddress: "mr.mocmoc@gmail.com",
        phoneNumber: "+84912068946",
        address: "59/102 , Tr?????ng Chinh, Qu???n ?????ng ??a, Th??nh ph??? H?? N???i",
        amount: 50000,
        amountDisplayed: "50,000",
      },
      {
        name: "Vu Tung",
        dateOfBirth: "10/10/2021",
        gender: "N???",
        emailAddress: "mr.mocmoc@gmail.com",
        phoneNumber: "+84912068946",
        address: "59/102, Truong Chinh, Huy???n Qu???c Oai, Th??nh ph??? H?? N???i",
        amount: 50000,
        amountDisplayed: "50,000",
      },
      {
        name: "V?? T??ng",
        dateOfBirth: "07/02/2021",
        gender: "Nam",
        emailAddress: "mr.mocmoc@gmail.com",
        phoneNumber: "+84912068946",
        address: "60/120, Ph????ng Mai, Qu???n T??y H???, Th??nh ph??? H?? N???i",
        amount: 50000,
        amountDisplayed: "50,000",
      },
    ],
    receiptByDayInformations: [
      {
        date: "10/05/2021",
        totalReceiptAmount: 50000,
        medicalServiceName: null,
        totalReceiptInDay: 0,
        totalReceiptAmountDisplayed: "50,000",
      },
      {
        date: "10/06/2021",
        totalReceiptAmount: 150000,
        medicalServiceName: null,
        totalReceiptInDay: 0,
        totalReceiptAmountDisplayed: "150,000",
      },
      {
        date: "10/08/2021",
        totalReceiptAmount: 300000,
        medicalServiceName: null,
        totalReceiptInDay: 0,
        totalReceiptAmountDisplayed: "300,000",
      },
      {
        date: "10/10/2021",
        totalReceiptAmount: 150000,
        medicalServiceName: null,
        totalReceiptInDay: 0,
        totalReceiptAmountDisplayed: "150,000",
      },
      {
        date: "10/12/2021",
        totalReceiptAmount: 750000,
        medicalServiceName: null,
        totalReceiptInDay: 0,
        totalReceiptAmountDisplayed: "750,000",
      },
      {
        date: "10/17/2021",
        totalReceiptAmount: 650000,
        medicalServiceName: null,
        totalReceiptInDay: 0,
        totalReceiptAmountDisplayed: "650,000",
      },
      {
        date: "10/18/2021",
        totalReceiptAmount: 1550000,
        medicalServiceName: null,
        totalReceiptInDay: 0,
        totalReceiptAmountDisplayed: "1,550,000",
      },
    ],
    numberOfPatientsByMonth: [0, 0, 0, 0, 0, 0, 0, 0, 0, 17, 0, 0],
  };

  const onChangeSelectedMainDate = (value) => {
    setSelectedMainDate(value);
    if (value === "thisYear") {
      selectThisYear();
      setShowSelectDate(false);
    } else if (value === "thisMonth") {
      selectThisMonth();
      setShowSelectDate(false);
    } else {
      console.log("config pls");
      setShowSelectDate(true);
    }
  };

  const selectThisMonth = () => {
    var date = new Date();
    var month = date.getMonth(); // yields month (add one as '.getMonth()' is zero indexed)
    var year = date.getFullYear(); // yields year
    const startMonth = new Date(year, month, 1);
    const endMonth = new Date(year, month + 1, 0);
    var realFromDate = new Date(
      startMonth.getTime() - startMonth.getTimezoneOffset() * 60000
    );
    var realToDate = new Date(
      endMonth.getTime() - endMonth.getTimezoneOffset() * 60000
    );
    setFromDate(realFromDate);
    setToDate(realToDate);
    setFromDateDisplayed(1 + "/" + (month + 1) + "/" + year);
    setToDateDisplayed(endMonth.getDate() + "/" + (month + 1) + "/" + year);
    retrieveFinancialReports(realFromDate.toJSON(), realToDate.toJSON());
  };

  const selectThisYear = () => {
    var date = new Date();
    var day = date.getDate(); // yields date
    var month = date.getMonth(); // yields month (add one as '.getMonth()' is zero indexed)
    var year = date.getFullYear(); // yields year
    const startMonth = new Date(year, 0, 1);
    const endMonth = new Date(year, month, day);
    var realFromDate = new Date(
      startMonth.getTime() - startMonth.getTimezoneOffset() * 60000
    );
    var realToDate = new Date(
      endMonth.getTime() - endMonth.getTimezoneOffset() * 60000
    );
    setFromDate(realFromDate);
    setToDate(realToDate);
    console.log(realFromDate);
    console.log(realToDate);
    setFromDateDisplayed(1 + "/" + (month + 1) + "/" + (year - 1));
    setToDateDisplayed(day + "/" + (month + 1) + "/" + year);
    retrieveFinancialReports(realFromDate.toJSON(), realToDate.toJSON());
  };

  useEffect(() => {
    var date = new Date();
    var day = date.getDate(); // yields date
    var month = date.getMonth(); // yields month (add one as '.getMonth()' is zero indexed)
    var year = date.getFullYear(); // yields year
    const startMonth = new Date(year, 0, 1);
    const endMonth = new Date(year, month, day);
    var realFromDate = new Date(
      startMonth.getTime() - startMonth.getTimezoneOffset() * 60000
    );
    var realToDate = new Date(
      endMonth.getTime() - endMonth.getTimezoneOffset() * 60000
    );
    setFromDate(realFromDate);
    setToDate(realToDate);
    setFromDateDisplayed(1 + "/" + 1 + "/" + year);
    setToDateDisplayed(day + "/" + (month + 1) + "/" + year);
    retrieveFinancialReports(realFromDate.toJSON(), realToDate.toJSON());
  }, []);

  const showReportInPeriod = () => {
    setFromDateDisplayed(
      fromDate.getDate() +
        "/" +
        (fromDate.getMonth() + 1) +
        "/" +
        fromDate.getFullYear()
    );
    setToDateDisplayed(
      toDate.getDate() +
        "/" +
        (toDate.getMonth() + 1) +
        "/" +
        toDate.getFullYear()
    );
    retrieveFinancialReports(fromDate.toJSON(), toDate.toJSON());
  };

  const SelectDate = () => {
    return showSelectDate ? (
      <div id="d_sel_time" class="c" style={{ display: "none;" }}>
        <div class="stt-0" style={{ "padding-top": "10px" }}>
          {/* <div class="lbl">T???</div> */}
          <LocalizationProvider locale={vi} dateAdapter={AdapterDateFns}>
            <Stack spacing={1} sx={{ width: 150, paddingtop: 10 }}>
              <DesktopDatePicker
                label="T???"
                value={fromDate}
                minDate={new Date("1900-01-01")}
                onChange={(newValue) => {
                  setFromDate(newValue);
                }}
                variant="standard"
                renderInput={(params) => <TextField {...params} />}
              />
            </Stack>
          </LocalizationProvider>
          {/* <DatePicker
            class="txt_sday1"
            selected={fromDate}
            onChange={(selected) => {
              let AdjusteddateValue = new Date(
                selected.getTime() - selected.getTimezoneOffset() * 60000
              );

              setFromDate(AdjusteddateValue);
            }}
          /> */}
        </div>
        <div class="stt-0" style={{ "padding-top": "10px" }}>
          {/* <div class="lbl">?????n </div> */}
          <LocalizationProvider locale={vi} dateAdapter={AdapterDateFns}>
            <Stack spacing={1} sx={{ width: 150 }}>
              <DesktopDatePicker
                label="?????n"
                value={toDate}
                minDate={new Date("1900-01-01")}
                onChange={(newValue) => {
                  setToDate(newValue);
                }}
                variant="standard"
                renderInput={(params) => <TextField {...params} />}
              />
            </Stack>
          </LocalizationProvider>
        </div>
        <div class="stt-0">
          <input
            type="button"
            class="button"
            id="btn_thongke"
            value="Xem"
            onClick={() => showReportInPeriod()}
          />
        </div>
      </div>
    ) : (
      ""
    );
  };

  return (
    <div id="dmcmain1" class="dm-c-main-1">
      <div class="dm_title_0 addnew0">
        <div class="dm-title-c">
          <div id="ucDMDataManager2_dm_title" class="dm_title">
            B??o c??o ph??ng kh??m
          </div>
          <div id="ucDMDataManager2_dm_act_btn" class="dm-act-btn"></div>
          <div id="dm_act_close"></div>
        </div>
        <div id="ucDMDataManager2_C_1" class="dm-filter-c">
          <div class="a_header_filter_c" style={{ float: "none" }}>
            <div class="dropdown_site">
              <div class="dm_edit_help_div no_display">Lo???i d??? li???u</div>
            </div>
            <div id="dms_input_c">
              <div class="c">
                <div class="stt-0">
                  <div class="lbl">Th???i gian </div>
                  <div>
                    <CDropdown>
                      <select
                        id="sel_thongke_type"
                        class="ioc_select"
                        l="1"
                        y="2021"
                        m="8"
                        d="5"
                        onChange={(e) =>
                          onChangeSelectedMainDate(e.target.value)
                        }
                        value={selectedMainDate}
                      >
                        <option value="thisYear">N??m nay</option>
                        <option value="thisMonth">Th??ng n??y</option>
                        <option value="config">T??y ch???nh</option>
                      </select>
                    </CDropdown>
                  </div>
                </div>
              </div>
              <SelectDate />
              <div id="thongke_datetime">
                <span class="color-blur">T??? ng??y</span> {fromDateDisplayed}{" "}
                <span class="color-blur">?????n</span> {toDateDisplayed}{" "}
              </div>
              <div class="clear"></div>
            </div>
          </div>
        </div>
        <div class="clear"></div>
      </div>
      <div class="dm_home_c" style={{ height: "689px" }}>
        <div>
          <div class="dm_tab_right">
            <div id="ucDMDataManager2_tab_ListContainer" class="dm_c">
              <div id="ucDMDataManager2_C_3" class="dm_c_3">
                <div class="dm_statistic" style={{ height: "693px;" }}>
                  <input
                    type="hidden"
                    id="hdf_querytype"
                    name="hdf_querytype"
                    value="1"
                  />
                  <div style={{ padding: "10px;" }}>
                    <div id="d_statistic_0">
                      <div class="lsum_c">
                        <div class="lsum_r">
                          T???ng thu:{" "}
                          <span style={{ color: "#093" }}>
                            {totalReceiptAmount}
                          </span>
                        </div>
                        {/* <div class="lsum_p">
                          T???ng chi:{" "}
                          <span style={{ color: "#900" }}>
                            {totalSpendingAmount}
                          </span>
                        </div> */}
                        {/* <div class="lsum_over">
                          Doanh thu:{" "}
                          <span style={{ color: "#00A6CF" }}>
                            ({totalBalanceAmount})
                          </span>
                        </div> */}
                      </div>
                      <div class="col1">
                        <div class="t">Th??ng tin chung trong k???</div>
                        <div class="full-tbl-c">
                          <table
                            cellpadding="0"
                            cellspacing="4"
                            border="0"
                            class="table_normal"
                            style={{ width: "auto" }}
                          >
                            <thead>
                              <tr>
                                <th>S??? l?????t kh??m b???nh </th>
                                <th>S??? b???nh nh??n m???i </th>
                                <th>S??? ????n thu???c trong k??? </th>
                                <th>S??? x??t nghi???m ???????c th???c hi???n trong k??? </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td align="right">
                                  {report !== undefined
                                    ? report.totalNumberDoctorVisitingForms
                                    : ""}
                                </td>
                                <td align="right">
                                  {report !== undefined
                                    ? report.totalNumberNewPatients
                                    : ""}
                                </td>
                                <td align="right">
                                  {report !== undefined
                                    ? report.totalNumberPrescriptions
                                    : ""}
                                </td>
                                <td align="right">
                                  {report !== undefined
                                    ? report.totalNumberTestPerformed
                                    : ""}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <div class="col1">
                        <div class="t">T???ng thu trong k???</div>
                        <div class="full-tbl-c">
                          <table
                            cellpadding="0"
                            cellspacing="1"
                            border="0"
                            class="table_normal"
                            style={{ width: "auto" }}
                          >
                            <thead>
                              <tr>
                                <th>T???ng thu </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td align="right">{totalReceiptAmount}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <div class="t">T???ng s??? ti???n thu c??c ng??y trong k???</div>
                        <div class="froz_tbl">
                          <div class="full-tbl-c full-tbl-iodetail">
                            <table
                              id="tbl_st0"
                              cellpadding="0"
                              cellspacing="1"
                              border="0"
                              class="table_normal"
                              style={{ width: "auto" }}
                            >
                              <thead>
                                <tr>
                                  <th class="hcol">Ng??y</th>
                                  {/* <th class="light">T???ng chi</th> */}
                                  <th class="light">T???ng thu</th>
                                  {/* <th class="light">S??? d??</th> */}
                                  {/* <th class="c1">Ghi ch??</th> */}
                                </tr>
                              </thead>
                              <tbody>
                                {receiptByDayInformations !== undefined &&
                                receiptByDayInformations !== null
                                  ? receiptByDayInformations.map(
                                      (element, index) => (
                                        <tr class="tr_sum">
                                          <td class="hcol" align="center">
                                            {element.date}
                                          </td>
                                          {/* <td align="right" class="light">
                                            {
                                              element.totalSpendingAmountDisplayed
                                            }
                                          </td> */}
                                          <td align="right" class="light">
                                            <div class="z">
                                              {
                                                element.totalReceiptAmountDisplayed
                                              }
                                            </div>
                                          </td>
                                          {/* <td align="right" class="light">
                                            <div class="z">
                                              {
                                                element.totalBalanceAmountDisplayed
                                              }
                                            </div>
                                          </td> */}
                                          {/* <td align="right" class="light">
                                            <div class="z">
                                              {element.numberOfPrescriptions}
                                            </div>
                                          </td>
                                          <td align="right" class="light">
                                            <div class="z">
                                              {
                                                element.totalPrescriptionAmountDisplayed
                                              }
                                            </div>
                                          </td> */}
                                        </tr>
                                      )
                                    )
                                  : ""}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                      {/* <CRow>
                        <CCol sm="5">
                          <h4 id="traffic" className="card-title mb-0">
                            S??? l?????ng b???nh nh??n kh??m theo th??ng
                          </h4>
                          <div className="small text-muted">N??m 2021</div>
                        </CCol>
                      </CRow>
                      <CCol sm="10" className="d-none d-md-block">
                        <CChartBar
                          datasets={[
                            {
                              label: "S??? b???nh nh??n",
                              backgroundColor: "#f87979",
                              data: report.numberOfPatientsByMonth,
                            },
                          ]}
                          labels="months"
                          options={{
                            tooltips: {
                              enabled: true,
                            },
                          }}
                        />
                      </CCol> */}
                    </div>
                    <div class="clear"></div>
                  </div>
                  <div class="clear"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="clear"></div>
          <div id="ucDMDataManager2_C_6" class="dm_c_6"></div>
        </div>
      </div>
    </div>
  );
};

export default FinancialReports;
