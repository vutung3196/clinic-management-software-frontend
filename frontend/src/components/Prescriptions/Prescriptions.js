import React, { useState, useEffect } from "react";
import * as Icon from "react-bootstrap-icons";
import CIcon from "@coreui/icons-react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CButton,
  CDropdownItem as option,
} from "@coreui/react";
import prescriptionService from "src/services/prescription/prescription.service";
import ViewPrescriptionModal from "./ViewPrescriptionModal";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const Prescriptions = () => {
  const constGroup = {
    name: "",
    description: null,
    id: "",
  };

  const rowsPerPageOption = {
    label: "Số bản ghi trên trang",
    values: [5, 10, 20],
  };
  const [prescriptions, setPrescriptions] = useState([]);
  const [prescription, setPrescription] = useState(constGroup);
  const [patient, setPatient] = useState("");
  const [openSuccessModal, setOpenSuccessModal] = React.useState(false);
  const [openErrorModal, setOpenErrorModal] = React.useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

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

  // modal
  const [deleteModal, setDeleteModal] = useState(false);
  const [doctorName, setDoctorName] = useState("");
  const [viewModal, setViewModal] = useState(false);

  const retrievePrescriptions = () => {
    prescriptionService
      .getPrescriptions()
      .then((response) => {
        console.log(response.data);
        setPrescriptions(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(retrievePrescriptions, []);

  const fields = [
    {
      key: "code",
      label: "MÃ ĐƠN THUỐC",
      _style: { width: "8%" },
    },
    { key: "patientDetailedInformation", label: "THÔNG TIN BỆNH NHÂN" },
    { key: "doctorName", label: "BÁC SĨ KÊ ĐƠN" },
    { key: "diagnosedDescription", label: "CHẨN ĐOÁN" },
    { key: "doctorSuggestion", label: "LỜI DẶN" },
    { key: "revisitDateDisplayed", label: "NGÀY TÁI KHÁM" },
    { key: "createdAt", label: "NGÀY TẠO" },
    {
      key: "view",
      label: "XEM",
      _style: { width: "1%" },
      sorter: false,
      filter: false,
    },
    {
      key: "send",
      label: "GỬI EMAIL",
      _style: { width: "1%" },
      sorter: false,
      filter: false,
    },
    {
      key: "print",
      label: "IN",
      _style: { width: "1%" },
      sorter: false,
      filter: false,
    },
  ];

  const cursorPointerStyle = {
    cursor: "pointer",
  };

  const openViewModal = (item) => {
    setPrescription(item.prescription);
    setPatient(item.patientInformation);
    setDoctorName(item.doctorName);
    setViewModal(!viewModal);
  };

  const sendEmail = (item) => {
    if (
      item.patientInformation.emailAddress === undefined ||
      item.patientInformation.emailAddress === ""
    ) {
      setOpenErrorModal(true);
      setNotificationMessage("Bệnh nhân không có địa chỉ email");
      return;
    }
    prescriptionService.sendEmail(item.id).then(
      (response) => {
        setOpenSuccessModal(true);
        setNotificationMessage("Gửi đơn thuốc đến thư người dùng thành công");
      },
      (error) => {
        setOpenErrorModal(true);
        setNotificationMessage(
          "Gửi đơn thuốc đến thư người dùng không thành công"
        );
      }
    );
  };

  return (
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>Danh sách đơn thuốc</CCardHeader>
          <div col="2" class="mb-3 mb-xl-0 col-sm-4 col-md-2 "></div>
          <CCardBody>
            <CDataTable
              items={prescriptions}
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
                      <Icon.PencilSquare
                        size="25"
                        style={cursorPointerStyle}
                        onClick={() => {
                          openViewModal(row);
                        }}
                      ></Icon.PencilSquare>
                    </td>
                  );
                },
                send: (row) => {
                  return (
                    <td className="py-2">
                      <Icon.Mailbox2
                        size="25"
                        style={cursorPointerStyle}
                        onClick={() => {
                          sendEmail(row);
                        }}
                      ></Icon.Mailbox2>
                    </td>
                  );
                },
                print: (row) => {
                  return (
                    <td className="py-2">
                      <Icon.Printer
                        name="cilTrash"
                        size="23"
                        style={cursorPointerStyle}
                        onClick={() => {
                          window.open("/prescription/" + row.id);
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
      <ViewPrescriptionModal
        modal={viewModal}
        onClose={setViewModal}
        patient={patient}
        prescription={prescription}
        doctorName={doctorName}
      />
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
    </CRow>
  );
};

export default Prescriptions;
