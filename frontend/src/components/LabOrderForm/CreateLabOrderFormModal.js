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

import MedicalServiceElementComponent from "./MedicalServiceElementComponent";
import FilesUpload from "../FilesUpload";
import laborderformService from "src/services/laborderform/laborderform.service";
import MedicalServiceSelection from "../MedicalServiceSelection";
import authService from "src/services/authentication/auth.service";
import Button from "@mui/material/Button";

const CreateLabOrderFormModal = ({
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
  console.log("profile id is: " + patientHospitalizedProfileId);
  const a = {
    index: 0,
    id: "",
    name: "",
    quantity: 0,
    description: "",
  };
  const initialArray = [a];
  const [numberMedicalServicesChildren, setNumberMedicalServicesChildren] =
    useState(1);

  const [date, setDate] = useState("");

  // Create lab order form model
  const [description, setDescription] = useState("");
  const [labTests, setLabTests] = useState([]);
  const [code, setCode] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [doctorName, setDoctorName] = useState("");

  useEffect(() => {
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    setDay(day);
    setMonth(month);
    setYear(year);

    var currentMillis = new Date().getUTCMilliseconds();
    setCode("CĐ" + patient.id.toString() + currentMillis.toString());
    var currentUser = authService.getCurrentUser();
    console.log(currentUser);
    setDoctorName(currentUser.fullName);
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
            createLabOrderForm();
          }}
        >
          Lưu và in
        </Button>
      );
    }
  };

  const removeMedicalService = (index) => {
    labTests.splice(index, 1);
    var updatedMedicationList = [];
    for (let i = 0; i < labTests.length; i++) {
      var a = labTests[i];
      updatedMedicationList.push(a);
    }
    setLabTests(updatedMedicationList);
    setNumberMedicalServicesChildren(labTests.length);
  };

  const closeModal = () => {
    setDescription("");
    setLabTests(initialArray);
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
    setLabTests((prev) => [...labTests, a]);
  };

  const onChangeDescription = (description) => {
    setDescription(description);
  };

  const createLabOrderForm = () => {
    // console.log(medicationList);
    var labTestInformation = [];
    for (let i = 0; i < labTests.length; i++) {
      if (labTests[i].name === "") {
        continue;
      }
      var a = {
        medicalServiceId: labTests[i].id,
        // quantity: parseInt(labTests[i].quantity),
        description: labTests[i].description,
        name: labTests[i].name,
      };
      labTestInformation.push(a);
    }
    console.log("AYYA");
    console.log(patientHospitalizedProfileId);
    laborderformService
      .create(
        description,
        labTestInformation,
        patientHospitalizedProfileId,
        code,
        patientDoctorVisitingFormId
      )
      .then(
        (response) => {
          setDescription("");
          setLabTests(initialArray);
          setNumberMedicalServicesChildren(0);
          setOpenSuccessModal(true);
          setNotificationMessage("Tạo phiếu chỉ định thành công");
          window.open("/laborderform/" + response.data);

          setTimeout(() => {
            window.location.reload();
          }, 3000);
          onClose(false);
        },
        (error) => {
          console.log("=========");
          console.log(error);
          setOpenErrorModal(true);
          setNotificationMessage("Tạo phiếu chỉ định không thành công");
          console.log("ahahah");
          // if (error.response.data.errors !== undefined) {
          //   var a = error.response.data.errors.DiagnosedDescription;
          //   let arr = [];
          //   if (a !== undefined) {
          //     arr.push(a);
          //   }
          //   setMessages(arr);
          // }
          // if (typeof error.response.data === "string") {
          //   let b = error.response.data;
          //   let arr = [];
          //   if (b !== undefined) {
          //     arr.push(b);
          //   }
          //   setMessages(arr);
          // }
        }
      );
  };

  return (
    <CModal show={modal} onClose={closeModal} size="xl">
      <CModalHeader closeButton>
        <CModalTitle>Phiếu chỉ định</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <div>
          <div className="c-body">
            <CContainer>
              <CRow className="justify-content-center">
                <CCol md="1" lg="2" xl="3">
                  <MedicalServiceSelection
                    medicalServiceList={labTests}
                    setMedicalServiceList={setLabTests}
                    setNumberMedicalServicesChildren={
                      setNumberMedicalServicesChildren
                    }
                    numberMedicalServicesChildren={
                      numberMedicalServicesChildren
                    }
                  />
                </CCol>
                <CCol md="9" lg="7" xl="7">
                  <CCard className="mx-1" id="ioc66_sec2">
                    <CCardBody className="p-4">
                      <CForm>
                        <div>
                          <h3 className="ioc66h">Phiếu chỉ định</h3>
                        </div>
                        <CRow>
                          <CCol>
                            <p
                              className="text"
                              style={{
                                "text-align": "center",
                              }}
                            >
                              Mã phiếu: <b>{code}</b>
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
                        <CRow>
                          <CFormControl className="mb-3">
                            {/* <CCol> */}
                            <h8 className="text ahihi td-ioc66">Mô tả:</h8>
                            {/* </CCol> */}
                            {/* <CCol> */}
                            <input
                              type="text"
                              placeholder=""
                              id="ioc66_d_reason"
                              value={description}
                              onChange={(e) =>
                                onChangeDescription(e.target.value)
                              }
                              class="ioc_textbox txt-dot fullwidth td-ioc66"
                            ></input>
                          </CFormControl>
                        </CRow>
                        <CRow>
                          {/* <CCol> */}
                          <CFormControl className="mb-3">
                            <h8 className="text ahihi td-ioc66">Dịch vụ:</h8>
                          </CFormControl>
                        </CRow>
                        <CRow>
                          <div id="ioc66_list">
                            <ul id="ioc66_list_c" class="poproduct_option_none">
                              {labTests.map((entry, index) => (
                                <div class="ioc66i">
                                  {
                                    <MedicalServiceElementComponent
                                      index={index}
                                      removeMedicalService={
                                        removeMedicalService
                                      }
                                      setMedicalServices={setLabTests}
                                      medicalServices={labTests}
                                      medicalService={entry}
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
                                  onAddMedicalServiceElement();
                                }}
                              />
                              <div class="clear"></div>
                              <div class="ioc66_sum"></div>
                            </CCol>
                          </div>
                        </CRow>
                        <CRow>
                          <CCol>
                            <div class="ioc66_foot">
                              {/* <div class="r">
                              <div class="d">Ngày 11 Tháng 10 Năm 2021</div>
                              <div class="p">Người lập</div>
                              <div class="b">Phòng Khám ABC</div>
                            </div> */}
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
                {/* <CCol md="1" lg="3" xl="3">
                  <FilesUpload
                    modal={modal}
                    patientId={patientId}
                    //  files={files}
                    //  setFiles={setFiles}
                  />
                </CCol> */}
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
          Hủy
        </Button>
      </CModalFooter>
    </CModal>
  );
};

export default CreateLabOrderFormModal;
