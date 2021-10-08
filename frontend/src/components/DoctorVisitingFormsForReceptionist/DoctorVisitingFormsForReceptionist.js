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

import CIcon from "@coreui/icons-react";
import * as Icon from "react-bootstrap-icons";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import EditDoctorVisitingFormModal from "./EditDoctorVisitingFormModal";
import DoctorVisitingFormDeleteModal from "./DoctorVisitingFormDeleteModal";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const DoctorVisitingFormsForReceptionist = () => {
  const [doctorVisitingForms, setDoctorVisitingForms] = useState([]);
  const [doctorVisitingForm, setDoctorVisitingForm] = useState("");
  const [details, setDetails] = useState([]);
  const [createModal, setCreateModal] = useState(false);
  const [id, setId] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const [detailedModal, setDetailedModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [doctorVisitingFormModal, setDoctorVisitingFormModal] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = React.useState(false);
  const [openErrorModal, setOpenErrorModal] = React.useState(false);

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

  const toggleEdit = (row) => {
    setDoctorVisitingForm(row);
    setDoctorVisitingFormModal(!doctorVisitingFormModal);
  };

  const toggleDelete = (row) => {
    setDeleteModal(!deleteModal);
    setId(row.id);
  };

  const handleCloseDoctorVisitingFormModal = () =>
    setDoctorVisitingFormModal(false);

  const retrieveAll = () => {
    patientdoctorvisitingformService
      .getByRole()
      .then((response) => {
        setDoctorVisitingForms(response.data);
      })
      .catch((e) => {
        setDoctorVisitingForms([]);
        console.log(e);
      });
  };

  useEffect(retrieveAll, []);

  const fields = [
    { key: "code", label: "MÃ PHIẾU KHÁM", _style: { width: "8%" } },
    { key: "patientDetailedInformation", label: "TÊN BỆNH NHÂN" },
    { key: "description", label: "MÔ TẢ" },
    { key: "visitingStatusDisplayed", label: "TRẠNG THÁI" },
    { key: "updatedAt", label: "GIỜ CẬP NHẬT" },
    {
      key: "view",
      label: "XEM",
      _style: { width: "5%" },
      sorter: false,
      filter: false,
    },
    {
      key: "edit",
      label: "CHỈNH SỬA",
      _style: { width: "5%" },
      sorter: false,
      filter: false,
    },
    {
      key: "delete",
      label: "XÓA",
      _style: { width: "1%" },
      sorter: false,
      filter: false,
    },
  ];

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
                itemsPerPageSelect
                itemsPerPage={10}
                sorter
                pagination
                scopedSlots={{
                  view: (row) => {
                    return (
                      <td className="py-2">
                        <Icon.PersonBadge
                          name="cilpencil"
                          size="22"
                          style={cursorPointerStyle}
                          onClick={() => {
                            window.open("/doctorvisitingform/" + row.id);
                          }}
                        />
                      </td>
                    );
                  },
                  edit: (row) => {
                    return (
                      <td className="py-2">
                        <Icon.PencilSquare
                          name="cilpencil"
                          size="22"
                          style={cursorPointerStyle}
                          onClick={() => toggleEdit(row)}
                        />
                      </td>
                    );
                  },
                  delete: (row) => {
                    return (
                      <td className="py-2">
                        <CIcon
                          name="cilTrash"
                          size="xl"
                          style={cursorPointerStyle}
                          onClick={() => {
                            toggleDelete(row);
                          }}
                        />
                      </td>
                    );
                  },
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
      <EditDoctorVisitingFormModal
        open={doctorVisitingFormModal}
        onClose={handleCloseDoctorVisitingFormModal}
        patient={patient}
        doctorVisitingForm={doctorVisitingForm}
        doctorVisitingForms={doctorVisitingForms}
        setDoctorVisitingForms={setDoctorVisitingForms}
        setOpenSuccessModal={setOpenSuccessModal}
        setOpenErrorModal={setOpenErrorModal}
        setNotificationMessage={setNotificationMessage}
        isEditing={true}
      />
      <DoctorVisitingFormDeleteModal
        modal={deleteModal}
        id={id}
        onClose={setDeleteModal}
        doctorVisitingForms={doctorVisitingForms}
      />
    </>
  );
};

export default DoctorVisitingFormsForReceptionist;