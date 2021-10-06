import { useState, useEffect } from "react";
import billService from "src/services/bill/bill.service";
import * as Icon from "react-bootstrap-icons";
import { CTooltip } from "@coreui/react";

const SingleReceiptPage = (props) => {
  const init = {
    id: 1,
    patientInformation: {
      clinicId: 1,
      fullName: "Tung dasVu",
      emailAddress: "tungvu3196@gmail.com",
      phoneNumber: "312313123131",
      occupation: "SWE",
      gender: "Male",
      isDeleted: 0,
      patientCode: null,
      createdAt: "06/23/2021",
      updatedAt: "06/23/2021",
      deletedAt: null,
      addressCity: "Hanoi3",
      detailedAddress: "Hanoi2333dasdadadad",
      yearOfBirth: 1996,
      age: 25,
      id: 46,
    },
    patientShortInformation: "",
    billCode: "HĐ20217221644",
    total: 100000,
    description: "mua thuốc",
    createdAt: "07/18/2021",
    clinicServiceBills: [],
  };
  const [billInformation, setBillInformation] = useState(init);

  useEffect(() => {
    billService.getById(props.match.params.id).then(
      (response) => {
        setBillInformation(response.data);
      },
      (error) => {
        console.log(error.response);
      }
    );
  }, []);

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
      <title>Hóa đơn [11732]</title>
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
              "border-top": "1px solid #ddd",
              "border-left": "1px solid #ddd",
            }}
          >
            <div class="dochead2">
              <div style={{ "line-height": "0.3" }}>
                <p>Địa chỉ: 123 Đường số 5, Q6, Tp. HCM</p>
                <p>Điện thoại: 1900 11111</p>
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
                Hóa đơn
              </div>
              <div>Mã số: {billInformation.billCode} </div>
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
                        {billInformation.patientInformation.fullName}
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
                      {billInformation.patientInformation.age}
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
                      {billInformation.patientInformation.phoneNumber}
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
                      {billInformation.patientInformation.gender === "Male"
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
                      {billInformation.patientInformation.detailedAddress}
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
                      Ghi chú
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
                      {billInformation.description}
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
                    <th align="center" width="20px">
                      #
                    </th>
                    <th align="left">Sản phẩm</th>
                    <th align="center" width="120px">
                      Đơn vị tính
                    </th>
                    <th align="center" width="80px">
                      Số lượng
                    </th>
                    <th align="right" width="80px">
                      Đơn giá
                    </th>
                    <th align="right" width="80px">
                      Số tiền
                    </th>
                  </tr>
                  {billInformation.clinicServiceBills !== undefined
                    ? billInformation.clinicServiceBills
                        .filter(isMedication)
                        .map((entry, index) => (
                          <tr>
                            <td align="center">{index + 1}</td>
                            <td align="left">{entry.name}</td>
                            <td align="center">Viên</td>
                            <td align="center">{entry.number}</td>
                            <td align="right">{entry.price}</td>
                            <td align="right">{entry.totalPrice}</td>
                          </tr>
                        ))
                    : ""}
                </tbody>
              </table>
              <div class="clear"></div>
            </div>
            <div style={{ padding: "15px 0 5px", overflow: "auto" }}>
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
                    <th align="center" width="20px">
                      #
                    </th>
                    <th align="left">Dịch vụ</th>
                    <th align="center" width="120px">
                      Đơn vị tính
                    </th>
                    <th align="center" width="80px">
                      Số lượng
                    </th>
                    <th align="right" width="80px">
                      Đơn giá
                    </th>
                    <th align="right" width="80px">
                      Tổng cộng
                    </th>
                  </tr>
                  {billInformation.clinicServiceBills !== undefined
                    ? billInformation.clinicServiceBills
                        .filter(isService)
                        .map((entry, index) => (
                          <tr>
                            <td align="center">{index + 1}</td>
                            <td align="left">{entry.name}</td>
                            <td align="center">Viên</td>
                            <td align="center">{entry.number}</td>
                            <td align="right">{entry.price}</td>
                            <td align="right">{entry.totalPrice}</td>
                          </tr>
                        ))
                    : ""}
                </tbody>
              </table>
              <div class="clear"></div>
            </div>
            <div style={{ padding: "15px 0 5px" }}>
              <div style={{ "text-align": "right", "padding-right": "9px" }}>
                Tổng hóa đơn thuốc:{" "}
                <span
                  style={{
                    "font-weight": "bold",
                    display: "inline-block",
                    width: "80px",
                  }}
                >
                  {billInformation.totalMedicationAmount}
                </span>
              </div>
              <div style={{ "text-align": "right", "padding-right": "9px" }}>
                Tổng hóa đơn dịch vụ:{" "}
                <span
                  style={{
                    "font-weight": "bold",
                    display: "inline-block",
                    width: "80px",
                  }}
                >
                  {billInformation.totalClinicServiceAmount}
                </span>
              </div>
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
                  {billInformation.total} ĐỒNG
                </span>
              </div>
              <div style={{ clear: "both" }}>
                Tổng tiền bằng chữ:{" "}
                <span style={{ "text-transform": "capitalize" }}>
                  {" "}
                  {billInformation.totalInText}
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
              <div style={{ float: "left" }}>Khách hàng</div>
              <div style={{ float: "right" }}>
                Thu ngân
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

export default SingleReceiptPage;
