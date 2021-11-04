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
import SingleLabOrderFormModal from "./SingleLabOrderFormModal";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const LabOrderFormsForReceptionist = () => {
  const [labOrderForms, setLabOrderForms] = useState([]);
  const [labOrderForm, setLabOrderForm] = useState([]);
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
  const [detailedModal, setDetailedModal] = React.useState(false);

  const handleClosePaymentModal = () => setPaymentModal(false);
  const handleCloseDetailedModal = () => setDetailedModal(false);

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

  const toggleCreatePayment = (row) => {
    if (row.status === "Đã thanh toán") {
      setOpenErrorModal(true);
      setNotificationMessage("Phiếu chỉ định này đã được thanh toán");
      return;
    }
    console.log("+++++");
    console.log(row);
    setPatient(row.patientInformation);
    setId(row.id);
    setLabTests(row.labTests);
    setLabOrderForm(row);
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
        console.log("really");
        console.log(response.data);
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
      label: "MÃ PHIẾU CHỈ ĐỊNH",
      _style: { width: "8%" },
    },
    { key: "patientDetailedInformation", label: "THÔNG TIN BỆNH NHÂN" },
    { key: "doctorName", label: "BÁC SĨ CHỈ ĐỊNH" },
    { key: "description", label: "MÔ TẢ" },
    { key: "status", label: "TRẠNG THÁI" },
    { key: "createdAt", label: "NGÀY TẠO" },
    {
      key: "view",
      label: "XEM",
      _style: { width: "2%" },
      sorter: false,
      filter: false,
    },
    {
      key: "print",
      label: "IN",
      _style: { width: "3%" },
      sorter: false,
      filter: false,
    },
    {
      key: "createPayment",
      label: "TẠO PHIẾU THU",
      _style: { width: "5%" },
      sorter: false,
      filter: false,
    },
  ];

  const rowsPerPageOption = {
    label: "Số bản ghi trên trang",
    values: [5, 10, 20],
  };

  const toggleView = (row) => {
    setPatient(row.patientInformation);
    setId(row.id);
    setLabTests(row.labTests);
    setLabOrderForm(row);
    setDetailedModal(true);
  };

  return (
    <>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>Danh sách phiếu chỉ định</CCardHeader>
            <CCardBody>
              <CDataTable
                items={labOrderForms}
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
                            toggleView(row);
                          }}
                        />
                      </td>
                    );
                  },
                  print: (row) => {
                    return (
                      <td className="py-2">
                        <Icon.Printer
                          size="23"
                          style={cursorPointerStyle}
                          onClick={() => {
                            window.open("/laborderform/" + row.id);
                          }}
                        />
                      </td>
                    );
                  },
                  createPayment: (row) => {
                    return (
                      <td className="py-2">
                        <Icon.PencilSquare
                          name="cilpencil"
                          size="22"
                          style={cursorPointerStyle}
                          onClick={() => toggleCreatePayment(row)}
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
      <CreatePaymentForLabOrderForm
        open={paymentModal}
        onClose={handleClosePaymentModal}
        patient={patient}
        labTests={labTests}
        labOrderForm={labOrderForm}
        labOrderForms={labOrderForms}
        setLabOrderForms={setLabOrderForms}
        setOpenSuccessModal={setOpenSuccessModal}
        setOpenErrorModal={setOpenErrorModal}
        setNotificationMessage={setNotificationMessage}
      />
      <SingleLabOrderFormModal
        open={detailedModal}
        onClose={handleCloseDetailedModal}
        labTests={labTests}
        patient={patient}
        labOrderForm={labOrderForm}
      />
      {/* 
      <DoctorVisitingFormDeleteModal
        modal={deleteModal}
        id={id}
        onClose={setDeleteModal}
        doctorVisitingForms={labOrderForm}
      />  */}
    </>
  );
};

export default LabOrderFormsForReceptionist;
