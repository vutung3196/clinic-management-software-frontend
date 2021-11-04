import React, { useState, useEffect } from "react";
import hospitalizedprofileService from "src/services/hospitalizedprofile/hospitalizedprofile.service";

import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CButton,
  CCollapse,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

import * as Icon from "react-bootstrap-icons";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import ReadOnlyDetailedPatientHospitalizedProfileModal from "./ReadOnlyDetailedPatientHospitalizedProfileModal";
import ArticleIcon from "@mui/icons-material/Article";
import EditHospitalizedProfileModal from "./EditHospitalizedProfileModal";
import PatientHospitalizedProfileDeleteModal from "./PatientHospitalizedProfileDeleteModal";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const PatientHospitalizedProfiles = () => {
  const [patientHospitalizedProfiles, setPatientHospitalizedProfiles] =
    useState([]);
  const [details, setDetails] = useState([]);
  const [createModal, setCreateModal] = useState(false);
  const [id, setId] = useState("");
  const [openSuccessModal, setOpenSuccessModal] = React.useState(false);
  const [openErrorModal, setOpenErrorModal] = React.useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [deleteModal, setDeleteModal] = React.useState(false);

  const [patientProfileModal, setPatientProfileModal] = useState(false);
  const [hospitalizedModal, setHospitalizedModal] = useState(false);

  const [hospitalizedProfile, setHospitalizedProfile] = React.useState("");
  const [patientHospitalizedProfileId, setPatientHospitalizedProfileId] =
    React.useState("");
  const [clinic, setClinic] = React.useState("");
  const [
    detailedPatientHospitalizedProfileModal,
    setDetailedPatientHospitalizedProfileModal,
  ] = React.useState(false);

  const handleCloseSuccessModal = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSuccessModal(false);
  };

  const handleCloseErrorModal = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenErrorModal(false);
  };

  const constPatient = {
    id: 1,
    fullName: "",
    emailAddress: "tungvu3196@gmail.com",
    phoneNumber: "31231231",
    occupation: null,
    gender: "Nữ",
    createdAt: "09/24/2021",
    updatedAt: null,
    addressDetail: "59/102",
    addressCity: "Hanoi",
    addressStreet: "Truong Chinh",
    addressDistrict: "Dong Da",
    dateOfBirth: "2021-10-04T09:00:53",
    dateOfBirthDetail: "10/04/2021",
    medicalInsuranceCode: "0312312313",
  };

  const cursorPointerStyle = {
    cursor: "pointer",
  };
  const [patient, setPatient] = useState(constPatient);

  const toggleEditHospitalizedProfile = (row, index) => {
    console.log("===============");
    console.log(row);
    setPatient(row.patientInformation);
    setHospitalizedProfile(row);
    setHospitalizedModal(!hospitalizedModal);
  };

  const handleCloseHospitalizedProfileModal = () => setHospitalizedModal(false);

  const retrieveAll = () => {
    hospitalizedprofileService
      .get()
      .then((response) => {
        var result = response.data;
        for (let index = 0; index < result.length; index++) {
          const element = result[index];
          element.index = index + 1;
        }
        setPatientHospitalizedProfiles(response.data);
      })
      .catch((e) => {
        setPatientHospitalizedProfiles([]);
        console.log(e);
      });
  };

  useEffect(retrieveAll, [!patientHospitalizedProfiles]);

  const fields = [
    { key: "code", label: "MÃ HỒ SƠ Y TẾ", _style: { width: "6%" } },
    { key: "patientDetailedInformation", label: "THÔNG TIN BỆNH NHÂN" },
    { key: "diseaseName", label: "TÊN BỆNH" },
    { key: "description", label: "MÔ TẢ" },
    { key: "createdAt", label: "NGÀY TẠO" },
    { key: "revisitDateDisplayed", label: "NGÀY TÁI KHÁM" },
    {
      key: "view",
      label: "XEM",
      _style: { width: "1%" },
      sorter: false,
      filter: false,
    },
    {
      key: "edit",
      label: "CẬP NHẬT",
      _style: { width: "3%" },
      sorter: false,
      filter: false,
    },
    // {
    //   key: "delete",
    //   label: "XÓA",
    //   _style: { width: "1%" },
    //   sorter: false,
    //   filter: false,
    // },
  ];

  const rowsPerPageOption = {
    label: "Số bản ghi trên trang",
    values: [5, 10, 20],
  };

  const toggleDelete = (id) => {
    setPatientHospitalizedProfileId(id);
    setDeleteModal(!deleteModal);
  };

  const toggleOpenHospitalizedProfile = (row, index) => {
    setDetailedPatientHospitalizedProfileModal(
      !detailedPatientHospitalizedProfileModal
    );
    // setId(row.id);
    setPatientHospitalizedProfileId(row.id);
    setClinic(row.clinicInformation);
    setPatientProfileModal(!patientProfileModal);
    setPatient(row.patientInformation);
  };

  return (
    <>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>Danh sách hồ sơ y tế</CCardHeader>
            <CCardBody>
              <CDataTable
                items={patientHospitalizedProfiles}
                fields={fields}
                columnFilter
                hover
                striped
                bordered
                size="sm"
                itemsPerPageSelect={rowsPerPageOption}
                itemsPerPage={10}
                sorter
                pagination
                scopedSlots={{
                  view: (row, index) => {
                    return (
                      <td className="py-2">
                        <ArticleIcon
                          style={cursorPointerStyle}
                          onClick={() => {
                            toggleOpenHospitalizedProfile(row, index);
                          }}
                        />
                      </td>
                    );
                  },
                  edit: (row, index) => {
                    return (
                      <td className="py-2">
                        <Icon.PencilSquare
                          name="cilpencil"
                          size="22"
                          style={cursorPointerStyle}
                          onClick={() =>
                            toggleEditHospitalizedProfile(row, index)
                          }
                        />
                      </td>
                    );
                  },
                  // delete: (row, index) => {
                  //   return (
                  //     <td className="py-2">
                  //       <CIcon
                  //         name="cilTrash"
                  //         size="xl"
                  //         style={cursorPointerStyle}
                  //         onClick={() => {
                  //           toggleDelete(row.id);
                  //         }}
                  //       />
                  //     </td>
                  //   );
                  // },
                }}
              ></CDataTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <Snackbar
        open={openSuccessModal}
        autoHideDuration={3000}
        onClose={handleCloseSuccessModal}
      >
        <Alert
          onClose={handleCloseSuccessModal}
          severity="success"
          sx={{ width: "100%" }}
        >
          {notificationMessage}
        </Alert>
      </Snackbar>
      <Snackbar
        open={openErrorModal}
        autoHideDuration={3000}
        onClose={handleCloseErrorModal}
      >
        <Alert
          onClose={handleCloseErrorModal}
          severity="error"
          sx={{ width: "100%" }}
        >
          {notificationMessage}
        </Alert>
      </Snackbar>
      <EditHospitalizedProfileModal
        open={hospitalizedModal}
        onClose={handleCloseHospitalizedProfileModal}
        patient={patient}
        patientHospitalizedProfile={hospitalizedProfile}
        patientHospitalizedProfiles={patientHospitalizedProfiles}
        setPatientHospitalizedProfiles={setPatientHospitalizedProfiles}
        setOpenSuccessModal={setOpenSuccessModal}
        setOpenErrorModal={setOpenErrorModal}
        setNotificationMessage={setNotificationMessage}
      />
      <ReadOnlyDetailedPatientHospitalizedProfileModal
        modal={detailedPatientHospitalizedProfileModal}
        onClose={setDetailedPatientHospitalizedProfileModal}
        patient={patient}
        clinic={clinic}
        patientHospitalizedProfileId={patientHospitalizedProfileId}
      />
      <PatientHospitalizedProfileDeleteModal
        modal={deleteModal}
        id={patientHospitalizedProfileId}
        onClose={setDeleteModal}
        patientHospitalizedProfiles={patientHospitalizedProfiles}
        setOpenSuccessModal={setOpenSuccessModal}
        setOpenErrorModal={setOpenErrorModal}
        setNotificationMessage={setNotificationMessage}
      />
    </>
  );
};

export default PatientHospitalizedProfiles;
