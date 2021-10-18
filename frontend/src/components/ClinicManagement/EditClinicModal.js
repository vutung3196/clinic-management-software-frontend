import React, { useState, useEffect } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CContainer,
  CFormGroup,
  CForm,
  CInput as textarea,
  CInputGroup as CFormControl,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  CCardHeader,
  CModal,
  CModalHeader,
  CModalBody,
  CModalTitle,
  CLabel as h4,
  CModalFooter,
  CInputGroup,
  CInput,
  CDropdown,
  CLabel,
  CAlert,
} from "@coreui/react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import clinicService from "src/services/clinicservice/clinic.service";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

const EditClinicModal = ({
  modal,
  onClose,
  clinics,
  setClinics,
  clinic,
  isEditing,
}) => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [enabled, setEnabled] = useState(false);
  const [messages, setMessages] = useState([]);

  const { register, handleSubmit, errors, formState } = useForm({
    mode: "all",
  });

  useEffect(() => {
    if (isEditing) {
      setName(clinic.name);
      setUserName(clinic.username);
      setAddress(clinic.address);
      setPhoneNumber(clinic.phoneNumber);
      setEnabled(clinic.enabled);
    } else {
      setName("");
      setUserName("");
      setPhoneNumber("");
      setAddress("");
      setPhoneNumber("");
      // setEnabled(true);
    }
  }, [clinic, isEditing]);

  const onChangeUsername = (value) => {
    setUserName(value);
  };

  const onChangeAddress = (value) => {
    setAddress(value);
  };

  const onChangePhoneNumber = (value) => {
    setPhoneNumber(value);
  };

  const onChangePassword = (value) => {
    setPassword(value);
  };

  const onChangeName = (value) => {
    setName(value);
  };

  const handleEnabledChange = (e) => {
    setEnabled(e.target.checked);
    console.log(enabled);
  };

  const handleEdit = () => {
    console.log(clinic);
    console.log("damn");
    console.log(enabled);
    if (isEditing === true) {
      clinicService
        .editClinic(
          clinic.id,
          name,
          phoneNumber,
          clinic.emailAddress,
          clinic.username,
          password,
          enabled
        )
        .then(
          (response) => {
            // let updatedClinic = {
            //   id: clinic.id,
            //   name,
            //   phoneNumber,
            //   address,
            //   username,
            //   password,
            //   createdAt: clinic.createdAt,
            //   isEnabled: enabled,
            //   status: enabled ? "Kích hoạt" : "Khóa",
            // };
            // var updateIndex = clinics.map((item) => item.id).indexOf(clinic.id);
            // clinics[updateIndex] = updatedClinic;
            // setClinics(clinics);
            onClose(false);
          },
          (error) => {
            if (error.response.data !== undefined) {
              var a = error.response.data;
              let arr = [];
              if (a !== undefined) {
                arr.push(a);
              }
              setMessages(arr);
            }
          }
        );
    } else {
      clinicService
        .createClinic(name, phoneNumber, address, username, password, enabled)
        .then(
          (response) => {
            let newClinic = response.data;
            clinics = [newClinic].concat(clinics);
            setClinics(clinics);
            onClose(false);
          },
          (error) => {
            if (error.response.data !== undefined) {
              var a = error.response.data;
              let arr = [];
              if (a !== undefined) {
                arr.push(a);
              }
              setMessages(arr);
            }
          }
        );
    }
  };

  const closeModal = () => {
    setPassword(clinic.total);
    setName(clinic.description);
    setUserName(clinic.payerName);
    setMessages([]);
    onClose(!modal);
  };

  return (
    <CModal show={modal} onClose={closeModal}>
      <CModalHeader closeButton>
        <CModalTitle>Tạo phòng khám</CModalTitle>
      </CModalHeader>
      <form onSubmit={handleSubmit(handleEdit)} novalidate>
        <CModalBody>
          <div>
            <div>
              <TextField
                id="standard-full-width"
                value={name}
                onChange={(e) => onChangeName(e.target.value)}
                label="Tên phòng khám"
                required
                style={{ margin: 8 }}
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
            <div>
              <PhoneInput
                defaultCountry="VN"
                id="filled-full-width"
                placeholder="Số điện thoại"
                value={phoneNumber}
                onChange={setPhoneNumber}
              />
            </div>
            <div>
              {/* <TextField
                id="standard-full-width"
                value={address}
                onChange={(e) => onChangeAddress(e.target.value)}
                readonly
                label="Địa chỉ"
                style={{ margin: 8 }}
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
              /> */}
            </div>

            <div>
              {!isEditing ? (
                <TextField
                  id="standard-full-width"
                  value={username}
                  onChange={(e) => onChangeUsername(e.target.value)}
                  label="Tài khoản admin đăng nhập"
                  required
                  style={{ margin: 8 }}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              ) : (
                <TextField
                  id="standard-full-width-2"
                  value={username}
                  type="username"
                  disabled
                  label="Tài khoản admin đăng nhập"
                  readonly
                  style={{ margin: 8 }}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              )}
            </div>
            <div>
              <TextField
                id="filled-full-width"
                onChange={(e) => onChangePassword(e.target.value)}
                value={password}
                required
                label="Mật khẩu"
                type="password"
                style={{ margin: 8 }}
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>

            <div>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={enabled}
                    onChange={handleEnabledChange}
                    name="checkedB"
                    color="primary"
                  />
                }
                label="Kích hoạt"
              />
            </div>
          </div>
        </CModalBody>
        <CModalFooter>
          {messages.length > 0
            ? messages.map((message) => (
                <CAlert color="danger">{message}</CAlert>
              ))
            : ""}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            // disabled={isSubmitting}
          >
            Lưu
          </Button>
          <CButton color="secondary" onClick={() => closeModal()}>
            Hủy
          </CButton>
        </CModalFooter>
      </form>
    </CModal>
  );
};

export default EditClinicModal;
