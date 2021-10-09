import React, { useEffect, useState } from "react";
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
import hospitalizedprofileService from "src/services/hospitalizedprofile/hospitalizedprofile.service";
import DetailedPatientHospitalizedProfileModal from "../PatientHospitalizedProfile/DetailedPatientHospitalizedProfileModal";

const PatientProfileModal = ({
  modal,
  onClose,
  patient,
  clinic,
  detailedPatientHospitalizedProfileModal,
  setDetailedPatientHospitalizedProfileModal,
}) => {
  const [patientProfiles, setPatientProfiles] = useState([]);
  const [] = useState(false);

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

  const PatientPrescriptionView = (props) => {
    return props.patientProfiles !== undefined
      ? props.patientProfiles.map((entry) => (
          <tr>
            <td valign="top" align="center">
              {entry.createdAt}
            </td>
            <td valign="top" align="center">
              {entry.code}
            </td>
            <td>{entry.diseaseName}</td>
            <td>{entry.description}</td>
            <td valign="top" align="center">
              {entry.revisitDate}
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
        <CModalTitle>HỒ SƠ SỨC KHỎE </CModalTitle>
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
                  Hồ Sơ Sức Khỏe
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
                          <td valign="top">Địa chỉ</td>
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
                <h2>Danh sách hồ sơ y tế</h2>
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
                        <th style={style4}>Ngày tạo</th>
                        <th style={style4}>Mã hồ sơ</th>
                        <th>Tên bệnh</th>
                        <th>Mô tả</th>
                        <th style={style11}>Ngày tái khám</th>
                      </tr>
                      <PatientPrescriptionView
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
          THOÁT
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

export default PatientProfileModal;
