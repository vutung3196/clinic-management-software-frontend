import prescriptionService from "../../../services/prescription/prescription.service";
import patientService from "../../../services/patient/patient.service";
import { useState, useEffect } from "react";
import jsPDF from "jspdf";
import * as Icon from "react-bootstrap-icons";
import { CTooltip } from "@coreui/react";
import clinicService from "src/services/clinicservice/clinic.service";
import authService from "src/services/authentication/auth.service";

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
  const retrieveClinicInformation = () => {
    var currentUser = authService.getCurrentUser();
    console.log("=====");
    console.log(currentUser);
    clinicService
      .getClinicInformation(currentUser.clinicId)
      .then((response) => {
        var clinic = response.data;
        setClinicName(clinic.name);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const a = { day: 1, month: 1, year: 1 };
  const [prescription, setPrescription] = useState("");
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
        setPrescription(response.data);
      },
      (error) => {
        console.log(error.response);
      }
    );

    retrieveClinicInformation();
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

  const testPrint = () => {
    var pdf = new jsPDF("p", "pt", "letter");
    var source = window.document.getElementsByTagName("body")[0];
    pdf.html(source, function () {
      pdf.save("Test.pdf");
    });
    console.log(121323);
    pdf.save("Test.pdf");
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
    <html>
      <head></head>
      <body data-new-gr-c-s-check-loaded="14.1019.0" data-gr-ext-installed="">
        <div id="StayFocusd-infobar" style={style1}>
          <span id="StayFocusd-infobar-msg"></span>
          <span id="StayFocusd-infobar-links"></span>
        </div>
        <div class="view-c0-single">
          <div class="view-c1-single">
            <div class="dochead2">
              <div style={style10}>
                <p>Địa chỉ: 123 Đường số 5, Q6, Tp. HCM</p>
                <p>Điện thoại: 1900 11111</p>
              </div>
            </div>
            <div>
              <div
                class="prescription-style"
                onClick={() => {
                  testPrint();
                }}
              >
                Đơn thuốc
              </div>
              <div style={style2}>
                Mã số: {prescription.patientPrescriptionCode}
              </div>
            </div>
            <div style={style3}>
              <table class="tab_table" style={style4}>
                <tbody>
                  <tr>
                    <td style={style5}>Họ tên</td>
                    <td class="s">:</td>
                    <td>
                      <strong>{patient.fullName}</strong>
                    </td>
                    <td style={style5}>Năm sinh</td>
                    <td class="s">:</td>
                    <td>{patient.yearOfBirth}</td>
                  </tr>
                  <tr>
                    <td>Điện thoại</td>
                    <td class="s">:</td>
                    <td>{patient.phoneNumber}</td>
                    <td>Giới tính</td>
                    <td class="s">:</td>
                    <td>{patient.gender}</td>
                  </tr>
                  <tr>
                    <td valign="top">Lý do khám</td>
                    <td class="s" valign="top">
                      :
                    </td>
                    <td colspan="4" valign="top">
                      {prescription.visitReason}
                    </td>
                  </tr>
                  <tr>
                    <td valign="top">Chẩn đoán</td>
                    <td class="s" valign="top">
                      :
                    </td>
                    <td colspan="4" valign="top">
                      {prescription.diagnosedDescription}
                    </td>
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
                            Số lượng: <strong>{entry.number}</strong> viên
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
                  <strong>Ngày tái khám</strong>: {prescription.revisitDate}
                </div>
              </div>
              <div class="r" style={style8}>
                <div class="d">
                  Ngày {date.day} Tháng {date.month} Năm {date.year}
                </div>
                <div class="p">Bác sĩ</div>
                <div class="b" style={style12}>
                  Hà Phạm Clinic
                </div>
              </div>
              <div class="clear"></div>
            </div>
            <div class="clear"></div>
            <div style={style13}>
              <div style={style9}>
                Theo dõi tác dụng thuốc/ hẹn tái khám.
                <br />
                Gọi BÁC SĨ 1900 11111
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
