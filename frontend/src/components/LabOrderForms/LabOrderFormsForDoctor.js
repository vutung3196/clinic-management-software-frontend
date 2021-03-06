import React, { useState, useEffect } from "react";
import laborderformService from "src/services/laborderform/laborderform.service";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
} from "@coreui/react";

import * as Icon from "react-bootstrap-icons";
import ArticleIcon from "@mui/icons-material/Article";
import SingleLabOrderFormModal from "./SingleLabOrderFormModal";
import CIcon from "@coreui/icons-react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import LabOrderFormDeleteModal from "./LabOrderFormDeleteModal";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const LabOrderFormsForDoctor = () => {
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
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSuccessModal(false);
  };

  const toggleCreatePayment = (row) => {
    if (row.status === "???? thanh to??n") {
      setOpenErrorModal(true);
      setNotificationMessage("Phi???u ch??? ?????nh n??y ???? ???????c thanh to??n");
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
    if (row.status !== "Ch??a thanh to??n") {
      setOpenErrorModal(true);
      setNotificationMessage(
        "B???n ch??? ???????c ph??p h???y phi???u ch??? ?????nh ch??a thanh to??n"
      );
      return;
    }
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
      label: "M?? PHI???U CH??? ?????NH",
      _style: { width: "8%" },
    },
    { key: "patientDetailedInformation", label: "TH??NG TIN B???NH NH??N" },
    { key: "doctorName", label: "B??c s?? kh??m" },
    { key: "description", label: "M?? T???" },
    { key: "status", label: "TR???NG TH??I" },
    { key: "createdAt", label: "GI??? C???P NH???T" },
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
      key: "delete",
      label: "H???Y",
      _style: { width: "3%" },
      sorter: false,
      filter: false,
    },
  ];

  const rowsPerPageOption = {
    label: "S??? b???n ghi tr??n trang",
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
            <CCardHeader>Danh s??ch phi???u ch??? ?????nh</CCardHeader>
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
      <SingleLabOrderFormModal
        open={detailedModal}
        onClose={handleCloseDetailedModal}
        labTests={labTests}
        patient={patient}
        labOrderForm={labOrderForm}
      />
      <LabOrderFormDeleteModal
        modal={deleteModal}
        id={id}
        onClose={setDeleteModal}
        labOrderForms={labOrderForms}
        setOpenSuccessModal={setOpenSuccessModal}
        setOpenErrorModal={setOpenErrorModal}
        setNotificationMessage={setNotificationMessage}
      />
      <Snackbar
        open={openSuccessModal}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
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
    </>
  );
};

export default LabOrderFormsForDoctor;
