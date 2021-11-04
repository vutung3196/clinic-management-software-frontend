import { useState, useEffect } from "react";
import patientdoctorvisitingformService from "src/services/patientdoctorvisitingform/patientdoctorvisitingform.service";
import * as Icon from "react-bootstrap-icons";
import { CTooltip } from "@coreui/react";
import { Helmet } from "react-helmet";

const SingleDoctorVisitingFormPage = (props) => {
  const init = {
    id: 0,
    code: "PK7489",
    description: "Xam xam",
    visitingStatus: 1,
    visitingStatusDisplayed: "Đang chờ khám",
    patientInformation: {
      id: 1,
      clinicId: 1,
      fullName: "John Doe 1",
      emailAddress: "tungvu3196@gmail.com",
      phoneNumber: "84912068946",
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
    doctorName: "Doctor 1",
    doctorId: 6,
    clinicInformation: {
      id: 0,
      name: "Ha pham",
      emailAddress: null,
      phoneNumber: "+84912068946",
      address: "Hà Nội",
      description: null,
    },
  };
  const [visitingForm, setVisitingForm] = useState(init);
  const [date, setDate] = useState("");

  useEffect(() => {
    patientdoctorvisitingformService.getById(props.match.params.id).then(
      (response) => {
        setVisitingForm(response.data);
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
      <Helmet>
        <title>Phiếu khám</title>
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
              // "border-left": "1px solid #ddd",
            }}
          >
            <div class="dochead2">
              <div style={{ "line-height": "0.3" }}>
                <p>
                  Tên đơn vị: Phòng khám {visitingForm.clinicInformation.name}
                </p>
                <p>
                  Địa chỉ:{" "}
                  {visitingForm.clinicInformation.addressDetailInformation}
                </p>
                <p>Điện thoại: {visitingForm.clinicInformation.phoneNumber}</p>
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
                Phiếu khám
              </div>
              <div>Mã số: {visitingForm.code} </div>
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
                        {visitingForm.patientInformation.fullName}
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
                      {visitingForm.patientInformation.age}
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
                      {visitingForm.patientInformation.phoneNumber}
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
                      {visitingForm.patientInformation.gender}
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        "vertical-align": "top",
                        padding: "3px",
                      }}
                    >
                      Địa chỉ
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
                      {visitingForm.patientInformation.addressCity}
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
                      {visitingForm.patientInformation.medicalInsuranceCode}
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
                      Lý do khám
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
                      {visitingForm.description}
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
                      Bác sĩ khám
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
                      {visitingForm.doctorName}
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
                      Trạng thái
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
                      {visitingForm.visitingStatusDisplayed}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div style={{ padding: "15px 0 15px", overflow: "auto" }}>
              <div style={{ float: "right" }}>
                <span style={{ "text-transform": "capitalize" }}>
                  {" "}
                  Ngày {date.day} tháng {date.month} năm {date.year}
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

export default SingleDoctorVisitingFormPage;
