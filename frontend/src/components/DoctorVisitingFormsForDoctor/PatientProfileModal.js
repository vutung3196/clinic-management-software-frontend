import React, { useEffect, useState } from "react";
import {
  CModal,
  CButton,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
import hospitalizedprofileService from "src/services/hospitalizedprofile/hospitalizedprofile.service";

const PatientProfileModal = ({
  modal,
  onClose,
  patient,
  clinic,
  detailedPatientHospitalizedProfileModal,
  setDetailedPatientHospitalizedProfileModal,
  setPatientHospitalizedProfileId,
}) => {
  const [patientProfiles, setPatientProfiles] = useState([]);
  // const [] = useState(false);

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

  const style14 = {
    cursor: "pointer",
  };

  const openDetailedHospitalizedProfileModal = (profile) => {
    setDetailedPatientHospitalizedProfileModal(
      !detailedPatientHospitalizedProfileModal
    );
    setPatientHospitalizedProfileId(profile.id);
    onClose();
  };

  const PatientHospitalizedProfileView = (props) => {
    return props.patientProfiles !== undefined
      ? props.patientProfiles.map((entry) => (
          <tr>
            <td valign="top" align="center">
              {entry.createdAt}
            </td>
            <td
              id="td-link"
              valign="top"
              align="center"
              onClick={() => openDetailedHospitalizedProfileModal(entry)}
            >
              {entry.code}
            </td>
            <td>{entry.diseaseName}</td>
            <td>{entry.description}</td>
            <td valign="top" align="center">
              {entry.revisitDateDisplayed}
            </td>
          </tr>
        ))
      : "";
  };

  const retrieveAll = () => {
    hospitalizedprofileService
      .getByPatient(patient.id)
      .then((response) => {
        setPatientProfiles(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        setPatientProfiles([]);
        console.log(e);
      });
  };

  useEffect(retrieveAll, [modal]);

  return (
    <CModal show={modal} onClose={onClose} size="xl">
      <CModalHeader closeButton>
        <CModalTitle>H??? S?? S???C KH???E </CModalTitle>
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
                  H??? S?? S???c Kh???e
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
                      </tbody>
                    </table>
                  </center>
                </div>
              </div>
              <div id="d_ck_2002" class="presc-ck"></div>

              <div style={style7}>
                <h2>Danh s??ch h??? s?? y t???</h2>
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
                        <th style={style4}>Ng??y t???o</th>
                        <th style={style4}>M?? h??? s??</th>
                        <th>T??n b???nh</th>
                        <th>M?? t???</th>
                        <th style={style11}>Ng??y t??i kh??m</th>
                      </tr>
                      <PatientHospitalizedProfileView
                        patientProfiles={patientProfiles}
                      />
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => onClose(false)}>
          THO??T
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

export default PatientProfileModal;
