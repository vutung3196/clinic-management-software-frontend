import React, { useState, useEffect } from "react";
import laborderformService from "src/services/laborderform/laborderform.service";
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
import ArticleIcon from "@mui/icons-material/Article";
import CreatePaymentForLabOrderForm from "./CreatePaymentForLabOrderForm";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const LabOrderFormsForReceptionist = () => {
  const [labOrderForm, setLabOrderForms] = useState([]);
  const [doctorVisitingForm, setDoctorVisitingForm] = useState("");
  const [details, setDetails] = useState([]);
  const [createModal, setCreateModal] = useState(false);
  const [id, setId] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [labTests, setLabTests] = useState([]);

  const [paymentModal, setPaymentModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [doctorVisitingFormModal, setDoctorVisitingFormModal] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = React.useState(false);
  const [openErrorModal, setOpenErrorModal] = React.useState(false);

  const handleClosePaymentModal = () => setPaymentModal(false);

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

  const cursorPointerStyle = {
    cursor: "pointer",
  };
  const [patient, setPatient] = useState("");

  const toggleEdit = (row) => {
    setPatient(row.patientInformation);
    setDoctorVisitingForm(row);
    setLabTests(row.labTests);
    setPaymentModal(true);
  };

  const toggleDelete = (row) => {
    setDeleteModal(!deleteModal);
    setId(row.id);
  };

  const handleCloseDoctorVisitingFormModal = () =>
    setDoctorVisitingFormModal(false);

  const retrieveAll = () => {
    laborderformService
      .getByRole()
      .then((response) => {
        setLabOrderForms(response.data);
      })
      .catch((e) => {
        setLabOrderForms([]);
        console.log(e);
      });
  };

  useEffect(retrieveAll, []);

  const fields = [
    {
      key: "code",
      label: "MÃ PHIẾU KHÁM",
      _style: { width: "8%" },
    },
    { key: "patientDetailedInformation", label: "THÔNG TIN BỆNH NHÂN" },
    { key: "doctorName", label: "Bác sĩ khám" },
    { key: "description", label: "MÔ TẢ" },
    { key: "status", label: "TRẠNG THÁI" },
    { key: "createdAt", label: "GIỜ CẬP NHẬT" },
    {
      key: "view",
      label: "XEM",
      _style: { width: "5%" },
      sorter: false,
      filter: false,
    },
    {
      key: "edit",
      label: "Tạo phiếu thu",
      _style: { width: "5%" },
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

  return (
    <>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>Danh sách cần khám</CCardHeader>
            <CCardBody>
              <CDataTable
                items={labOrderForm}
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
                  view: (row) => {
                    return (
                      <td className="py-2">
                        <ArticleIcon
                          style={cursorPointerStyle}
                          onClick={() => {
                            window.open("/laborderform/" + row.id);
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
                  // delete: (row) => {
                  //   return (
                  //     <td className="py-2">
                  //       <CIcon
                  //         name="cilTrash"
                  //         size="xl"
                  //         style={cursorPointerStyle}
                  //         onClick={() => {
                  //           toggleDelete(row);
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
      <CreatePaymentForLabOrderForm
        open={paymentModal}
        onClose={handleClosePaymentModal}
        patient={patient}
        labTests={labTests}
      />
      {/* <EditDoctorVisitingFormModal
        open={doctorVisitingFormModal}
        onClose={handleCloseDoctorVisitingFormModal}
        patient={patient}
        doctorVisitingForm={doctorVisitingForm}
        doctorVisitingForms={labOrderForm}
        setDoctorVisitingForms={setLabOrderForms}
        setOpenSuccessModal={setOpenSuccessModal}
        setOpenErrorModal={setOpenErrorModal}
        setNotificationMessage={setNotificationMessage}
        isEditing={true}
      />
      <DoctorVisitingFormDeleteModal
        modal={deleteModal}
        id={id}
        onClose={setDeleteModal}
        doctorVisitingForms={labOrderForm}
      /> */}
    </>
  );
};

export default LabOrderFormsForReceptionist;
