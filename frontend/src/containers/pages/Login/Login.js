import React, { useRef, useState } from "react";
import AuthService from "../../../services/authentication/auth.service";
import { Link } from "react-router-dom";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  CAlert,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { Helmet } from "react-helmet";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const Login = (props) => {
  const form = useRef();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState("");
  const [message, setMessage] = useState("");
  const [openSuccessModal, setOpenSuccessModal] = React.useState(false);
  const [openErrorModal, setOpenErrorModal] = React.useState(false);
  const [notificationMessage, setNotificationMessage] = React.useState("");

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
  const onChangeUsername = (event) => {
    const userName = event.target.value;
    setUsername(userName);
  };

  const onChangePassword = (event) => {
    const passWord = event.target.value;
    setPassword(passWord);
  };

  const handleLogin = (event) => {
    event.preventDefault();
    setMessage("");
    setLoading(true);
    console.log(username);
    console.log("====");
    console.log(password);
    AuthService.login(username, password).then(
      () => {
        setOpenErrorModal(true);
        setNotificationMessage("Đăng nhập thành công");
        props.history.push("/");
        window.location.reload();
      },
      (error) => {
        console.log(error);
        if (error.response.data !== undefined) {
          const resMessage = error.response.data;
          setOpenErrorModal(true);
          setNotificationMessage(resMessage);
          setLoading(false);
        }
      }
    );
  };
  console.log("This is the login component");
  console.log(AuthService.authenticated());

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <Helmet>
        <title>Phần mềm quản lý phòng khám</title>
      </Helmet>
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm ref={form} onSubmit={handleLogin}>
                    <h1>Đăng nhập</h1>
                    <p className="text-muted">
                      Đăng nhập vào tài khoản của bạn
                    </p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="text"
                        placeholder="Username"
                        autoComplete="username"
                        value={username}
                        onChange={onChangeUsername}
                        required
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        value={password}
                        onChange={onChangePassword}
                        required
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                        <CButton
                          color="primary"
                          className="px-4"
                          type="submit"
                          disabled={loading}
                        >
                          Login
                        </CButton>
                        {message && <CAlert color="danger">{message}</CAlert>}
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard
                className="text-white bg-primary py-5 d-md-down-none"
                style={{ width: "44%" }}
              >
                <CCardBody className="text-center">
                  <div>
                    <h2>CMS</h2>
                    <p>Clinic management software</p>
                    <Link to="/register">
                      <CButton
                        color="primary"
                        className="mt-3"
                        active
                        tabIndex={-1}
                      >
                        Đăng ký phòng khám lần đầu
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
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
        </CRow>
      </CContainer>
    </div>
    // </form>
  );
};

export default Login;
