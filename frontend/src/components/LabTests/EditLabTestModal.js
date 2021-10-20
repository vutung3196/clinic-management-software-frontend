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
import Button from "@mui/material/Button";
import ArticleIcon from "@mui/icons-material/Article";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import FilesUpload from "../FilesUpload";
import authService from "src/services/authentication/auth.service";
import labtestService from "src/services/labtest/labtest.service";

const EditLabTestModal = ({
  patientId,
  patient,
  modal,
  onClose,
  labTest,
  labTests,
  setLabTests,
  setOpenSuccessModal,
  setOpenErrorModal,
  setNotificationMessage,
  isEditForTestNeededToBePerformed,
}) => {
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
  const [code, setCode] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [specialistName, setSpecialistName] = useState("");
  const [result, setResult] = useState("");
  const [medicalServiceName, setMedicalServiceName] = useState("");
  const [labTestStatus, setLabTestStatus] = useState("");
  const [files, setFiles] = useState([]);

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
    setSpecialistName(currentUser.fullName);
    if (labTest !== undefined) {
      setMedicalServiceName(labTest.medicalServiceName);
      setLabTestStatus(labTest.status);
      setFiles(labTest.imageFiles);
    }
    setResult(labTest.result);
  }, [patient, modal, labTest]);

  const cursorPointerStyle = {
    cursor: "pointer",
  };

  const CreateButton = ({ display }) => {
    if (display) {
      return "";
    } else {
      return (
        <Button
          variant="contained"
          color="primary"
          shape="square"
          sx={{ mt: 3, ml: 1 }}
          onClick={() => {
            editLabTestForm();
          }}
        >
          Lưu
        </Button>
      );
    }
  };

  const closeModal = () => {
    setDescription("");
    onClose(false);
  };

  const editLabTestForm = () => {
    // console.log(medicationList);
    labtestService.edit(labTest.id, result, labTestStatus, labTest.status).then(
      (response) => {
        var responseData = response.data.labTests;
        var labTestsResult = [...responseData];
        setLabTests(labTestsResult);
        setDescription("");
        setOpenSuccessModal(true);
        if (responseData.isLabOrderFormDone) {
          setNotificationMessage(
            "Cập nhật phiếu xét nghiệm thành công, bệnh nhân đã hoàn thành toàn bộ xét nghiệm"
          );
        }
        if (
          responseData.isMovingFromWaitingForTestingStatusToWaitingForResultStatus
        ) {
          setNotificationMessage(
            "Cập nhật phiếu xét nghiệm thành trạng thái đang chờ kết quả"
          );
        }
        if (
          responseData.IsMovingFromWaitingForTestingStatusToDoneStatus ||
          responseData.isMovingFromWaitingForResultStatusToDoneStatus
        ) {
          setNotificationMessage(
            "Cập nhật phiếu xét nghiệm thành trạng thái đã có kết quả"
          );
        } else {
          setNotificationMessage("Cập nhật phiếu xét nghiệm thành công");
        }
        onClose(false);
      },
      (error) => {
        console.log("=========");
        console.log(error.response.data);
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
        <CModalTitle>PHIẾU XÉT NGHIỆM</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <div>
          <div className="c-body">
            <CContainer>
              <CRow className="justify-content-center">
                {/* <CCol md="1" lg="2" xl="3"></CCol> */}
                <CCol lg="7">
                  <CCard className="mx-1" id="ioc66_sec2">
                    <CCardBody className="p-4">
                      <CForm>
                        <div>
                          <h3 className="ioc66h">Phiếu xét nghiệm </h3>
                        </div>
                        <CRow>
                          <CCol>
                            <p
                              className="text"
                              style={{
                                "text-align": "center",
                              }}
                            >
                              Mã phiếu chỉ định:{" "}
                              <b>
                                {labTest !== undefined
                                  ? labTest.labOrderFormCode
                                  : ""}
                              </b>
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
                            <CCol>
                              <h8 className="text ahihi td-ioc66">Dịch vụ:</h8>
                              <input
                                type="text"
                                placeholder=""
                                id="ioc66_d_reason"
                                value={
                                  labTest !== undefined
                                    ? labTest.medicalServiceName
                                    : ""
                                }
                                class="ioc_textbox txt-dot fullwidth td-ioc66"
                              ></input>
                            </CCol>
                          </CFormControl>
                        </CRow>
                        <CRow>
                          <CFormControl className="mb-3">
                            <CCol>
                              <div>
                                <h8 className="text ahihi td-ioc66">Mô tả:</h8>
                              </div>

                              {/* </CCol> */}
                              {/* <CCol> */}
                              <input
                                type="text"
                                placeholder=""
                                id="ioc66_d_reason"
                                value={
                                  labTest !== undefined
                                    ? labTest.description
                                    : ""
                                }
                                class="ioc_textbox txt-dot fullwidth td-ioc66"
                              ></input>
                            </CCol>
                          </CFormControl>
                        </CRow>
                        <CRow>
                          <CFormControl className="mb-3">
                            <CCol>
                              <div>
                                <h8 className="text ahihi td-ioc66">
                                  Trạng thái:
                                </h8>
                              </div>
                              {/* <Box
                                sx={{
                                  marginLeft: 3,
                                  maxWidth: 300,
                                  maxHeight: 5,
                                }}
                              > */}
                              <FormControl fullWidth>
                                {/* <InputLabel id="demo-simple-select-label">
                                    Trạng thái
                                  </InputLabel> */}
                                <Select
                                  labelId="demo-simple-select-label"
                                  id="ioc66_d_reason"
                                  value={labTestStatus}
                                  label="Trạng thái"
                                  onChange={(e) =>
                                    setLabTestStatus(e.target.value)
                                  }
                                >
                                  {isEditForTestNeededToBePerformed === true ? (
                                    <MenuItem value={1}>
                                      Đang chờ thực hiện xét nghiệm
                                    </MenuItem>
                                  ) : (
                                    ""
                                  )}
                                  <MenuItem value={2}>
                                    Đang chờ kết quả xét nghiệm
                                  </MenuItem>
                                  <MenuItem value={3}>
                                    Đã có kết quả xét nghiệm
                                  </MenuItem>
                                </Select>
                              </FormControl>
                              {/* </Box> */}
                              {/* <input
                                type="text"
                                placeholder=""
                                id="ioc66_d_reason"
                                value={
                                  labOrderForm !== undefined
                                    ? labOrderForm.description
                                    : ""
                                }
                                class="ioc_textbox txt-dot fullwidth td-ioc66"
                              ></input> */}
                            </CCol>
                          </CFormControl>
                        </CRow>
                        <CRow>
                          <CCol>
                            <div>
                              <h8 className="text">Kết quả:</h8>
                            </div>
                            <div>
                              <textarea
                                id="ioc66_d_loidan"
                                class="suggestion-style ioc_textbox ioc66loidan ui-autocomplete-input"
                                rows="4"
                                value={result}
                                onChange={(e) => setResult(e.target.value)}
                                autocomplete="off"
                              ></textarea>
                            </div>
                          </CCol>
                        </CRow>
                        <CRow>
                          <CCol>
                            <div class="ioc66_foot">
                              <div class="r">
                                <div class="d">
                                  Ngày {day} Tháng {month} Năm {year}
                                </div>
                                <div class="p">Người lập</div>
                                <div class="b">{specialistName}</div>
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
                    labTestId={labTest.id}
                    files={files}
                    setFiles={setFiles}
                    setOpenSuccessModal={setOpenSuccessModal}
                    setOpenErrorModal={setOpenErrorModal}
                    setNotificationMessage={setNotificationMessage}
                    isPrescriptionModal={false}
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
          Hủy
        </Button>
      </CModalFooter>
    </CModal>
  );
};

export default EditLabTestModal;
