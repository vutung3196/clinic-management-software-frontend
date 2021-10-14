import React, { useState, useEffect } from "react";
import {
  CModal,
  CButton,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CForm,
  CFormGroup,
  CInputGroup,
  CInput,
  CDropdown,
  CDropdownItem as option,
} from "@coreui/react";
// import * as Icon from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import CreatePrescriptionModal from "../Prescription";
// import ViewImageModal from "../FilesUpload/ViewImageModal";
import hospitalizedprofileService from "src/services/hospitalizedprofile/hospitalizedprofile.service";
import LabOrderFormModal from "../LabOrderForm";
import Button from "@mui/material/Button";

const DetailedPatientHospitalizedProfileModal = ({
  modal,
  onClose,
  patient,
  clinic,
  patientHospitalizedProfileId,
  patientDoctorVisitingFormId,
  setOpenSuccessModal,
  setOpenErrorModal,
  setNotificationMessage,
}) => {
  console.log(patientHospitalizedProfileId);
  const [viewImageModal, setViewImageModal] = useState(false);
  const [patientHospitalizedProfile, setPatientHospitalizedProfile] =
    useState(false);
  const [currentFile, setCurrentFile] = useState("");
  const [labOrderFormModal, setLabOrderFormModal] = useState(false);
  const [prescriptionModal, setPrescriptionModal] = useState(false);

  const style1 = {
    width: "100px",
  };

  const style2 = {
    padding: "5px 0 5px",
  };

  const style3 = {
    "padding-left": "30px",
    overflow: "auto",
    height: "200px",
  };

  const style4 = {
    width: "90px",
  };

  const style10 = {
    width: "180px",
  };

  const style5 = {
    padding: "28px 0 5px",
  };

  const style6 = {
    "padding-left": "30px",
    overflow: "auto",
    height: "200px",
  };

  const style7 = {
    padding: "23px 0 5px",
    // overflow: "auto",
    height: "230px",
  };

  const style8 = {
    "padding-left": "30px",
    overflow: "auto",
    height: "180px",
  };

  const style9 = {
    width: "100px",
  };

  const style13 = {
    width: "50px",
  };

  const style11 = {
    width: "95px",
  };

  const style12 = {
    "line-height": "0.3",
  };

  const getDetailedPatientHospitalizedProfile = () => {
    hospitalizedprofileService
      .getById(patientHospitalizedProfileId)
      .then((response) => {
        console.log(response.data);
        setPatientHospitalizedProfile(response.data);
      })
      .catch((e) => {
        setPatientHospitalizedProfile("");
        console.log(e);
      });
  };

  useEffect(getDetailedPatientHospitalizedProfile, [
    modal,
    patientHospitalizedProfileId,
  ]);

  // const PatientPrescriptionView = (props) => {
  //   return props.patientProfile !== undefined &&
  //     props.patientProfile.patientPrescriptions !== undefined
  //     ? props.patientProfile.patientPrescriptions.map((entry) => (
  //         <tr>
  //           <td valign="top" align="center">
  //             {entry.createdAt}
  //           </td>
  //           <td valign="top" align="center">
  //             <Link
  //               to={{
  //                 pathname:
  //                   "/singleprescription/" + entry.id + "/" + patient.id,
  //                 id: entry.id,
  //                 patientId: patient.id,
  //               }}
  //               target="_blank"
  //             >
  //               {entry.patientPrescriptionCode}
  //             </Link>
  //           </td>
  //           <td>{entry.diagnosedDescription}</td>
  //           <td>{entry.doctorSuggestion}</td>
  //           <td valign="top" align="center">
  //             {entry.revisitDate}
  //           </td>
  //         </tr>
  //       ))
  //     : "";
  // };

  const LabOrderFormsView = (props) => {
    return props.patientProfile !== undefined &&
      props.patientProfile.labOrderForms !== undefined
      ? props.patientProfile.labOrderForms.map((entry) => (
          <tr>
            <td valign="top" align="center">
              {entry.createdAt}
            </td>
            <td>
              <div>{entry.code}</div>
            </td>
            <td>
              <div>{entry.doctorVisitingFormCode}</div>
            </td>
            <td>
              <div>{entry.description}</div>
            </td>
          </tr>
        ))
      : "";
  };

  // const showViewImageModal = (file) => {
  //   setCurrentFile(file);
  //   setViewImageModal(!viewImageModal);
  // };

  const LabTestsView = (props) => {
    return props.patientProfile !== undefined &&
      props.patientProfile.labTests !== undefined
      ? props.patientProfile.labTests.map((entry) => (
          <tr>
            <td valign="top" align="center">
              {entry.createdAt}
            </td>
            <td align="center">{entry.name}</td>
            <td align="center">{entry.description}</td>
            <td align="center">
              {entry.status}

              {/* <Icon.Image
                class="icon-cursor"
                onClick={() => {
                  showViewImageModal(entry);
                }}
              /> */}
            </td>
            <td align="center"></td>
            <td align="center">{entry.result}</td>
          </tr>
        ))
      : "";
  };

  return (
    <CModal show={modal} onClose={onClose} size="xl">
      <CModalHeader closeButton>
        <CModalTitle>HỒ SƠ Y TẾ </CModalTitle>
      </CModalHeader>
      <CModalBody>
        <div data-new-gr-c-s-check-loaded="14.1019.0" data-gr-ext-installed="">
          <div class="view-c0">
            <div class="view-c1">
              <div class="dochead2">
                <div style={style12}>
                  <p>Tên đơn vị: {clinic.name}</p>
                  <p>Địa chỉ: {clinic.address}</p>
                  <p>Điện thoại: {clinic.phoneNumber}</p>
                </div>
              </div>
              <div>
                <div class="head-div-1" data-darkreader-inline-color="">
                  Hồ Sơ y tế
                </div>
              </div>
              <div id="d_lr">
                <div id="d_left"></div>
                <div id="d_right">
                  <center>
                    <table class="tab_table">
                      <tbody>
                        <tr>
                          <td style={style1}>Họ tên:</td>
                          <td class="s">:</td>
                          <td>
                            <strong>{patient.fullName}</strong>
                          </td>
                        </tr>
                        <tr>
                          <td>Ngày tháng năm sinh</td>
                          <td class="s">:</td>
                          <td>{patient.dateOfBirthDetail}</td>
                        </tr>
                        <tr>
                          <td>Giới tính</td>
                          <td class="s">:</td>
                          <td>{patient.gender}</td>
                        </tr>
                        <tr>
                          <td>Điện thoại</td>
                          <td class="s">:</td>
                          <td>{patient.phoneNumber}</td>
                        </tr>
                        <tr>
                          <td valign="top">Địa chỉ (tỉnh)</td>
                          <td valign="top" class="s">
                            :
                          </td>
                          <td>{patient.addressCity}</td>
                        </tr>
                        <tr>
                          <td valign="top">Mã số thẻ BHYT (nếu có)</td>
                          <td valign="top" class="s">
                            :
                          </td>
                          <td>{patient.medicalInsuranceCode}</td>
                        </tr>
                      </tbody>
                    </table>
                  </center>
                </div>
              </div>

              <div id="d_ck_2002" class="presc-ck"></div>

              <div style={style7}>
                <h2>Lịch sử khám bệnh</h2>
                <div style={style8}>
                  <table
                    cellpadding="0"
                    cellspacing="1"
                    border="0"
                    class="table_normal"
                    width="100%"
                  >
                    <tbody>
                      <tr>
                        <th style={style4}>Ngày</th>
                        <th style={style4}>Mã đơn thuốc</th>
                        <th style={style4}>Mã phiếu khám</th>
                        <th>Chẩn đoán</th>
                        <th>Lời dặn</th>
                        <th style={style11}>Ngày tái khám</th>
                      </tr>
                      {/* <PatientPrescriptionView
                        patientProfile={patientHospitalizedProfile}
                      /> */}
                    </tbody>
                  </table>
                </div>
              </div>

              <div style={style5}>
                <h2>Phiếu chỉ định</h2>
                <div style={style6}>
                  <table
                    cellpadding="0"
                    cellspacing="1"
                    border="0"
                    class="table_normal"
                    width="100%"
                  >
                    <tbody>
                      <tr>
                        <th style={style4}>Ngày</th>
                        <th style={style4}>Mã phiếu chỉ định</th>
                        <th style={style4}>Mã phiếu khám</th>
                        <th>Mô tả chỉ định</th>
                        {/* <th>Kết quả</th> */}
                      </tr>
                      <LabOrderFormsView
                        patientProfile={patientHospitalizedProfile}
                      />
                    </tbody>
                  </table>
                </div>
              </div>

              <div style={style7}>
                <h2>Phiếu xét nghiệm</h2>
                <div style={style8}>
                  <table
                    cellpadding="0"
                    cellspacing="1"
                    border="0"
                    class="table_normal"
                    width="100%"
                  >
                    <tbody>
                      <tr>
                        <th style={style4}>Ngày</th>
                        <th style={style4}>Tên xét nghiệm</th>
                        <th>Mô tả</th>
                        <th>Trạng thái</th>
                        <th>Ảnh (nếu có)</th>
                        <th>Kết quả</th>
                      </tr>
                      <LabTestsView
                        patientProfile={patientHospitalizedProfile}
                      />
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        <LabOrderFormModal
          modal={labOrderFormModal}
          onClose={setLabOrderFormModal}
          patient={patient}
          patientHospitalizedProfileId={patientHospitalizedProfileId}
          patientDoctorVisitingFormId={patientDoctorVisitingFormId}
        />
        <CreatePrescriptionModal
          modal={prescriptionModal}
          onClose={setPrescriptionModal}
          patient={patient}
          patientHospitalizedProfileId={patientHospitalizedProfileId}
          patientDoctorVisitingFormId={patientDoctorVisitingFormId}
          setOpenSuccessModal={setOpenSuccessModal}
          setOpenErrorModal={setOpenErrorModal}
          setNotificationMessage={setNotificationMessage}
        />
      </CModalBody>
      <CModalFooter>
        <Button
          color="primary"
          variant="contained"
          shape="square"
          size="sm"
          sx={{ mt: 3, ml: 1 }}
          onClick={() => setPrescriptionModal(!prescriptionModal)}
        >
          Kê đơn
        </Button>
        <Button
          color="primary"
          variant="contained"
          shape="square"
          size="sm"
          sx={{ mt: 3, ml: 1 }}
          onClick={() => setLabOrderFormModal(!labOrderFormModal)}
        >
          Tạo phiếu chỉ định
        </Button>
        <Button
          color="primary"
          variant="contained"
          shape="square"
          size="sm"
          sx={{ mt: 3, ml: 1 }}
          onClick={() => onClose(false)}
        >
          THOÁT
        </Button>
      </CModalFooter>
    </CModal>
  );
};

export default DetailedPatientHospitalizedProfileModal;
