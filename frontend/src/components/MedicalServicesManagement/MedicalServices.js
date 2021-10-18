import React, { useState, useEffect } from "react";
import * as Icon from "react-bootstrap-icons";
import CIcon from "@coreui/icons-react";
// import authService from "../../services/authentication/auth.service";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CButton,
  CDropdownItem as option,
  CCollapse,
} from "@coreui/react";
import DeleteMedicalServiceModal from "./DeleteMedicalServiceModal";
import MedicalServiceCreateOrEditModal from "./MedicalServiceCreateOrEditModal";
import medicalService from "src/services/medicalservice/medical.service";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const MedicalServiceGroups = () => {
  const constGroup = {
    name: "",
    description: null,
    id: "",
  };

  const rowsPerPageOption = {
    label: "Số bản ghi trên trang",
    values: [5, 10, 20],
  };
  const [medicalServices, setMedicalServices] = useState([]);
  const [medicalServiceElement, setMedicalServiceElement] =
    useState(constGroup);
  const [id, setId] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = React.useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [openErrorModal, setOpenErrorModal] = React.useState(false);

  // modal
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  const handleClose = (event, reason) => {
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

  const retrieveGroups = () => {
    medicalService
      .getAllMedicalServices()
      .then((response) => {
        console.log(response.data);
        setMedicalServices(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(retrieveGroups, []);

  const fields = [
    {
      key: "name",
      label: "TÊN",
      _style: { width: "8%" },
    },
    { key: "description", label: "MÔ TẢ" },
    { key: "groupName", label: "NHÓM CHỈ ĐỊNH" },
    { key: "amountDisplayed", label: "GIÁ TIỀN" },
    { key: "createdAt", label: "NGÀY TẠO" },
    {
      key: "edit",
      label: "SỬA",
      _style: { width: "1%" },
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

  const cursorPointerStyle = {
    cursor: "pointer",
  };

  const openDeleteModal = (item) => {
    setMedicalServiceElement(item);
    setDeleteModal(!deleteModal);
  };

  const openEditModal = (item) => {
    setIsEditing(true);
    setMedicalServiceElement(item);
    setEditModal(!editModal);
  };

  const openCreate = (item) => {
    setMedicalServiceElement(constGroup);
    setIsEditing(false);
    setEditModal(!editModal);
  };

  return (
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>Danh sách xét nghiệm</CCardHeader>
          <div col="2" class="mb-3 mb-xl-0 col-sm-4 col-md-2 ">
            <CButton
              class="btn btn-primary btn-block"
              type="button"
              onClick={() => openCreate()}
            >
              Thêm mới
            </CButton>
          </div>
          <CCardBody>
            <CDataTable
              items={medicalServices}
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
                edit: (item) => {
                  return (
                    <td className="py-2">
                      <Icon.PencilSquare
                        size="25"
                        style={cursorPointerStyle}
                        onClick={() => {
                          openEditModal(item);
                        }}
                      ></Icon.PencilSquare>
                    </td>
                  );
                },
                delete: (item) => {
                  return (
                    <td className="py-2">
                      <CIcon
                        name="cilTrash"
                        size="xl"
                        style={cursorPointerStyle}
                        onClick={() => {
                          openDeleteModal(item);
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
      <DeleteMedicalServiceModal
        modal={deleteModal}
        onClose={setDeleteModal}
        medicalServices={medicalServices}
        setMedicalServices={setMedicalServices}
        medicalServiceElement={medicalServiceElement}
        isEditing={isEditing}
        setOpenSuccessModal={setOpenSuccessModal}
        setOpenErrorModal={setOpenErrorModal}
        setNotificationMessage={setNotificationMessage}
      />

      <MedicalServiceCreateOrEditModal
        modal={editModal}
        onClose={setEditModal}
        medicalServices={medicalServices}
        setMedicalServices={setMedicalServices}
        medicalServiceElement={medicalServiceElement}
        isEditing={isEditing}
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
    </CRow>
  );
};

export default MedicalServiceGroups;
