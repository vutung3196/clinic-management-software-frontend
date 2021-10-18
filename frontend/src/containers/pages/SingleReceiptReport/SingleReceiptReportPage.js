import { useState, useEffect } from "react";
import receiptService from "src/services/receipt/receipt.service";
import * as Icon from "react-bootstrap-icons";
import { CTooltip } from "@coreui/react";
import { Helmet } from "react-helmet";
import * as qs from "qs";

const SingleReceiptReportPage = (props) => {
  const init = {
    containingPatientName: false,
    containingPatientAge: false,
    containingPatientEmail: false,
    containingPatientAddress: false,
    containingPatientPhoneNumber: false,
    clinicInformation: {
      id: 0,
      name: "Ha pham",
      emailAddress: null,
      phoneNumber: "+84912068946",
      address: "Hà Nội",
      description: null,
    },
    total: 1400000.0,
    totalDisplayed: "1,400,000",
    totalInText: " một triệu bốn trăm nghìn đồng",
    medicalServices: [
      {
        name: "Phí khám bệnh",
        quantity: 1,
        basePrice: 50000.0,
        total: 50000.0,
        totalDisplayed: "50,000",
        description: "lollolol",
        id: 2,
        receiptCode: "PT123231313",
        createdAt: "10/05/2021",
        patientInformation: {
          id: 1,
          clinicId: 1,
          fullName: "John Doe 1",
          emailAddress: "tungvu3196@gmail.com",
          phoneNumber: "+84912068946",
          gender: "Nữ",
          createdAt: "09/25/2021",
          updatedAt: "09/25/2021",
          addressDetail: "59/102",
          addressCity: "Thành phố Hà Nội",
          addressStreet: "Truong Chinh",
          addressDistrict: "Dong Da",
          dateOfBirth: "2018-10-04T09:00:55",
          dateOfBirthDetail: "10/04/2018",
          age: 3,
          medicalInsuranceCode: "03123213123",
        },
      },
      {
        name: "Phí khám bệnh",
        quantity: 1,
        basePrice: 50000.0,
        total: 50000.0,
        totalDisplayed: "50,000",
        description: "nothing",
        id: 3,
        receiptCode: "PT7482",
        createdAt: "10/06/2021",
        patientInformation: {
          id: 7,
          clinicId: 1,
          fullName: "Vũ Tùng",
          emailAddress: "tungvu3196@gmail.com",
          phoneNumber: "+84912068946",
          gender: "Nam",
          createdAt: "10/04/2021",
          updatedAt: "10/04/2021",
          addressDetail: "399",
          addressCity: "Thành phố Hà Nội",
          addressStreet: "Hoang Mai",
          addressDistrict: "Hoang Mai ",
          dateOfBirth: "2021-10-08T13:38:13",
          dateOfBirthDetail: "10/08/2021",
          age: 0,
          medicalInsuranceCode: "3132393913",
        },
      },
    ],
  };

  const [reportInformation, setReportInformation] = useState(init);
  const [date, setDate] = useState("");
  const [startDateDisplayed, setStartDateDisplayed] = useState("");
  const [endDateDisplayed, setEndDateDisplayed] = useState("");
  const [containingPatientName, setContainingPatientName] = useState(false);
  const [containingPatientEmail, setContainingPatientEmail] = useState(false);
  const [containingPatientAddress, setContainingPatientAddress] =
    useState(false);
  const [containingPatientPhoneNumber, setContainingPatientPhoneNumber] =
    useState(false);

  useEffect(() => {
    var startDate = qs.parse(props.location.search, {
      ignoreQueryPrefix: true,
    }).startDate;
    var endDate = qs.parse(props.location.search, {
      ignoreQueryPrefix: true,
    }).endDate;
    var containingPatientName = qs.parse(props.location.search, {
      ignoreQueryPrefix: true,
    }).containingPatientName;
    console.log("lol");
    console.log(containingPatientName);
    var containingPatientEmail = qs.parse(props.location.search, {
      ignoreQueryPrefix: true,
    }).containingPatientEmail;
    var containingPatientAddress = qs.parse(props.location.search, {
      ignoreQueryPrefix: true,
    }).containingPatientAddress;
    var containingPatientPhoneNumber = qs.parse(props.location.search, {
      ignoreQueryPrefix: true,
    }).containingPatientPhoneNumber;
    setContainingPatientName(containingPatientName);
    setContainingPatientEmail(containingPatientEmail);
    setContainingPatientAddress(containingPatientAddress);
    setContainingPatientPhoneNumber(containingPatientPhoneNumber);
    var myDate = new Date(startDate);
    var startDateDisplayed =
      myDate.getDate() +
      "/" +
      (myDate.getMonth() + 1) +
      "/" +
      myDate.getFullYear();
    var myDate2 = new Date(endDate);
    var endDateDisplayed =
      myDate2.getDate() +
      "/" +
      (myDate2.getMonth() + 1) +
      "/" +
      myDate2.getFullYear();

    setStartDateDisplayed(startDateDisplayed);
    setEndDateDisplayed(endDateDisplayed);
    receiptService.getReport(startDate, endDate).then(
      (response) => {
        setReportInformation(response.data);
        console.log(response.data);
      },
      (error) => {
        console.log(error.response);
      }
    );
  }, [!reportInformation]);

  function isMedication(element) {
    return element.isMedication === true;
  }

  function isService(element) {
    return element.isMedication === false;
  }

  const print = () => {
    window.print();
  };

  return (
    <html lang="vi" class="js-focus-visible" data-js-focus-visible="">
      <Helmet>
        <title>Bảng kê</title>
      </Helmet>
      <body data-new-gr-c-s-check-loaded="14.1022.0" data-gr-ext-installed="">
        <div
          id="StayFocusd-infobar"
          style={{
            display: "none",
            top: "0px",
          }}
        >
          <span id="StayFocusd-infobar-msg"></span>
          <span id="StayFocusd-infobar-links">
            <a id="StayFocusd-infobar-never-show">hide forever</a>
            &nbsp;&nbsp;|&nbsp;&nbsp;
            <a id="StayFocusd-infobar-hide">hide once</a>
          </span>
        </div>
        <div
          class="view-c0"
          style={{
            "text-rendering": "auto",
            "-webkit-font-smoothing": "antialiased",
            "font-family": "-apple-system,BlinkMacSystemFont",
            "text-align": "left",
            color: "#000",
            "line-height": 2,
            "font-size": "13px",
            width: "800px",
            margin: "0 auto",
          }}
        >
          <div
            class="view-c1"
            style={{
              "text-rendering": "auto",
              "-webkit-font-smoothing": "antialiased",
              "font-family": "Segoe UI",
              "text-align": "left",
              color: "#000",
              "line-height": "2",
              "font-size": "13px",
              "box-sizing": "border-box",
              background: "#fff",
              padding: "20px",
              "margin-bottom": "20px",
              "box-shadow": "2px 3px 3px #888",
              border: "1px solid #ddd",
              // "border-top": "1px solid #ddd",
              // "border-left": "1px solid #ddd",
            }}
          >
            <div class="dochead2">
              <div style={{ "line-height": "0.3" }}>
                <p>
                  Tên đơn vị: Phòng khám{" "}
                  {reportInformation.clinicInformation.name}
                </p>
                <p>Địa chỉ: {reportInformation.clinicInformation.address}</p>
                <p>
                  Điện thoại: {reportInformation.clinicInformation.phoneNumber}
                </p>
              </div>
            </div>
            <div style={{ "text-align": "center" }}>
              <div
                style={{
                  "font-size": "20px",
                  "font-weight": "bold",
                  color: "#3E7770",
                  "text-transform": "uppercase",
                }}
              >
                Bảng kê
              </div>
              <div>
                Thời gian: từ {startDateDisplayed} đến {endDateDisplayed}{" "}
              </div>
            </div>
            <div style={{ padding: "15px 0 5px", overflow: "auto" }}>
              {/* <div style={{ "font-weight": "bold" }}>
                Thông tin danh sách phiếu thu
              </div> */}
            </div>
            <div style={{ padding: "15px 0 15px", overflow: "auto" }}>
              <table
                class="tab_table print_drugtable tbl-border"
                style={{
                  width: "100%",
                  "text-rendering": "auto",
                  "-webkit-font-smoothing": "antialiased",
                  "text-align": "left",
                  color: "#000",
                  "font-family": "sans-serif",
                  "font-size": "13px",
                  border: "0",
                  cursor: "default",
                  padding: "0",
                  "border-spacing": "0",
                  "border-left": "1px solid #e5e5e5",
                  "border-bottom": "1px solid #e5e5e5",
                }}
              >
                <tbody>
                  <tr>
                    <th align="center" class="align-th" width="5px">
                      STT
                    </th>
                    <th align="left" class="align-th" width="80px">
                      Mã phiếu thu
                    </th>
                    <th align="center" class="align-th" width="80px">
                      Ngày thu
                    </th>
                    <th align="right" class="align-th" width="80px">
                      Khoản thu
                    </th>
                    {containingPatientName === "true" ? (
                      <th align="left" class="align-th">
                        Người nộp
                      </th>
                    ) : (
                      ""
                    )}
                    {containingPatientPhoneNumber === "true" ? (
                      <th align="left" class="align-th">
                        Số điện thoại
                      </th>
                    ) : (
                      ""
                    )}
                    {containingPatientEmail === "true" ? (
                      <th align="left" class="align-th">
                        Email
                      </th>
                    ) : (
                      ""
                    )}

                    {containingPatientAddress === "true" ? (
                      <th align="left" class="align-th">
                        Địa chỉ
                      </th>
                    ) : (
                      ""
                    )}

                    <th align="center" width="20px" class="align-th">
                      Số lượng
                    </th>
                    <th align="center" width="40px" class="align-th">
                      Đơn giá
                    </th>
                    <th align="center" width="80px" class="align-th">
                      Phí đã thu
                    </th>
                  </tr>
                  {reportInformation !== undefined
                    ? reportInformation.medicalServices.map((entry, index) => (
                        <tr>
                          <td align="center">{index + 1}</td>
                          <td align="center">{entry.receiptCode}</td>
                          <td align="center">{entry.createdAt}</td>

                          <td align="center">{entry.name}</td>
                          {containingPatientName === "true" ? (
                            <td align="center" width="80px">
                              {entry.patientInformation.fullName}
                            </td>
                          ) : (
                            ""
                          )}
                          {containingPatientPhoneNumber === "true" ? (
                            <td align="center" width="80px">
                              {entry.patientInformation.phoneNumber}
                            </td>
                          ) : (
                            ""
                          )}
                          {containingPatientEmail === "true" ? (
                            <td align="center" width="80px">
                              {entry.patientInformation.emailAddress}
                            </td>
                          ) : (
                            ""
                          )}
                          {containingPatientAddress === "true" ? (
                            <td align="center" width="80px">
                              {entry.patientInformation.addressCity}
                            </td>
                          ) : (
                            ""
                          )}

                          <td align="center">{entry.quantity}</td>
                          <td align="center">{entry.basePrice}</td>

                          <td align="center">{entry.totalDisplayed}</td>
                        </tr>
                      ))
                    : ""}
                </tbody>
              </table>
              <div class="clear"></div>
            </div>
            <div style={{ padding: "15px 0 5px" }}>
              <div
                style={{
                  float: "right",
                  border: "1px solid #e5e5e5",
                  "padding-left": "10px",
                  "margin-top": "10px",
                  padding: "3px 8px",
                }}
              >
                Tổng cộng:{" "}
                <span
                  style={{
                    "font-weight": "bold",
                    display: "inline-block",
                    width: "90px",
                    "text-align": "right",
                  }}
                >
                  {reportInformation.totalDisplayed} ĐỒNG
                </span>
              </div>
              <div style={{ clear: "both" }}>
                Tổng tiền bằng chữ:{" "}
                <span style={{ "text-transform": "capitalize" }}>
                  {reportInformation.totalInText}
                </span>
              </div>
              <div style={{ float: "right" }}>
                <span style={{ "text-transform": "capitalize" }}>
                  {" "}
                  Ngày 3 {date.day} tháng 3 {date.month} năm {date.year} 3333
                  {/* Ngày {date.day} Tháng {date.month} Năm {date.year} */}
                  {/* {receiptInformation.totalInText} */}
                </span>
              </div>
              <div class="clear"></div>
            </div>
            {/* <div
              style={{
                padding: "15px 30px 0 30px",
                "text-align": "center",
                "font-weight": "bold",
              }}
            >
              <div style={{ float: "left" }}></div>
              <div style={{ float: "right" }}>
                Ngày 3 tháng 3 năm 3333
                <br />
                <br />
                <br />
                <br />
              </div>
              <div class="clear"></div>
            </div> */}
            <div
              style={{
                padding: "15px 30px 0 30px",
                "text-align": "center",
                "font-weight": "bold",
              }}
            >
              <div style={{ float: "left" }}></div>
              <div style={{ float: "right" }}>
                Người lập
                <br />
                <br />
                <br />
                <br />
              </div>
              <div class="clear"></div>
            </div>
          </div>
        </div>
        <input
          type="hidden"
          id="hdf_url_edit"
          value="_a1_1-117_14-presc_2-1_3-1"
        />
        <ul class="mfb-component--br mfb-slidein" data-mfb-toggle="hover">
          <CTooltip content="In">
            <Icon.Printer
              size="40"
              onClick={() => {
                print();
              }}
            />
          </CTooltip>
        </ul>
      </body>
    </html>
  );
};

export default SingleReceiptReportPage;
