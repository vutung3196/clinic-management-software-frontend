import React, { useState } from "react";
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
import { Link } from "react-router-dom";
import ViewImageModal from "../FilesUpload/ViewImageModal";

const PatientProfileModal = ({ modal, onClose, patient, patientProfile }) => {
  console.log("modal is ");
  console.log(modal);
  console.log(onClose);
  console.log(patient);
  console.log("****************");
  console.log(patientProfile);
  const [viewImageModal, setViewImageModal] = useState(false);
  const [currentFile, setCurrentFile] = useState("");

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
    return props.patientProfile !== undefined &&
      props.patientProfile.patientPrescriptions !== undefined
      ? props.patientProfile.patientPrescriptions.map((entry) => (
          <tr>
            <td valign="top" align="center">
              {entry.createdAt}
            </td>
            <td valign="top" align="center">
              <Link
                to={{
                  pathname:
                    "/singleprescription/" + entry.id + "/" + patient.id,
                  id: entry.id,
                  patientId: patient.id,
                }}
                target="_blank"
              >
                {entry.patientPrescriptionCode}
              </Link>
            </td>
            <td>{entry.diagnosedDescription}</td>
            <td>{entry.doctorSuggestion}</td>
            <td valign="top" align="center">
              {entry.revisitDate}
            </td>
          </tr>
        ))
      : "";
  };

  const DiseaseStagesView = (props) => {
    return props.patientProfile !== undefined &&
      props.patientProfile.diseaseStages !== undefined
      ? props.patientProfile.diseaseStages.map((entry) => (
          <tr>
            <td valign="top" align="center">
              {entry.createdAt}
            </td>
            <td>
              <div>{entry.description}</div>
            </td>
          </tr>
        ))
      : "";
  };

  const showViewImageModal = (file) => {
    setCurrentFile(file);
    setViewImageModal(!viewImageModal);
  };

  const PatientFilesView = (props) => {
    return props.patientProfile !== undefined &&
      props.patientProfile.imageFiles !== undefined
      ? props.patientProfile.imageFiles.map((entry) => (
          <tr>
            <td valign="top" align="center">
              {entry.createdAt}
            </td>
            <td>{entry.name}</td>
            <td>{entry.description}</td>
            <td align="center">
              <Icon.Image
                class="icon-cursor"
                onClick={() => {
                  showViewImageModal(entry);
                }}
              />
            </td>
          </tr>
        ))
      : "";
  };

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
                  <p>Địa chỉ: Hùng Vương, Nam Định</p>
                  <p>Điện thoại: 1900 11111</p>
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
                          <td>Tuổi / Năm sinh</td>
                          <td class="s">:</td>
                          <td>
                            {patient.age} ({patient.yearOfBirth})
                          </td>
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
                          <td valign="top">Nghề nghiệp</td>
                          <td valign="top" class="s">
                            :
                          </td>
                          <td>{patient.occupation}</td>
                        </tr>
                      </tbody>
                    </table>
                  </center>
                </div>
              </div>
              <div style={style5}>
                <h2>Diễn tiến bệnh</h2>
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
                        <th>Nội dung</th>
                      </tr>
                      <DiseaseStagesView patientProfile={patientProfile} />
                    </tbody>
                  </table>
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
                        <th>Chẩn đoán</th>
                        <th>Lời dặn</th>
                        <th style={style11}>Ngày tái khám</th>
                      </tr>
                      <PatientPrescriptionView
                        patientProfile={patientProfile}
                      />
                    </tbody>
                  </table>
                </div>
              </div>

              <div style={style7}>
                <h2>File liên quan</h2>
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
                        <th style={style13}>Tiêu đề file</th>
                        <th>Ghi chú</th>
                        <th>Xem</th>
                      </tr>
                      <PatientFilesView patientProfile={patientProfile} />
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        <ViewImageModal
          modal={viewImageModal}
          onClose={setViewImageModal}
          file={currentFile}
        />
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
