import React, { useState, useEffect } from "react";
import * as Icon from "react-bootstrap-icons";
import authService from "../../services/authentication/auth.service";
import clinicService from "src/services/clinicservice/clinic.service";
import "react-phone-number-input/style.css";
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import { useForm } from "react-hook-form";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import EditClinicModal from "./EditClinicModal";
import ViewImageModal from "../FilesUpload/ViewImageModal";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const InformationManagement = () => {
  const [viewImageModal, setViewImageModal] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = React.useState(false);
  const [openErrorModal, setOpenErrorModal] = React.useState(false);
  const [notificationMessage, setNotificationMessage] = React.useState("");
  const [clinic, setClinic] = React.useState("");
  const [editModal, setEditModal] = React.useState(false);
  const [file, setFile] = React.useState("");

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

  const handleCreate = () => {};

  const { register, handleSubmit, errors, formState } = useForm({
    mode: "all",
  });

  const retrieveClinicInformation = () => {
    var currentUser = authService.getCurrentUser();
    console.log("=====");
    console.log(currentUser);
    clinicService
      .getClinicInformation(currentUser.clinicId)
      .then((response) => {
        var clinic = response.data;
        setClinic(clinic);
        setFile(clinic.imageFile);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    retrieveClinicInformation();
  }, []);
  return (
    <div className="">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="9" lg="7" xl="6">
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Thông tin phòng khám</h1>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>Tên phòng khám</CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type="text"
                      placeholder="Username"
                      autoComplete="username"
                      value={clinic.name}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>Email</CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type="text"
                      placeholder="Email"
                      autoComplete="email"
                      value={clinic.emailAddress}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>Số điện thoại</CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput value={clinic.phoneNumber} />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupPrepend>
                      <CInputGroupText>Địa chỉ</CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput value={clinic.addressDetailInformation} />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>Logo</CInputGroupText>
                      <Icon.Image
                        size="18"
                        class="icon-cursor image-element new-image"
                        onClick={() => {
                          setViewImageModal(!viewImageModal);
                        }}
                      />
                    </CInputGroupPrepend>
                  </CInputGroup>
                  <CButton
                    color="success"
                    onClick={() => setEditModal(!editModal)}
                  >
                    Cập nhật thông tin
                  </CButton>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
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
          <EditClinicModal
            modal={editModal}
            onClose={setEditModal}
            clinic={clinic}
            setClinic={setClinic}
            setOpenSuccessModal={setOpenSuccessModal}
            setOpenErrorModal={setOpenErrorModal}
            setNotificationMessage={setNotificationMessage}
            file={file}
            setFile={setFile}
          />
          <ViewImageModal
            modal={viewImageModal}
            onClose={setViewImageModal}
            file={file}
          />
        </CRow>
      </CContainer>
    </div>
  );
};

export default InformationManagement;
