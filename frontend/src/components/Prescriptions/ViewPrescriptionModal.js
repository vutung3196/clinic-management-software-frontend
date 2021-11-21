import React, { useState, useEffect } from "react";
import {
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CInput as textarea,
  CInputGroup as CFormControl,
  CRow,
  CModal,
  CModalHeader,
  CModalBody,
  CModalTitle,
  CLabel as h4,
  CModalFooter,
  CAlert,
} from "@coreui/react";
import * as Icon from "react-bootstrap-icons";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { CInput } from "@coreui/react";

import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import FilesUpload from "../FilesUpload";
import { vi } from "date-fns/locale";
import authService from "src/services/authentication/auth.service";
import Button from "@mui/material/Button";

const ViewPrescriptionModal = ({
  patient,
  modal,
  onClose,
  prescription,
  doctorName,
}) => {
  const a = {
    index: 0,
    id: "",
    name: "",
    quantity: 0,
    description: "",
  };
  const initialArray = [a];
  const [revisitDate, handleRevisitDateChange] = useState(new Date());
  const [doctorSuggestion, setDoctorSuggestion] = useState("");
  const [diagnosedDescriptionModal, setDiagnosedDescriptionModal] =
    useState(false);
  const [diseaseNote, setDiseaseNote] = useState("");
  const handleCloseDiagnosedDescriptionModal = () =>
    setDiagnosedDescriptionModal(false);

  const [diagnosedDescription, setDiagnosedDescription] = useState("");
  const [numberMedicalServicesChildren, setNumberMedicalServicesChildren] =
    useState(1);

  const [date, setDate] = useState("");

  // Create lab order form model
  const [description, setDescription] = useState("");
  const [medicationList, setMedicationList] = useState([]);
  const [code, setCode] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [files, setFiles] = useState([]);

  useEffect(() => {
    if (prescription.createdAt !== undefined) {
      var arr = prescription.createdAt.split("/");
      setDay(arr[1]);
      setMonth(arr[0]);
      setYear(arr[2]);
    }
    handleRevisitDateChange(new Date());
    // get all files of current doctor visiting form id
  }, [patient.id, modal]);

  const cursorPointerStyle = {
    cursor: "pointer",
  };

  const closeModal = () => {
    setDescription("");
    setMedicationList(initialArray);
    setNumberMedicalServicesChildren(0);
    onClose(false);
  };

  return (
    <CModal show={modal} onClose={closeModal} size="xl">
      <CModalHeader closeButton>
        <CModalTitle>KÊ ĐƠN</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <div>
          <div className="c-body">
            <CContainer>
              <CRow className="justify-content-center">
                <CCol md="9" lg="7" xl="6">
                  <CCard className="mx-1" id="ioc66_sec2">
                    <CCardBody className="p-4">
                      <CForm>
                        <div>
                          <h3 className="ioc66h">Đơn thuốc</h3>
                        </div>
                        <CRow>
                          <CCol>
                            <p
                              className="text"
                              style={{
                                "text-align": "center",
                              }}
                            >
                              Mã đơn thuốc: <b>{prescription.code}</b>
                            </p>
                          </CCol>
                        </CRow>
                        <CRow>
                          <CCol>
                            <p className="text">
                              Họ tên: <b>{patient.fullName}</b>
                            </p>
                          </CCol>
                          <CCol>
                            <p className="text">
                              Ngày tháng năm sinh:{" "}
                              <b>{patient.dateOfBirthDetail}</b>
                            </p>
                          </CCol>
                        </CRow>
                        <CRow>
                          <CCol>
                            <p className="text">
                              Điện thoại: <b>{patient.phoneNumber}</b>
                            </p>
                          </CCol>
                          <CCol>
                            <p className="text">
                              Giới tính: <b>{patient.gender}</b>
                            </p>
                          </CCol>
                        </CRow>
                        <CRow>
                          <CCol>
                            <p className="text">
                              Địa chỉ (tỉnh): <b>{patient.addressCity}</b>
                            </p>
                          </CCol>
                        </CRow>
                        <CRow>
                          <CCol>
                            <p className="text">
                              Mã số thẻ BHYT (nếu có):{" "}
                              <b>{patient.medicalInsuranceCode}</b>
                            </p>
                          </CCol>
                        </CRow>
                        {patient.age <= 6 ? (
                          <>
                            <CRow>
                              <CFormControl className="mb-3">
                                <h8 className="text ahihi td-ioc66">
                                  Cân nặng (cho trẻ dưới 72 tháng tuổi, đơn vị
                                  kg):{" "}
                                </h8>
                                <input
                                  type="text"
                                  placeholder=""
                                  id="ioc66_d_reason"
                                  value={prescription.weight}
                                  // onChange={(e) => setWeight(e.target.value)}
                                  class="ioc_textbox txt-dot fullwidth td-ioc66"
                                ></input>
                              </CFormControl>
                            </CRow>
                            <CRow>
                              <CFormControl className="mb-3">
                                <h8 className="text ahihi td-ioc66">
                                  Tên người đưa trẻ đến khám (cho trẻ dưới 72
                                  tháng tuổi):{" "}
                                </h8>
                                <input
                                  type="text"
                                  placeholder=""
                                  id="ioc66_d_reason"
                                  value={prescription.supervisorName}
                                  // onChange={(e) =>
                                  //   setSupervisorName(e.target.value)
                                  // }
                                  class="ioc_textbox txt-dot fullwidth td-ioc66"
                                ></input>
                              </CFormControl>
                            </CRow>
                          </>
                        ) : (
                          ""
                        )}
                        <CRow>
                          <CFormControl className="mb-3">
                            {/* <CCol> */}
                            <h8 className="text ahihi td-ioc66">Chẩn đoán:</h8>
                            {/* </CCol> */}
                            {/* <CCol> */}
                            <input
                              type="text"
                              placeholder=""
                              id="ioc66_d_reason"
                              value={prescription.diagnosedDescription}
                              // onChange={(e) =>
                              //   setDiagnosedDescription(e.target.value)
                              // }
                              class="ioc_textbox txt-dot fullwidth td-ioc66"
                            ></input>
                          </CFormControl>
                        </CRow>
                        <CRow>
                          <CFormControl className="mb-3">
                            {/* <CCol> */}
                            <h8 className="text ahihi td-ioc66">
                              Ghi chú bệnh:
                            </h8>
                            {/* </CCol> */}
                            {/* <CCol> */}
                            <input
                              type="text"
                              placeholder=""
                              id="ioc66_d_reason"
                              value={prescription.diseaseNote}
                              class="ioc_textbox txt-dot fullwidth td-ioc66"
                            ></input>
                          </CFormControl>
                        </CRow>
                        <CRow>
                          {/* <CCol> */}
                          <CFormControl className="mb-3">
                            <h8 className="text ahihi td-ioc66">
                              Thuốc điều trị:
                            </h8>
                          </CFormControl>
                        </CRow>
                        <CRow>
                          <div id="ioc66_list">
                            <ul id="ioc66_list_c" class="poproduct_option_none">
                              {prescription.medicationInformation !== undefined
                                ? prescription.medicationInformation.map(
                                    (entry, index) => (
                                      <div class="ioc66i">
                                        {
                                          <li v="48">
                                            <div class="l">0{index + 1}.</div>
                                            <div class="c">
                                              <div class="cl">
                                                <input
                                                  type="text"
                                                  name="ioc66_d_name"
                                                  placeholder="Thuốc"
                                                  value={entry.name}
                                                  class="ioc_textbox txt-dot ioc66name readonly"
                                                />
                                              </div>
                                              <div class="cr">
                                                <span>Số lượng: </span>
                                                <CInput
                                                  type="number"
                                                  name="ioc66_d_num"
                                                  value={entry.quantity}
                                                  data-d="3"
                                                  class="ioc_textbox txt-dot ioc66num"
                                                />
                                                <span></span>
                                              </div>
                                              <div class="clear"></div>
                                              <div class="cb">
                                                <span>Cách dùng: </span>
                                                <input
                                                  type="text"
                                                  name="ioc66_d_use"
                                                  value={entry.usage}
                                                  class="ioc_textbox txt-dot ioc66use"
                                                />
                                              </div>
                                            </div>
                                            <div class="clear"></div>
                                          </li>
                                        }
                                      </div>
                                    )
                                  )
                                : ""}
                            </ul>
                          </div>
                        </CRow>
                        <CRow>
                          <CCol>
                            <div>
                              <CFormControl className="mb-3">
                                {/* <h8 className="text">Ngày tái khám: </h8> */}
                                <LocalizationProvider
                                  locale={vi}
                                  dateAdapter={AdapterDateFns}
                                >
                                  <Stack spacing={1}>
                                    <DesktopDatePicker
                                      label="Ngày tái khám"
                                      value={prescription.revisitDate}
                                      minDate={new Date("1900-01-01")}
                                      // onChange={(newValue) => {
                                      //   handleRevisitDateChange(newValue);
                                      // }}
                                      variant="standard"
                                      renderInput={(params) => (
                                        <TextField {...params} />
                                      )}
                                    />
                                  </Stack>
                                </LocalizationProvider>
                              </CFormControl>
                            </div>
                          </CCol>
                        </CRow>
                        <CRow>
                          <CCol>
                            <div>
                              <h8 className="text">Lời dặn:</h8>
                            </div>
                            <div>
                              <textarea
                                id="ioc66_d_loidan"
                                class="suggestion-style ioc_textbox ioc66loidan ui-autocomplete-input"
                                rows="4"
                                value={prescription.doctorSuggestion}
                                autocomplete="off"
                              ></textarea>
                            </div>
                          </CCol>
                          <CCol>
                            <div class="ioc66_foot">
                              <div class="r">
                                <div class="d">
                                  Ngày {day} Tháng {month} Năm {year}
                                </div>
                                <div class="p">Người lập</div>
                                <div class="b">{doctorName}</div>
                                {/* <div class="clear"></div> */}
                              </div>
                            </div>
                          </CCol>
                        </CRow>
                      </CForm>
                    </CCardBody>
                  </CCard>
                </CCol>
              </CRow>
            </CContainer>
          </div>
        </div>
      </CModalBody>
      <CModalFooter>
        <Button
          color="primary"
          variant="contained"
          shape="square"
          size="sm"
          sx={{ mt: 3, ml: 1 }}
          onClick={() => {
            closeModal();
          }}
        >
          THOÁT
        </Button>
      </CModalFooter>
    </CModal>
  );
};

export default ViewPrescriptionModal;
