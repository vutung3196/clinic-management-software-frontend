import { useState, useEffect } from "react";
import receiptService from "src/services/receipt/receipt.service";
import laborderformService from "src/services/laborderform/laborderform.service";
import * as Icon from "react-bootstrap-icons";
import { CTooltip } from "@coreui/react";
import { Helmet } from "react-helmet";

const SingleLabOrderFormPage = (props) => {
  const init = {
    id: 0,
    createdAt: "10/11/2021",
    code: "CĐ7591",
    description: "nothing",
    doctorVisitingFormCode: "PK7148",
    doctorVisitingFormId: 0,
    labTests: [
      {
        id: 2,
        createdAt: null,
        name: "MRI đầu gối",
        description: "đầu gối trái",
        result: null,
        status: null,
        imageFiles: null,
      },
      {
        id: 3,
        createdAt: null,
        name: "MRI khớp háng",
        description: "khớp háng trái",
        result: null,
        status: null,
        imageFiles: null,
      },
    ],
    patientInformation: {
      id: 7,
      clinicId: 1,
      fullName: "Vũ Tùng",
      emailAddress: "sadada@gmail.com",
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
    clinicInformation: {
      id: 0,
      name: "Ha pham",
      emailAddress: null,
      phoneNumber: "+84912068946",
      address: "Hà Nội",
      description: null,
    },
  };
  const [labOrderInformation, setLabOrderInformation] = useState(init);
  const [date, setDate] = useState("");

  useEffect(() => {
    laborderformService.getById(props.match.params.id).then(
      (response) => {
        setLabOrderInformation(response.data);
        console.log(response.data);
        var arr = response.data.createdAt.split("/");
        var date = {
          day: arr[1],
          month: arr[0],
          year: arr[2],
        };
        setDate(date);
      },
      (error) => {
        console.log(error.response);
      }
    );
  }, [props.match.params.id]);

  const print = () => {
    window.print();
  };

  return (
    <html lang="vi" class="js-focus-visible" data-js-focus-visible="">
      <Helmet>
        <title>Phiếu chỉ định</title>
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
                  {labOrderInformation.clinicInformation.name}
                </p>
                <p>Địa chỉ: {labOrderInformation.clinicInformation.address}</p>
                <p>
                  Điện thoại:{" "}
                  {labOrderInformation.clinicInformation.phoneNumber}
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
                Phiếu chỉ định
              </div>
              <div>Mã số: {labOrderInformation.code} </div>
            </div>
            <div style={{ padding: "15px 0 5px", overflow: "auto" }}>
              <div style={{ "font-weight": "bold" }}>Thông tin bệnh nhân</div>
              <table class="tab_table" style={{ width: "100%", padding: 0 }}>
                <tbody>
                  <tr>
                    <td
                      style={{
                        width: "80px",
                        "vertical-align": "top",
                        padding: "3px",
                      }}
                    >
                      Họ tên
                    </td>
                    <td
                      class="s"
                      style={{
                        width: "10px",
                        "text-align": "center",
                        "padding-left": 0,
                        "padding-right": 0,
                      }}
                    >
                      :
                    </td>
                    <td>
                      <strong>
                        {labOrderInformation.patientInformation.fullName}
                      </strong>
                    </td>
                    <td
                      style={{
                        width: "80px",
                        "vertical-align": "top",
                        padding: "3px",
                      }}
                    >
                      Tuổi
                    </td>
                    <td
                      class="s"
                      style={{
                        width: "10px",
                        "text-align": "center",
                        "padding-left": 0,
                        "padding-right": 0,
                      }}
                    >
                      :
                    </td>
                    <td
                      style={{
                        width: "80px",
                        "vertical-align": "top",
                        padding: "3px",
                      }}
                    >
                      {labOrderInformation.patientInformation.age}
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        "vertical-align": "top",
                        padding: "3px",
                      }}
                    >
                      Điện thoại
                    </td>
                    <td
                      class="s"
                      style={{
                        width: "10px",
                        "text-align": "center",
                        "padding-left": 0,
                        "padding-right": 0,
                      }}
                    >
                      :
                    </td>
                    <td
                      style={{
                        "vertical-align": "top",
                        padding: "3px",
                      }}
                    >
                      {labOrderInformation.patientInformation.phoneNumber}
                    </td>
                    <td
                      style={{
                        "vertical-align": "top",
                        padding: "3px",
                      }}
                    >
                      Giới tính
                    </td>
                    <td
                      class="s"
                      style={{
                        width: "10px",
                        "text-align": "center",
                        "padding-left": 0,
                        "padding-right": 0,
                      }}
                    >
                      :
                    </td>
                    <td
                      style={{
                        "vertical-align": "top",
                        padding: "3px",
                      }}
                    >
                      {labOrderInformation.patientInformation.gender === "Male"
                        ? "Nam"
                        : "Nữ"}
                    </td>
                  </tr>
                  <tr>
                    <td
                      valign="top"
                      style={{
                        "vertical-align": "top",
                        padding: "3px",
                      }}
                    >
                      Địa chỉ
                    </td>
                    <td
                      class="s"
                      valign="top"
                      style={{
                        width: "10px",
                        "text-align": "center",
                        "padding-left": 0,
                        "padding-right": 0,
                      }}
                    >
                      :
                    </td>
                    <td
                      colspan="4"
                      valign="top"
                      style={{
                        "vertical-align": "top",
                        padding: "3px",
                      }}
                    >
                      {labOrderInformation.patientInformation.addressCity}
                    </td>
                  </tr>
                  <tr>
                    <td
                      valign="top"
                      style={{
                        "vertical-align": "top",
                        padding: "3px",
                      }}
                    >
                      Mã số thẻ BHYT (nếu có)
                    </td>
                    <td
                      class="s"
                      valign="top"
                      style={{
                        width: "10px",
                        "text-align": "center",
                        "padding-left": 0,
                        "padding-right": 0,
                      }}
                    >
                      :
                    </td>
                    <td
                      colspan="4"
                      valign="top"
                      style={{
                        "vertical-align": "top",
                        padding: "3px",
                      }}
                    >
                      {
                        labOrderInformation.patientInformation
                          .medicalInsuranceCode
                      }
                    </td>
                  </tr>
                  <tr>
                    <td
                      valign="top"
                      style={{
                        "vertical-align": "top",
                        padding: "3px",
                      }}
                    >
                      Mô tả
                    </td>
                    <td
                      class="s"
                      valign="top"
                      style={{
                        width: "10px",
                        "text-align": "center",
                        "padding-left": 0,
                        "padding-right": 0,
                      }}
                    >
                      :
                    </td>
                    <td
                      colspan="4"
                      valign="top"
                      style={{
                        "vertical-align": "top",
                        padding: "3px",
                      }}
                    >
                      {labOrderInformation.description}
                    </td>
                  </tr>
                </tbody>
              </table>
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
                    <th align="center" width="5px">
                      #
                    </th>
                    <th align="left" width="60px">
                      Chỉ định
                    </th>
                    <th align="center" width="100px">
                      Mô tả
                    </th>
                  </tr>
                  {labOrderInformation.labTests !== undefined
                    ? labOrderInformation.labTests.map((entry, index) => (
                        <tr>
                          <td align="left">{index + 1}</td>
                          <td align="left">{entry.name}</td>
                          <td align="left">{entry.description}</td>
                        </tr>
                      ))
                    : ""}
                </tbody>
              </table>
              <div class="clear"></div>
            </div>
            <div style={{ padding: "15px 0 5px" }}>
              {/* <div
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
                  {labOrderInformation.totalDisplayed} ĐỒNG
                </span>
              </div>
              <div style={{ clear: "both" }}>
                Tổng tiền bằng chữ:{" "}
                <span style={{ "text-transform": "capitalize" }}>
                  {" "}
                  {labOrderInformation.totalInText}
                </span>
              </div> */}{" "}
              <div style={{ float: "right" }}>
                <span style={{ "text-transform": "capitalize" }}>
                  {" "}
                  Ngày {date.day} tháng {date.month} năm {date.year}
                  {/* Ngày {date.day} Tháng {date.month} Năm {date.year} */}
                  {/* {receiptInformation.totalInText} */}
                </span>
              </div>
              <div class="clear"></div>
            </div>
            <div
              style={{
                padding: "15px 30px 0 30px",
                "text-align": "center",
                "font-weight": "bold",
              }}
            >
              {/* <div style={{ float: "left" }}>Bệnh nhân</div> */}
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

export default SingleLabOrderFormPage;
