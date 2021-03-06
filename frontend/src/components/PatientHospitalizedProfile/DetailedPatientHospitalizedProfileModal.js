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
import * as Icon from "react-bootstrap-icons";

// import * as Icon from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import CreatePrescriptionModal from "../Prescription";
import ViewImageModal from "../FilesUpload/ViewImageModal";
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
  console.log("damn");
  console.log("damn");
  console.log("damn");
  console.log("damn");
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
        console.log("hjejejeje");
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

  const PatientPrescriptionView = (props) => {
    console.log(props.patientProfile.prescriptions);
    return props.patientProfile !== undefined &&
      props.patientProfile.prescriptions !== undefined
      ? props.patientProfile.prescriptions.map((entry) => (
          <tr>
            <td valign="top" align="center">
              {entry.createdAt}
            </td>
            <td valign="top" align="center">
              <Link
                to={{
                  pathname: "/prescription/" + entry.id,
                }}
                target="_blank"
              >
                {entry.code}
              </Link>
            </td>
            <td>{entry.doctorVisitingFormCode}</td>
            <td>{entry.diagnosedDescription}</td>
            <td>{entry.doctorSuggestion}</td>
            <td valign="top" align="center">
              {entry.revisitDateDisplayed}
            </td>
          </tr>
        ))
      : "";
  };

  const LabOrderFormsView = (props) => {
    return props.patientProfile !== undefined &&
      props.patientProfile.labOrderForms !== undefined
      ? props.patientProfile.labOrderForms.map((entry) => (
          <tr>
            <td valign="top" align="center">
              {entry.createdAt}
            </td>
            <td>
              <div>
                <Link
                  to={{
                    pathname: "/laborderform/" + entry.id,
                  }}
                  target="_blank"
                >
                  {entry.code}
                </Link>
              </div>
            </td>
            <td>
              <div>{entry.doctorVisitingFormCode}</div>
            </td>
            <td>
              <div>{entry.description}</div>
            </td>
            <td>
              <div>{entry.status}</div>
            </td>
          </tr>
        ))
      : "";
  };

  const closeModal = () => {
    onClose(false);
    // setTimeout(() => {
    window.location.reload();
    // }, 3000);
  };

  const showViewImageModal = (file) => {
    setCurrentFile(file);
    setViewImageModal(!viewImageModal);
  };

  const LabTestsView = (props) => {
    return props.patientProfile !== undefined &&
      props.patientProfile.labTests !== undefined
      ? props.patientProfile.labTests.map((entry) => (
          <tr>
            <td valign="top" align="center">
              {entry.createdAt}
            </td>
            <td align="center">
              <Link
                to={{
                  pathname: "/labtest/" + entry.id,
                }}
                target="_blank"
              >
                {entry.name}
              </Link>
            </td>
            <td align="center">{entry.description}</td>
            <td align="center">{entry.status}</td>
            <td align="center">
              {entry.imageFiles.map((file) => (
                <Icon.Image
                  class="icon-cursor image-element"
                  onClick={() => {
                    showViewImageModal(file);
                  }}
                />
              ))}
            </td>
            <td align="center">{entry.result}</td>
          </tr>
        ))
      : "";
  };

  return (
    <CModal show={modal} onClose={onClose} size="xl">
      <CModalHeader closeButton>
        <CModalTitle>H??? S?? Y T??? </CModalTitle>
      </CModalHeader>
      <CModalBody>
        <div data-new-gr-c-s-check-loaded="14.1019.0" data-gr-ext-installed="">
          <div class="view-c0">
            <div class="view-c1">
              <div class="dochead2">
                <div style={style12}>
                  <p>T??n ????n v???: {clinic.name}</p>
                  <p>?????a ch???: {clinic.address}</p>
                  <p>??i???n tho???i: {clinic.phoneNumber}</p>
                </div>
              </div>
              <div>
                <div class="head-div-1" data-darkreader-inline-color="">
                  H??? S?? y t???
                </div>
                <div class="head-div-1" data-darkreader-inline-color="">
                  M?? s???: {patientHospitalizedProfile.code}
                </div>
              </div>
              <div id="d_lr">
                <div id="d_left"></div>
                <div id="d_right">
                  <center>
                    <table class="tab_table">
                      <tbody>
                        <tr>
                          <td style={style1}>H??? t??n:</td>
                          <td class="s">:</td>
                          <td>
                            <strong>{patient.fullName}</strong>
                          </td>
                        </tr>
                        <tr>
                          <td>Ng??y th??ng n??m sinh</td>
                          <td class="s">:</td>
                          <td>{patient.dateOfBirthDetail}</td>
                        </tr>
                        <tr>
                          <td>Gi???i t??nh</td>
                          <td class="s">:</td>
                          <td>{patient.gender}</td>
                        </tr>
                        <tr>
                          <td>??i???n tho???i</td>
                          <td class="s">:</td>
                          <td>{patient.phoneNumber}</td>
                        </tr>
                        <tr>
                          <td valign="top">?????a ch??? (t???nh)</td>
                          <td valign="top" class="s">
                            :
                          </td>
                          <td>{patient.addressCity}</td>
                        </tr>
                        <tr>
                          <td valign="top">M?? s??? th??? BHYT (n???u c??)</td>
                          <td valign="top" class="s">
                            :
                          </td>
                          <td>{patient.medicalInsuranceCode}</td>
                        </tr>
                        <tr>
                          <td valign="top">T??n b???nh</td>
                          <td valign="top" class="s">
                            :
                          </td>
                          <td>{patientHospitalizedProfile.diseaseName}</td>
                        </tr>
                        <tr>
                          <td valign="top">M?? t???</td>
                          <td valign="top" class="s">
                            :
                          </td>
                          <td>{patientHospitalizedProfile.description}</td>
                        </tr>
                      </tbody>
                    </table>
                  </center>
                </div>
              </div>

              <div id="d_ck_2002" class="presc-ck"></div>

              <div style={style7}>
                <h2>L???ch s??? kh??m b???nh</h2>
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
                        <th style={style4}>Ng??y</th>
                        <th style={style4}>M?? ????n thu???c</th>
                        <th style={style4}>M?? phi???u kh??m</th>
                        <th>Ch???n ??o??n</th>
                        <th>L???i d???n</th>
                        <th style={style11}>Ng??y t??i kh??m</th>
                      </tr>
                      <PatientPrescriptionView
                        patientProfile={patientHospitalizedProfile}
                      />
                    </tbody>
                  </table>
                </div>
              </div>

              <div style={style5}>
                <h2>Phi???u ch??? ?????nh</h2>
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
                        <th style={style4}>Ng??y</th>
                        <th style={style4}>M?? phi???u ch??? ?????nh</th>
                        <th style={style4}>M?? phi???u kh??m</th>
                        <th>M?? t??? ch??? ?????nh</th>
                        <th style={style4}>Tr???ng th??i</th>
                      </tr>
                      <LabOrderFormsView
                        patientProfile={patientHospitalizedProfile}
                      />
                    </tbody>
                  </table>
                </div>
              </div>

              <div style={style7}>
                <h2>Phi???u x??t nghi???m</h2>
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
                        <th style={style4}>Ng??y</th>
                        <th style={style4}>T??n x??t nghi???m</th>
                        <th>M?? t???</th>
                        <th>Tr???ng th??i</th>
                        <th>???nh (n???u c??)</th>
                        <th>K???t qu???</th>
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
          setOpenSuccessModal={setOpenSuccessModal}
          setOpenErrorModal={setOpenErrorModal}
          setNotificationMessage={setNotificationMessage}
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
        <ViewImageModal
          modal={viewImageModal}
          onClose={setViewImageModal}
          file={currentFile}
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
          K?? ????n
        </Button>
        <Button
          color="primary"
          variant="contained"
          shape="square"
          size="sm"
          sx={{ mt: 3, ml: 1 }}
          onClick={() => setLabOrderFormModal(!labOrderFormModal)}
        >
          T???o phi???u ch??? ?????nh
        </Button>
        <Button
          color="primary"
          variant="contained"
          shape="square"
          size="sm"
          sx={{ mt: 3, ml: 1 }}
          onClick={() => closeModal()}
        >
          THO??T
        </Button>
      </CModalFooter>
    </CModal>
  );
};

export default DetailedPatientHospitalizedProfileModal;
