import React, { useState, useEffect } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CContainer,
  CForm,
  CInput as textarea,
  CInputGroup as CFormControl,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  CCardHeader,
  CModal,
  CModalHeader,
  CModalBody,
  CModalTitle,
  CLabel as h4,
  CModalFooter,
  CAlert,
} from "@coreui/react";
import * as Icon from "react-bootstrap-icons";
import authService from "../../services/authentication/auth.service";

import "react-datepicker/dist/react-datepicker.css";

import DatePicker from "react-datepicker";
import MedicationElementComponent from "./MedicationElementComponent";
// import PrescriptionService from "../../services/prescription/prescription.service";
// import MedicationSelection from "../MedicationSelection";
// import PrescriptionHistory from "../PrescriptionHistory";
// import FilesUpload from "../FilesUpload";
// import DiseaseStage from "./DiseaseStage";
// import clinicService from "src/services/clinicservice/clinic.service";

const CreateLabOrderFormModal = ({
  patientId,
  patient,
  modal,
  onClose,
  prescriptionsHistory,
  setPrescriptionHistory,
  files,
  setFiles,
  diseaseStages,
  setDiseaseStages,
  prescription,
  containEdit,
  prescriptions,
  setPrescriptions,
}) => {
  const a = {
    index: 0,
    medicationId: "",
    name: "",
    number: "",
    usage: "",
  };
  const initialArray = [a];
  const [numberMedicationChildren, setNumberMedicationChildren] = useState(1);

  const [date, setDate] = useState("");

  // Create prescription model
  const [visitReason, setVisitReason] = useState("");
  const [diagnosedDescription, setDiagnosedDescription] = useState("");
  const [revisitDate, setRevisitDate] = useState(new Date());
  const [doctorSuggestion, setDoctorSuggestion] = useState("");
  const [medicationList, setMedicationList] = useState([]);
  const [patientPrescritionsHistory, setPatientPrescritionsHistory] = useState(
    []
  );
  const [clinicName, setClinicName] = useState("");
  const [messages, setMessages] = useState([]);

  const retrieveClinicInformation = () => {
    // var currentUser = authService.getCurrentUser();
    // console.log("=====");
    // console.log(currentUser);
    // clinicService
    //   .getClinicInformation(currentUser.clinicId)
    //   .then((response) => {
    //     var clinic = response.data;
    //     setClinicName(clinic.name);
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });
  };

  // useEffect(() => {
  //   setPatientPrescritionsHistory(prescriptionsHistory);
  //   setMedicationList(prescription.medicationInformation);
  //   setRevisitDate(new Date(prescription.revisitDate));
  //   var arr = prescription.createdAt.split("/");
  //   var date = {
  //     day: arr[1],
  //     month: arr[0],
  //     year: arr[2],
  //   };
  //   setDate(date);
  //   console.log("real medication list is");
  //   console.log(medicationList);
  //   retrieveClinicInformation();
  // }, [prescriptionsHistory, prescription.medicationInformation]);

  const cursorPointerStyle = {
    cursor: "pointer",
  };

  const CreateButton = ({ display }) => {
    if (display) {
      return "";
    } else {
      return (
        <CButton
          color="primary"
          variant="outline"
          shape="square"
          size="sm"
          onClick={() => {
            createPrescription();
          }}
        >
          Lưu
        </CButton>
      );
    }
  };

  const removeMedication = (index) => {
    medicationList.splice(index, 1);
    var updatedMedicationList = [];
    for (let i = 0; i < medicationList.length; i++) {
      var a = medicationList[i];
      updatedMedicationList.push(a);
    }
    setMedicationList(updatedMedicationList);
    setNumberMedicationChildren(medicationList.length);
  };

  const closeModal = () => {
    prescription.diagnosedDescription = "";
    prescription.visitReason = "";
    prescription.doctorSuggestion = "";
    setVisitReason("");
    setDiagnosedDescription("");
    setDoctorSuggestion("");
    setMedicationList(initialArray);
    setNumberMedicationChildren(0);
    setFiles([]);
    setPrescriptionHistory([]);
    if (setDiseaseStages !== undefined) {
      setDiseaseStages([]);
    }
    setMessages([]);
    onClose(false);
  };

  const onAddMedicationElement = () => {
    var a = {
      index: numberMedicationChildren,
      id: 0,
      quantity: 0,
      number: 0,
      usage: null,
      name: null,
    };
    setNumberMedicationChildren(numberMedicationChildren + 1);
    setMedicationList((prev) => [...medicationList, a]);
  };

  const onChangeVisitReason = (visitReason) => {
    setVisitReason(visitReason);
    prescription.visitReason = visitReason;
  };

  const onChangeDiagnosedDescription = (diagnosedDescription) => {
    console.log(diagnosedDescription);
    setDiagnosedDescription(diagnosedDescription);
    prescription.diagnosedDescription = diagnosedDescription;
  };

  const onChangeDoctorSuggestion = (suggestion) => {
    console.log(suggestion);
    setDoctorSuggestion(suggestion);
    prescription.doctorSuggestion = suggestion;
  };

  const createPrescription = () => {
    // console.log(medicationList);
    // var medicationInformation = [];
    // for (let i = 0; i < medicationList.length; i++) {
    //   if (medicationList[i].name === "") {
    //     continue;
    //   }
    //   var a = {
    //     medicationId: medicationList[i].id,
    //     number: parseInt(medicationList[i].number),
    //     usage: medicationList[i].usage,
    //     name: medicationList[i].name,
    //   };
    //   medicationInformation.push(a);
    // }
    // console.log(medicationInformation);
    // PrescriptionService.addPrescription(
    //   patientId,
    //   visitReason,
    //   diagnosedDescription,
    //   revisitDate,
    //   doctorSuggestion,
    //   null,
    //   medicationInformation
    // ).then(
    //   (response) => {
    //     setVisitReason("");
    //     setDiagnosedDescription("");
    //     setDoctorSuggestion("");
    //     setMedicationList(initialArray);
    //     setNumberMedicationChildren(0);
    //     setMessages([]);
    //     onClose(false);
    //   },
    //   (error) => {
    //     console.log("=========");
    //     console.log(error.response.data);
    //     console.log("ahahah");
    //     if (error.response.data.errors !== undefined) {
    //       var a = error.response.data.errors.DiagnosedDescription;
    //       let arr = [];
    //       if (a !== undefined) {
    //         arr.push(a);
    //       }
    //       setMessages(arr);
    //     }
    //     if (typeof error.response.data === "string") {
    //       let b = error.response.data;
    //       let arr = [];
    //       if (b !== undefined) {
    //         arr.push(b);
    //       }
    //       setMessages(arr);
    //     }
    //   }
    // );
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
                <CCol md="1" lg="2" xl="3">
                  <CCard className="mx-1">
                    {/* <DiseaseStage
                      diseaseStages={diseaseStages}
                      setDiseaseStages={setDiseaseStages}
                      patientId={patientId}
                    /> */}
                  </CCard>
                  {/* <MedicationSelection
                    medications={medicationList}
                    setMedications={setMedicationList}
                    setNumberMedicationChildren={setNumberMedicationChildren}
                    numberMedicationChildren={numberMedicationChildren}
                  /> */}
                </CCol>
                <CCol md="9" lg="7" xl="6">
                  <CCard className="mx-1" id="ioc66_sec2">
                    <CCardBody className="p-4">
                      <CForm>
                        <div>
                          <h3 className="ioc66h">Đơn thuốc</h3>
                        </div>
                        <CRow>
                          <CCol>
                            <p className="text">
                              Họ tên: <b>{patient.fullName}</b>
                            </p>
                          </CCol>
                          <CCol>
                            <p className="text">
                              Năm sinh: <b>{patient.yearOfBirth}</b>
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
                              Địa chỉ: <b>{patient.addressCity}</b>
                            </p>
                          </CCol>
                        </CRow>
                        <CRow>
                          <CFormControl className="mb-3">
                            {/* <CCol> */}
                            <h8 className="text ahihi td-ioc66">Lý do khám:</h8>
                            {/* </CCol> */}
                            {/* <CCol> */}
                            <input
                              type="text"
                              placeholder=""
                              id="ioc66_d_reason"
                              value={prescription.visitReason}
                              onChange={(e) =>
                                onChangeVisitReason(e.target.value)
                              }
                              // value={visitReason}
                              // onChange={onChangeVisitReason}
                              class="ioc_textbox txt-dot fullwidth td-ioc66"
                            ></input>
                          </CFormControl>
                        </CRow>
                        <CRow>
                          {/* <CCol> */}
                          <CFormControl className="mb-3">
                            <h8 className="text ahihi td-ioc66">Chẩn đoán:</h8>
                            <input
                              type="text"
                              placeholder=""
                              id="ioc66_d_reason"
                              value={prescription.diagnosedDescription}
                              onChange={(e) =>
                                onChangeDiagnosedDescription(e.target.value)
                              }
                              class="ioc_textbox txt-dot fullwidth td-ioc66"
                            />
                          </CFormControl>
                        </CRow>
                        <CRow>
                          <div id="ioc66_list">
                            <ul id="ioc66_list_c" class="poproduct_option_none">
                              {medicationList.map((entry, index) => (
                                <div class="ioc66i">
                                  {
                                    <MedicationElementComponent
                                      index={index}
                                      removeMedication={removeMedication}
                                      setMedications={setMedicationList}
                                      medications={medicationList}
                                      medication={entry}
                                    />
                                  }
                                </div>
                              ))}
                            </ul>
                          </div>
                        </CRow>
                        <CRow>
                          <div class="icon-add" title="Thêm">
                            <CCol>
                              <Icon.PlusCircle
                                size="22"
                                style={cursorPointerStyle}
                                onClick={() => {
                                  onAddMedicationElement();
                                }}
                              />
                              <div class="clear"></div>
                              <div class="ioc66_sum"></div>
                            </CCol>
                          </div>
                        </CRow>
                        <CRow>
                          <CCol>
                            <CFormControl className="mb-3">
                              <h8 className="text">Ngày tái khám: </h8>
                              <DatePicker
                                class="ioc_textbox txt-dot"
                                selected={revisitDate}
                                onChange={(selected) => {
                                  let AdjusteddateValue = new Date(
                                    selected.getTime() -
                                      selected.getTimezoneOffset() * 60000
                                  );
                                  setRevisitDate(AdjusteddateValue);
                                }}
                              />
                            </CFormControl>
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
                                onChange={(e) =>
                                  onChangeDoctorSuggestion(e.target.value)
                                }
                                autocomplete="off"
                              ></textarea>
                            </div>
                          </CCol>
                          <CCol>
                            <div class="r">
                              <div class="d">
                                Ngày {date.day} Tháng {date.month} Năm{" "}
                                {date.year}
                              </div>
                              <div class="p">BÁC SĨ</div>
                              <div class="b">{clinicName}</div>
                            </div>
                          </CCol>
                        </CRow>
                      </CForm>
                    </CCardBody>
                  </CCard>
                </CCol>
                <CCol md="1" lg="3" xl="3">
                  {/* <PrescriptionHistory
                    patientPrescritionsHistory={patientPrescritionsHistory}
                    setMedicationList={setMedicationList}
                    setDoctorSuggestion={setDoctorSuggestion}
                    setNumberMedicationChildren={setNumberMedicationChildren}
                  />
                  <FilesUpload
                    modal={modal}
                    patientId={patientId}
                    files={files}
                    setFiles={setFiles}
                  /> */}
                </CCol>
              </CRow>
            </CContainer>
          </div>
        </div>
      </CModalBody>
      <CModalFooter>
        <CreateButton display={containEdit} />
        <CButton
          color="primary"
          variant="outline"
          shape="square"
          size="sm"
          onClick={() => {
            closeModal();
          }}
        >
          Hủy
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

export default CreateLabOrderFormModal;
