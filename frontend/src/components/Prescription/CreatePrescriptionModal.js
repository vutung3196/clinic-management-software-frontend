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
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import FilesUpload from "../FilesUpload";
import { vi } from "date-fns/locale";
import DiagnosedDescriptionModal from "./DiagnosedDescriptionModal";
import MedicationElementComponent from "./MedicationElementComponent";
import MedicationSelection from "../MedicationSelection";
import authService from "src/services/authentication/auth.service";
import Button from "@mui/material/Button";
import prescriptionService from "src/services/prescription/prescription.service";
import fileService from "src/services/file/file.service";

const CreatePrescriptionModal = ({
  patientId,
  patient,
  modal,
  onClose,
  patientHospitalizedProfileId,
  patientDoctorVisitingFormId,
  setOpenSuccessModal,
  setOpenErrorModal,
  setNotificationMessage,
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
  const [doctorName, setDoctorName] = useState("");
  const [weight, setWeight] = useState(null);
  const [supervisorName, setSupervisorName] = useState("");
  const [files, setFiles] = useState([]);

  useEffect(() => {
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    setDay(day);
    setMonth(month);
    setYear(year);
    handleRevisitDateChange(new Date());
    // get all files of current doctor visiting form id
    var currentMillis = new Date().getUTCMilliseconds();
    setCode("??T" + patient.id.toString() + currentMillis.toString());
    var currentUser = authService.getCurrentUser();
    setDoctorName(currentUser.fullName);
    fileService
      .getByVisitingForm(patientDoctorVisitingFormId)
      .then((response) => {
        console.log(response);
        setFiles(response.data);
      })
      .catch((e) => {
        console.log(e);
        setFiles([]);
      });
  }, [patient.id, modal]);

  const cursorPointerStyle = {
    cursor: "pointer",
  };

  const CreateButton = ({ display }) => {
    if (display) {
      return "";
    } else {
      return (
        <Button
          color="primary"
          variant="contained"
          shape="square"
          size="sm"
          sx={{ mt: 3, ml: 1 }}
          onClick={() => {
            createPrescription();
          }}
        >
          L??u v?? in
        </Button>
      );
    }
  };

  const removeMedicalService = (index) => {
    medicationList.splice(index, 1);
    var updatedMedicationList = [];
    for (let i = 0; i < medicationList.length; i++) {
      var a = medicationList[i];
      updatedMedicationList.push(a);
    }
    setMedicationList(updatedMedicationList);
    setNumberMedicalServicesChildren(medicationList.length);
  };

  const closeModal = () => {
    setDescription("");
    setMedicationList([]);
    setNumberMedicalServicesChildren(0);
    onClose(false);
  };

  const onAddMedicalServiceElement = () => {
    var a = {
      index: numberMedicalServicesChildren,
      id: 0,
      // number: 0,
      usage: null,
      name: "",
    };
    setNumberMedicalServicesChildren(numberMedicalServicesChildren + 1);
    setMedicationList((prev) => [...medicationList, a]);
  };

  const onChangeDescription = (description) => {
    setDescription(description);
  };

  const createPrescription = () => {
    if (
      patient.age <= 6 &&
      (weight === null || weight === 0 || weight === "")
    ) {
      setOpenErrorModal(true);
      setNotificationMessage("C??n n???ng l?? b???t bu???c cho tr??? d?????i 72 th??ng tu???i");
      return;
    }

    // console.log(medicationList);
    var medicationsInformation = [];
    for (let i = 0; i < medicationList.length; i++) {
      if (medicationList[i].name === "") {
        continue;
      }
      var a = {
        medicalServiceId: medicationList[i].id,
        quantity: parseInt(medicationList[i].quantity),
        usage: medicationList[i].usage,
        name: medicationList[i].name,
      };
      medicationsInformation.push(a);
    }

    prescriptionService
      .create(
        diagnosedDescription,
        revisitDate,
        doctorSuggestion,
        medicationsInformation,
        patientHospitalizedProfileId,
        patient.medicalInsuranceCode,
        code,
        patientDoctorVisitingFormId,
        diseaseNote,
        weight,
        supervisorName
      )
      .then(
        (response) => {
          setDescription("");
          setMedicationList(initialArray);
          setNumberMedicalServicesChildren(0);
          setOpenSuccessModal(true);
          setNotificationMessage("T???o ????n thu???c th??nh c??ng");
          window.open("/prescription/" + response.data);
          onClose(false);

          // setTimeout(() => {
          //   window.location.reload();
          // }, 3000);
          // onCloseDetailedModal(false);
        },
        (error) => {
          console.log(error.response.data);
          var errorMessage = "";
          if (error.response.data.errors !== undefined) {
            let arr = [];
            var a = error.response.data.errors.DiagnosedDescription;
            if (a !== undefined) {
              arr.push(a);
            }
            var b = error.response.data.errors.DoctorSuggestion;
            if (b !== undefined) {
              arr.push(b);
            }

            var c = error.response.data.errors.DiseaseNote;
            if (c !== undefined) {
              arr.push(c);
            }

            for (let index = 0; index < arr.length; index++) {
              errorMessage += arr[index];
              if (index !== arr.length - 1) {
                errorMessage += " v?? ";
              }
            }
          }
          console.log(error.response.data);
          if (
            (error.response.data !== null &&
              typeof error.response.data === "string") ||
            error.response.data instanceof String
          ) {
            errorMessage += error.response.data;
          }
          setOpenErrorModal(true);
          setNotificationMessage(errorMessage);
        }
      );
  };

  return (
    <CModal show={modal} onClose={closeModal} size="xl">
      <CModalHeader closeButton>
        <CModalTitle>K?? ????N</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <div>
          <div className="c-body">
            <CContainer>
              <CRow className="justify-content-center">
                <CCol md="1" lg="2" xl="3">
                  <MedicationSelection
                    medicationList={medicationList}
                    setMedicationList={setMedicationList}
                    setNumberMedicationChildren={
                      setNumberMedicalServicesChildren
                    }
                    numberMedicationChildren={numberMedicalServicesChildren}
                  />
                </CCol>
                <CCol md="9" lg="7" xl="6">
                  <CCard className="mx-1" id="ioc66_sec2">
                    <CCardBody className="p-4">
                      <CForm>
                        <div>
                          <h3 className="ioc66h">????n thu???c</h3>
                        </div>
                        <CRow>
                          <CCol>
                            <p
                              className="text"
                              style={{
                                "text-align": "center",
                              }}
                            >
                              M?? ????n thu???c: <b>{code}</b>
                            </p>
                          </CCol>
                        </CRow>
                        <CRow>
                          <CCol>
                            <p className="text">
                              H??? t??n: <b>{patient.fullName}</b>
                            </p>
                          </CCol>
                          <CCol>
                            <p className="text">
                              Ng??y th??ng n??m sinh:{" "}
                              <b>{patient.dateOfBirthDetail}</b>
                            </p>
                          </CCol>
                        </CRow>
                        <CRow>
                          <CCol>
                            <p className="text">
                              ??i???n tho???i: <b>{patient.phoneNumber}</b>
                            </p>
                          </CCol>
                          <CCol>
                            <p className="text">
                              Gi???i t??nh: <b>{patient.gender}</b>
                            </p>
                          </CCol>
                        </CRow>
                        <CRow>
                          <CCol>
                            <p className="text">
                              ?????a ch??? (t???nh): <b>{patient.addressCity}</b>
                            </p>
                          </CCol>
                        </CRow>
                        <CRow>
                          <CCol>
                            <p className="text">
                              M?? s??? th??? BHYT (n???u c??):{" "}
                              <b>{patient.medicalInsuranceCode}</b>
                            </p>
                          </CCol>
                        </CRow>
                        {patient.age <= 6 ? (
                          <>
                            <CRow>
                              <CFormControl className="mb-3">
                                <h8 className="text ahihi td-ioc66">
                                  C??n n???ng (cho tr??? d?????i 72 th??ng tu???i, ????n v???
                                  kg):{" "}
                                </h8>
                                <input
                                  type="number"
                                  placeholder=""
                                  id="ioc66_d_reason"
                                  value={weight}
                                  onChange={(e) => setWeight(e.target.value)}
                                  class="ioc_textbox txt-dot fullwidth td-ioc66"
                                ></input>
                              </CFormControl>
                            </CRow>
                            <CRow>
                              <CFormControl className="mb-3">
                                <h8 className="text ahihi td-ioc66">
                                  T??n ng?????i ????a tr??? ?????n kh??m (cho tr??? d?????i 72
                                  th??ng tu???i):{" "}
                                </h8>
                                <input
                                  type="text"
                                  placeholder=""
                                  id="ioc66_d_reason"
                                  value={supervisorName}
                                  onChange={(e) =>
                                    setSupervisorName(e.target.value)
                                  }
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
                            <h8 className="text ahihi td-ioc66">Ch???n ??o??n:</h8>
                            {/* </CCol> */}
                            {/* <CCol> */}
                            <input
                              type="text"
                              placeholder=""
                              id="ioc66_d_reason"
                              value={diagnosedDescription}
                              // onChange={(e) =>
                              //   setDiagnosedDescription(e.target.value)
                              // }
                              class="ioc_textbox txt-dot fullwidth td-ioc66"
                            ></input>
                          </CFormControl>
                        </CRow>
                        <CRow>
                          <Button
                            onClick={() => setDiagnosedDescriptionModal(true)}
                            color="primary"
                            variant="contained"
                            // shape="square"
                            // size="sm"
                            // sx={{ mt: 3, ml: 1 }}
                          >
                            Ch???n ch???n ??o??n
                          </Button>
                        </CRow>
                        <CRow>
                          <CFormControl className="mb-3">
                            {/* <CCol> */}
                            <h8 className="text ahihi td-ioc66">
                              Ghi ch?? b???nh:
                            </h8>
                            {/* </CCol> */}
                            {/* <CCol> */}
                            <input
                              type="text"
                              placeholder=""
                              id="ioc66_d_reason"
                              value={diseaseNote}
                              onChange={(e) => setDiseaseNote(e.target.value)}
                              class="ioc_textbox txt-dot fullwidth td-ioc66"
                            ></input>
                          </CFormControl>
                        </CRow>
                        <CRow>
                          {/* <CCol> */}
                          <CFormControl className="mb-3">
                            <h8 className="text ahihi td-ioc66">
                              Thu???c ??i???u tr???:
                            </h8>
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
                                      removeMedicalService={
                                        removeMedicalService
                                      }
                                      setMedicalServices={setMedicationList}
                                      medicalServices={medicationList}
                                      medicalService={entry}
                                    />
                                  }
                                </div>
                              ))}
                            </ul>
                          </div>
                        </CRow>
                        {/* <CRow>
                          <div class="icon-add" title="Th??m">
                            <CCol>
                              <Icon.PlusCircle
                                size="22"
                                style={cursorPointerStyle}
                                onClick={() => {
                                  onAddMedicalServiceElement();
                                }}
                              />
                              <div class="clear"></div>
                              <div class="ioc66_sum"></div>
                            </CCol>
                          </div>
                        </CRow> */}
                        <CRow>
                          <CCol>
                            <div>
                              <CFormControl className="mb-3">
                                {/* <h8 className="text">Ng??y t??i kh??m: </h8> */}
                                <LocalizationProvider
                                  locale={vi}
                                  dateAdapter={AdapterDateFns}
                                >
                                  <Stack spacing={1}>
                                    <DesktopDatePicker
                                      label="Ng??y t??i kh??m"
                                      value={revisitDate}
                                      minDate={new Date("1900-01-01")}
                                      onChange={(newValue) => {
                                        handleRevisitDateChange(newValue);
                                      }}
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
                              <h8 className="text">L???i d???n:</h8>
                            </div>
                            <div>
                              <textarea
                                id="ioc66_d_loidan"
                                class="suggestion-style ioc_textbox ioc66loidan ui-autocomplete-input"
                                rows="4"
                                value={doctorSuggestion}
                                onChange={(e) =>
                                  setDoctorSuggestion(e.target.value)
                                }
                                autocomplete="off"
                              ></textarea>
                            </div>
                          </CCol>
                          <CCol>
                            <div class="ioc66_foot">
                              {/* <div class="r">
                              <div class="d">Ng??y 11 Th??ng 10 N??m 2021</div>
                              <div class="p">Ng?????i l???p</div>
                              <div class="b">Ph??ng Kh??m ABC</div>
                            </div> */}
                              <div class="r">
                                <div class="d">
                                  Ng??y {day} Th??ng {month} N??m {year}
                                </div>
                                <div class="p">Ng?????i l???p</div>
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
                <CCol md="1" lg="3" xl="3">
                  <FilesUpload
                    modal={modal}
                    patientId={patientId}
                    isPrescriptionModal={true}
                    visitingFormId={patientDoctorVisitingFormId}
                    files={files}
                    setFiles={setFiles}
                  />
                </CCol>
              </CRow>
            </CContainer>
          </div>
        </div>
      </CModalBody>
      <CModalFooter>
        <CreateButton />
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
          H???y
        </Button>
      </CModalFooter>

      <DiagnosedDescriptionModal
        open={diagnosedDescriptionModal}
        onClose={handleCloseDiagnosedDescriptionModal}
        setDiagnosedDescription={setDiagnosedDescription}
      />
    </CModal>
  );
};

export default CreatePrescriptionModal;
