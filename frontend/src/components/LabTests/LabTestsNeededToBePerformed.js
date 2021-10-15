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
import Typography from "@mui/material/Typography";

import ArticleIcon from "@mui/icons-material/Article";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import labtestService from "src/services/labtest/labtest.service";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import EditLabTestModal from "./EditLabTestModal";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const LabTestsNeededToBePerformed = ({ status }) => {
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
  const [labTest, setLabTest] = useState("");
  const [labTests, setLabTests] = useState([]);
  const [doctorVisitingForm, setDoctorVisitingForm] = useState("");
  const [details, setDetails] = useState([]);
  const [createModal, setCreateModal] = useState(false);
  const [id, setId] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [labTestModal, setLabTestModal] = useState(false);

  const [paymentModal, setPaymentModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [doctorVisitingFormModal, setDoctorVisitingFormModal] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = React.useState(false);
  const [openErrorModal, setOpenErrorModal] = React.useState(false);
  const [detailedModal, setDetailedModal] = React.useState(false);
  const [patient, setPatient] = useState(constPatient);

  const handleCloseSuccessModal = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSuccessModal(false);
  };

  const toggleAddElementToTheEndOfAQueue = (row, index) => {
    labtestService.movetoend(row.id).then(
      (response) => {
        var arr = [...labTests];
        var removeIndex = index;
        ~removeIndex && arr.splice(removeIndex, 1);
        arr.push(row);
        for (var i = 0; i < arr.length; i++) {
          arr[i].index = i + 1;
        }
        setLabTests(arr);
        setOpenSuccessModal(true);
        setNotificationMessage("Xếp sau phiếu xét nghiệm thành công");
      },
      (error) => {
        console.log(error);
        setOpenErrorModal(true);
        setNotificationMessage("Xếp sau phiếu xét nghiệm không thành công");
      }
    );
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

  const toggleDelete = (row) => {
    setDeleteModal(!deleteModal);
    setId(row.id);
  };

  const retrieveAll = () => {
    labtestService
      .getByStatus(status)
      .then((response) => {
        console.log("really");
        console.log(response.data);
        setLabTests(response.data);
      })
      .catch((e) => {
        setLabTests([]);
        console.log(e);
      });
  };

  useEffect(retrieveAll, [!labTests]);

  const fields = [
    {
      key: "index",
      label: "STT",
      _style: { width: "1%" },
    },
    { key: "labOrderFormCode", label: "MÃ PHIẾU CHỈ ĐỊNH" },

    { key: "patientDetailedInformation", label: "THÔNG TIN BỆNH NHÂN" },
    { key: "medicalServiceName", label: "Tên xét nghiệm" },
    { key: "description", label: "MÔ TẢ" },
    { key: "doctorName", label: "Bác sĩ chỉ định" },
    { key: "statusDisplayed", label: "TRẠNG THÁI" },
    { key: "createdAt", label: "NGÀY TẠO" },
    {
      key: "edit",
      label: "CẬP NHẬT",
      _style: { width: "2%" },
      sorter: false,
      filter: false,
    },
    // {
    //   key: "print",
    //   label: "IN",
    //   _style: { width: "3%" },
    //   sorter: false,
    //   filter: false,
    // },
    {
      key: "movetoend",
      label: "XẾP SAU",
      _style: { width: "3%" },
      sorter: false,
      filter: false,
    },
  ];

  const rowsPerPageOption = {
    label: "Số bản ghi trên trang",
    values: [5, 10, 20],
  };

  const toggleEdit = (row, index) => {
    if (index > 0) {
      labtestService.movetobeginning(row.id).then(
        (response) => {
          var arr = [...labTests];
          var removeIndex = index;
          ~removeIndex && arr.splice(removeIndex, 1);
          const newArray = [row].concat(arr); // [ 4, 3, 2, 1 ]
          for (var i = 0; i < arr.length; i++) {
            newArray[i].index = i + 1;
          }
          setLabTests(newArray);
          setOpenSuccessModal(true);
          setNotificationMessage("Xếp phiếu xét nghiệm lên đầu thành công");
        },
        (error) => {
          console.log(error);
          setOpenErrorModal(true);
          setNotificationMessage(
            "Xếp sau phiếu xét nghiệm lên đầu không thành công"
          );
        }
      );
    }
    setPatient(row.patientInformation);
    setId(row.id);
    // setLabTests(row.labTests);
    setLabTest(row);
    setLabTestModal(!labTestModal);
  };

  const handleChangeStatus = (event) => {
    // setStatus(event.target.value);
  };

  return (
    <>
      <CDataTable
        items={labTests}
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
          edit: (row, index) => {
            return (
              <td className="py-2">
                <Icon.PencilSquare
                  name="cilpencil"
                  size="22"
                  style={cursorPointerStyle}
                  onClick={() => toggleEdit(row, index)}
                />
              </td>
            );
          },
          // print: (row) => {
          //   return (
          //     <td className="py-2">
          //       <Icon.Printer
          //         size="23"
          //         style={cursorPointerStyle}
          //         onClick={() => {
          //           window.open("/laborderform/" + row.id);
          //         }}
          //       />
          //     </td>
          //   );
          // },
          movetoend: (row, index) => {
            return (
              <td className="py-2">
                <ArrowDownwardIcon
                  fontSize="small"
                  style={cursorPointerStyle}
                  onClick={() => {
                    toggleAddElementToTheEndOfAQueue(row, index);
                  }}
                />
              </td>
            );
          },
        }}
      ></CDataTable>
      <Typography component="h5" align="left">
        Tổng số xét nghiệm cần thực hiện: {labTests.length}
      </Typography>
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
      <EditLabTestModal
        patient={patient}
        modal={labTestModal}
        onClose={setLabTestModal}
        labTest={labTest}
        labTests={labTests}
        setLabTests={setLabTests}
        setOpenSuccessModal={setOpenSuccessModal}
        setOpenErrorModal={setOpenErrorModal}
        setNotificationMessage={setNotificationMessage}
      />
    </>
  );
};

export default LabTestsNeededToBePerformed;
