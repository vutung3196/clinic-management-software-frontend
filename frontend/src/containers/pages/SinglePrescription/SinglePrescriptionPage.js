import prescriptionService from "../../../services/prescription/prescription.service";
import patientService from "../../../services/patient/patient.service";
import { useState, useEffect } from "react";
import * as Icon from "react-bootstrap-icons";
import { CTooltip } from "@coreui/react";
import clinicService from "src/services/clinicservice/clinic.service";
import authService from "src/services/authentication/auth.service";
import { Helmet } from "react-helmet";

const style1 = {
  display: "none",
};

const style2 = {
  "text-align": "center",
};

const style3 = {
  padding: "5px 0 5px",
  overflow: "auto",
};

const style4 = {
  width: "100%",
};

const style5 = {
  width: "80px",
};

const style6 = {
  float: "left",
};

const style20 = {
  width: "100%",
};

const style7 = {
  width: "65%",
};

const style8 = {
  width: "35%",
};

const style9 = {
  "text-align": "left",
};

const style10 = {
  "line-height": "0.3",
};

const style11 = {
  float: "right",
  width: "30%",
};

const style12 = {
  "white-space": "nowrap",
};

const style13 = {
  "border-top": "1px solid #ccc",
};

const style14 = {
  width: "900px",
};

const SinglePrescriptionPage = (props) => {
  const prescriptionConst = {
    id: 5,
    doctorVisitingFormCode: null,
    doctorVisitingFormId: 0,
    visitReason: null,
    code: "",
    diagnosedDescription: "Bệnh Rubella",
    revisitDate: "10/14/2021",
    doctorSuggestion: "Ngày ngủ đủ 8 tiếng nhé",
    patientPrescriptionCode: null,
    createdAt: "10/14/2021",
    doctorName: null,
    doctorId: 6,
    diseaseNote: "aaads",
    medicationInformation: [
      {
        id: 0,
        name: "Thuốc 1",
        quantity: 1,
        usage: "ngày 3 viên sau ăn",
      },
    ],
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
    clinicInformation: {
      id: 0,
      name: "Ha pham",
      emailAddress: null,
      phoneNumber: "+84912068946",
      address: "Hà Nội",
      description: null,
    },
  };

  const a = { day: 1, month: 1, year: 1 };
  const [prescription, setPrescription] = useState(prescriptionConst);
  const [patient, setPatient] = useState("");
  const [date, setDate] = useState("");
  const [clinicName, setClinicName] = useState("");

  useEffect(() => {
    prescriptionService.getPrescription(props.match.params.id).then(
      (response) => {
        var arr = response.data.createdAt.split("/");
        var date = {
          day: arr[1],
          month: arr[0],
          year: arr[2],
        };
        setDate(date);
        console.log(response.data);
        setPrescription(response.data);
      },
      (error) => {
        console.log(error.response);
      }
    );

    patientService.getPatient(props.match.params.patientId).then(
      (response) => {
        if (response.data.gender === "Male") {
          response.data.gender = "Nam";
        } else {
          response.data.gender = "Nữ";
        }
        setPatient(response.data);
      },
      (error) => {
        console.log("=========");
        // console.log(error.response);
        // const resMessage = error.response.data;
      }
    );
  }, []);

  const style30 = {
    "padding-bottom": "5px",
  };

  const style31 = {
    "text-align": "center",
    "font-size": "16px",
    "font-weight": "bold",
  };

  const style32 = {
    "text-align": "center",
  };

  const style33 = {
    width: "100%",
  };

  const style34 = {
    float: "left",
  };

  const style35 = {
    float: "right",
    width: "30%",
  };

  const style36 = {
    width: "65%",
  };

  const style37 = {
    width: "35%",
  };

  const style38 = {
    "font-size": "90%",
  };

  const style39 = {
    "white-space": "nowrap",
  };

  const style40 = {
    "border-top": "1px solid #ccc",
  };

  const print = () => {
    window.print();
  };

  return (
    <html lang="vi" class="js-focus-visible" data-js-focus-visible="">
      <Helmet>
        <title>Đơn thuốc</title>
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
                  Tên đơn vị: Phòng khám {prescription.clinicInformation.name}
                </p>
                {/* <p>
                  Địa chỉ:{" "}
                  {prescription.clinicInformation.addressDetailInformation}
                </p> */}
                <p>Điện thoại: {prescription.clinicInformation.phoneNumber}</p>
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
                Đơn thuốc
              </div>
              <div>Mã đơn thuốc: {prescription.code} </div>
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
                        {prescription.patientInformation.fullName}
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
                    {prescription.patientInformation.age <= 6 ? (
                      // <>
                      <td
                        style={{
                          width: "80px",
                          "vertical-align": "top",
                          padding: "3px",
                        }}
                      >
                        {prescription.patientInformation.month} tháng
                      </td>
                    ) : (
                      <td
                        style={{
                          width: "80px",
                          "vertical-align": "top",
                          padding: "3px",
                        }}
                      >
                        {prescription.patientInformation.age}
                      </td>
                    )}
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
                      {prescription.patientInformation.addressCity}
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
                      {prescription.patientInformation.gender}
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        "vertical-align": "top",
                        padding: "3px",
                      }}
                    >
                      Cân nặng
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
                    {prescription.patientInformation.age <= 6 ? (
                      <td
                        style={{
                          "vertical-align": "top",
                          padding: "3px",
                        }}
                      >
                        {prescription.weight} kg
                      </td>
                    ) : (
                      <td
                        style={{
                          "vertical-align": "top",
                          padding: "3px",
                        }}
                      ></td>
                    )}
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
                      {prescription.patientInformation.medicalInsuranceCode}
                    </td>
                  </tr>
                  <tr>
                    <td valign="top">Chẩn đoán</td>
                    <td class="s" valign="top">
                      :
                    </td>
                    <td colspan="4" valign="top">
                      {prescription.diagnosedDescription} :{" "}
                      {prescription.diseaseNote}
                    </td>
                  </tr>
                  <tr>
                    <td valign="top">Thuốc điều trị:</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="presc-ck"></div>
            <table class="tab_table print_drugtable border-td2" style={style4}>
              <colgroup>
                <col width="30px" />
                <col />
                <col width="200px" />
              </colgroup>
              <tbody>
                {prescription.medicationInformation !== undefined
                  ? prescription.medicationInformation.map((entry, index) => (
                      <tr>
                        <td align="center" valign="top">
                          {index + 1}.
                        </td>
                        <td align="left" valign="top">
                          <div style={style6}>
                            <strong>{entry.name}</strong>
                            <div>{entry.usage}</div>
                          </div>
                          <div style={style11}>
                            Số lượng: <strong>{entry.quantity}</strong> viên
                          </div>
                          <div class="clear"></div>
                        </td>
                      </tr>
                    ))
                  : ""}
              </tbody>
            </table>
            <div class="ioc66_foot" style={style20}>
              <div class="l" style={style7}>
                <div>
                  <strong>Lời dặn:</strong>
                  <div style={style30}>- {prescription.doctorSuggestion}</div>
                </div>
                <div>
                  <strong>Ngày tái khám</strong>:{" "}
                  {prescription.revisitDateDisplayed}
                </div>
              </div>
              <div class="r" style={style8}>
                <div class="d">
                  Ngày {date.day} Tháng {date.month} Năm {date.year}
                </div>
                <div class="p">Bác sĩ</div>
                <div class="b" style={style12}>
                  {prescription.doctorName}
                </div>
              </div>
              <div class="clear"></div>
            </div>
            <div class="clear"></div>
            <div style={style13}>
              <div style={style9}>
                Theo dõi tác dụng thuốc/ hẹn tái khám.
                <br />
                Gọi BÁC SĨ {prescription.clinicInformation.phoneNumber}
                <br />
                Khám lại xin mang theo đơn này
                <br />
                Tên bố hoặc mẹ của trẻ hoặc người đưa trẻ đến khám bệnh, chữa
                bệnh:
                <br />
                {prescription.supervisorName}
              </div>
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
export default SinglePrescriptionPage;
