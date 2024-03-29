import React, { useState, useEffect } from "react";
import patientdoctorvisitingformService from "src/services/patientdoctorvisitingform/patientdoctorvisitingform.service";
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

import * as Icon from "react-bootstrap-icons";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";

import CreateOrEditHospitalizedProfileModal from "../PatientHospitalizedProfile";
import PatientProfileModal from "./PatientProfileModal";
import DetailedPatientHospitalizedProfileModal from "../PatientHospitalizedProfile/DetailedPatientHospitalizedProfileModal";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArticleIcon from "@mui/icons-material/Article";
import EditDoctorVisitingFormModal from "../DoctorVisitingFormsForReceptionist/EditDoctorVisitingFormModal";

// import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const DoctorVisitingFormsForDoctor = () => {
  const [doctorVisitingForms, setDoctorVisitingForms] = useState([]);
  const [details, setDetails] = useState([]);
  const [createModal, setCreateModal] = useState(false);
  const [id, setId] = useState("");
  const [openSuccessModal, setOpenSuccessModal] = React.useState(false);
  const [openErrorModal, setOpenErrorModal] = React.useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

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

  const [doctorVisitingForm, setDoctorVisitingForm] = useState("");
  const [doctorVisitingFormModal, setDoctorVisitingFormModal] = useState(false);

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

  const handleCloseDoctorVisitingFormModal = () =>
    setDoctorVisitingFormModal(false);

  const toggleCreateHospitalizedProfile = (row, index) => {
    if (index > 0) {
      setOpenErrorModal(true);
      setNotificationMessage("Bạn cần khám cho bệnh nhân đầu tiên");
      return;
    }
    if (index === 0 && row.visitingStatus === 1) {
      patientdoctorvisitingformService
        .edit(row.id, row.code, row.description, row.doctorId, true)
        .then(
          (response) => {
            let updatedForm = response.data;
            var oldIndex = doctorVisitingForms
              .map((item) => item.visitingStatus)
              .indexOf(2);
            var updateIndex = doctorVisitingForms
              .map((item) => item.id)
              .indexOf(row.id);

            var a = [...doctorVisitingForms];
            a[updateIndex] = updatedForm;
            // a[oldIndex].visitingStatus = 1;
            // a[oldIndex].visitingStatusDisplayed = "Đang chờ khám";
            for (let i = 0; i < a.length; i++) {
              if (updateIndex !== i && a[i].visitingStatus === 2) {
                a[i].visitingStatus = 1;
                a[i].visitingStatusDisplayed = "Đang chờ khám";
              }
              a[i].index = i + 1;
            }
            for (let i = 0; i < a.length; i++) {
              a[i].index = i + 1;
            }
            setDoctorVisitingForms(a);
            setOpenSuccessModal(true);
            setNotificationMessage(
              "Tiếp nhận bệnh nhân " + row.patientInformation.fullName
            );
            //   window.location.reload();
          },
          (error) => {
            setOpenErrorModal(true);
            console.log(error);
            setNotificationMessage("Chưa thể tiếp nhận bệnh nhân");
          }
        );
    }
    setId(row.id);
    setPatient(row.patientInformation);
    setHospitalizedProfile(row);
    setHospitalizedModal(!hospitalizedModal);
  };

  const toggleView = (row) => {
    // setIsEditing(false);
    setDoctorVisitingForm(row);
    setPatient(row.patientInformation);
    setDoctorVisitingFormModal(!doctorVisitingFormModal);
  };

  const toggleAddAnElementToTheEndOfAQueue = (row, index) => {
    if (doctorVisitingForms.length <= 1) {
      setOpenErrorModal(true);
      setNotificationMessage(
        "Không thể xếp xuống cuối do danh sách chỉ có 1 phiếu khám"
      );
      return;
    }
    patientdoctorvisitingformService.movetoend(row.id).then(
      (response) => {
        var arr = [...doctorVisitingForms];
        var removeIndex = index;
        ~removeIndex && arr.splice(removeIndex, 1);
        arr.push(row);
        for (var i = 0; i < arr.length; i++) {
          arr[i].index = i + 1;
        }
        setDoctorVisitingForms(arr);
        setOpenSuccessModal(true);
        setNotificationMessage("Xếp sau bệnh nhân thành công");
      },
      (error) => {
        console.log(error);
        setOpenErrorModal(true);
        setNotificationMessage("Xếp sau bệnh nhân không thành công");
      }
    );
  };

  const toggleAddAnElementToTheBeginningOfAQueue = (row, index) => {
    if (doctorVisitingForms.length <= 1) {
      setOpenErrorModal(true);
      setNotificationMessage(
        "Không thể xếp lên đầu do danh sách chỉ có 1 phiếu khám"
      );
      return;
    }
    patientdoctorvisitingformService.movetobeginning(row.id).then(
      (response) => {
        var arr = [...doctorVisitingForms];
        var removeIndex = index;
        ~removeIndex && arr.splice(removeIndex, 1);
        arr = [row].concat(arr);
        for (var i = 0; i < arr.length; i++) {
          arr[i].index = i + 1;
        }
        setDoctorVisitingForms(arr);
        setOpenSuccessModal(true);
        setNotificationMessage("Xếp bệnh nhân lên đầu thành công");
      },
      (error) => {
        console.log(error);
        setOpenErrorModal(true);
        setNotificationMessage("Xếp bệnh nhân lên đầu không thành công");
      }
    );
  };

  const toggleOpenPatientProfileModal = (row, index) => {
    if (index > 0) {
      setOpenErrorModal(true);
      setNotificationMessage("Bạn cần khám cho bệnh nhân đầu tiên");
      return;
    }
    if (row.visitingStatus === 1) {
      patientdoctorvisitingformService
        .edit(row.id, row.code, row.description, row.doctorId, true)
        .then(
          (response) => {
            let updatedForm = response.data;
            var updateIndex = doctorVisitingForms
              .map((item) => item.id)
              .indexOf(row.id);
            var a = [...doctorVisitingForms];
            a[updateIndex] = updatedForm;
            for (let i = 0; i < a.length; i++) {
              if (updateIndex !== i && a[i].visitingStatus === 2) {
                a[i].visitingStatus = 1;
                a[i].visitingStatusDisplayed = "Đang chờ khám";
              }
              a[i].index = i + 1;
            }
            setDoctorVisitingForms(a);
            setOpenSuccessModal(true);
            setNotificationMessage(
              "Tiếp nhận bệnh nhân " + row.patientInformation.fullName
            );
          },
          (error) => {
            setOpenErrorModal(true);
            console.log(error);
            setNotificationMessage("Chưa thể tiếp nhận bệnh nhân");
          }
        );
    }
    setId(row.id);
    setClinic(row.clinicInformation);
    setPatientProfileModal(!patientProfileModal);
    setPatient(row.patientInformation);
  };
  const handleCloseHospitalizedProfileModal = () => setHospitalizedModal(false);

  const retrieveAll = () => {
    patientdoctorvisitingformService
      .getByRole()
      .then((response) => {
        var result = response.data;
        for (let index = 0; index < result.length; index++) {
          const element = result[index];
          element.index = index + 1;
        }
        setDoctorVisitingForms(response.data);
      })
      .catch((e) => {
        setDoctorVisitingForms([]);
        console.log(e);
      });
  };

  useEffect(retrieveAll, []);

  const fields = [
    { key: "index", label: "STT", _style: { width: "1%" } },
    { key: "code", label: "MÃ PHIẾU KHÁM", _style: { width: "8%" } },
    { key: "patientDetailedInformation", label: "TÊN BỆNH NHÂN" },
    { key: "description", label: "LÝ DO KHÁM" },
    { key: "visitingStatusDisplayed", label: "TRẠNG THÁI" },
    { key: "updatedAt", label: "GIỜ CẬP NHẬT" },
    {
      key: "view",
      label: "XEM",
      _style: { width: "1%" },
      sorter: false,
      filter: false,
    },
    {
      key: "doctorvisitingform",
      label: "HỒ SƠ BỆNH NHÂN",
      _style: { width: "3%" },
      sorter: false,
      filter: false,
    },
    {
      key: "createhospitalizedprofile",
      label: "TẠO HỒ SƠ Y TẾ",
      _style: { width: "3%" },
      sorter: false,
      filter: false,
    },
    {
      key: "movetoend",
      label: "XẾP SAU CÙNG",
      _style: { width: "1%" },
      sorter: false,
      filter: false,
    },
    {
      key: "movetobeginning",
      label: "XẾP ĐẦU TIÊN",
      _style: { width: "1%" },
      sorter: false,
      filter: false,
    },
  ];

  const rowsPerPageOption = {
    label: "Số bản ghi trên trang",
    values: [5, 10, 20],
  };

  return (
    <>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>Danh sách cần khám</CCardHeader>
            <CCardBody>
              <CDataTable
                items={doctorVisitingForms}
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
                          size="23"
                          style={cursorPointerStyle}
                          onClick={() => {
                            toggleView(row);

                            // window.open("/doctorvisitingform/" + row.id);
                          }}
                        />
                      </td>
                    );
                  },
                  doctorvisitingform: (row, index) => {
                    return (
                      <td className="py-2">
                        <Icon.PersonBadge
                          name="cilpencil"
                          size="22"
                          style={cursorPointerStyle}
                          onClick={() => {
                            toggleOpenPatientProfileModal(row, index);
                          }}
                        />
                      </td>
                    );
                  },
                  createhospitalizedprofile: (row, index) => {
                    return (
                      <td className="py-2">
                        <Icon.PencilSquare
                          name="cilpencil"
                          size="22"
                          style={cursorPointerStyle}
                          onClick={() =>
                            toggleCreateHospitalizedProfile(row, index)
                          }
                        />
                      </td>
                    );
                  },
                  movetoend: (row, index) => {
                    return (
                      <td className="py-2">
                        <ArrowDownwardIcon
                          fontSize="small"
                          style={cursorPointerStyle}
                          onClick={() => {
                            toggleAddAnElementToTheEndOfAQueue(row, index);
                          }}
                        />
                      </td>
                    );
                  },
                  movetobeginning: (row, index) => {
                    return (
                      <td className="py-2">
                        <ArrowUpwardIcon
                          fontSize="small"
                          style={cursorPointerStyle}
                          onClick={() => {
                            toggleAddAnElementToTheBeginningOfAQueue(
                              row,
                              index
                            );
                          }}
                        />
                      </td>
                    );
                  },
                }}
              ></CDataTable>
              <Typography component="h5" align="left">
                Tổng số bệnh nhân đang chờ khám: {doctorVisitingForms.length}
              </Typography>
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
      <CreateOrEditHospitalizedProfileModal
        open={hospitalizedModal}
        onClose={handleCloseHospitalizedProfileModal}
        patient={patient}
        hospitalizedProfile={hospitalizedProfile}
        setOpenSuccessModal={setOpenSuccessModal}
        setOpenErrorModal={setOpenErrorModal}
        setNotificationMessage={setNotificationMessage}
        isEditing={false}
        detailedPatientHospitalizedProfileModal={
          detailedPatientHospitalizedProfileModal
        }
        setDetailedPatientHospitalizedProfileModal={
          setDetailedPatientHospitalizedProfileModal
        }
        setHospitalizedProfileId={setPatientHospitalizedProfileId}
      />
      <EditDoctorVisitingFormModal
        open={doctorVisitingFormModal}
        onClose={handleCloseDoctorVisitingFormModal}
        patient={patient}
        doctorVisitingForm={doctorVisitingForm}
        // doctorVisitingForms={doctorVisitingForms}
        // setDoctorVisitingForms={setDoctorVisitingForms}
        setOpenSuccessModal={setOpenSuccessModal}
        setOpenErrorModal={setOpenErrorModal}
        setNotificationMessage={setNotificationMessage}
        isEditing={false}
      />
      <PatientProfileModal
        modal={patientProfileModal}
        onClose={setPatientProfileModal}
        patient={patient}
        clinic={clinic}
        detailedPatientHospitalizedProfileModal={
          detailedPatientHospitalizedProfileModal
        }
        setDetailedPatientHospitalizedProfileModal={
          setDetailedPatientHospitalizedProfileModal
        }
        setPatientHospitalizedProfileId={setPatientHospitalizedProfileId}
      />
      <DetailedPatientHospitalizedProfileModal
        modal={detailedPatientHospitalizedProfileModal}
        onClose={setDetailedPatientHospitalizedProfileModal}
        patient={patient}
        clinic={clinic}
        patientHospitalizedProfileId={patientHospitalizedProfileId}
        patientDoctorVisitingFormId={id}
        setOpenSuccessModal={setOpenSuccessModal}
        setOpenErrorModal={setOpenErrorModal}
        setNotificationMessage={setNotificationMessage}
      />
    </>
  );
};

export default DoctorVisitingFormsForDoctor;
