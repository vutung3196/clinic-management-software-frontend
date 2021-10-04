import React, { useState } from "react";
import {
  CModal,
  CButton,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CForm,
  CFormGroup,
  CInputGroup,
  CInput,
  CDropdown,
  CDropdownItem as option,
  CCol,
} from "@coreui/react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import userService from "../../services/user/user.service";
import { FormLabel } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Alert } from "reactstrap";

import PatientService from "../../services/patient/patient.service";

const PatientUpdateModal = ({
  id,
  patient,
  modal,
  onClose,
  patients,
  setPatients,
}) => {
  const [selectedGenderValue, setSelectedGenderValue] = useState("Male");
  const [patientName, setPatientName] = useState("");
  const [email, setEmail] = useState("");
  const [yearOfBirth, setYearOfBirth] = useState("");
  const [gender, setGender] = useState("Male");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [detailedAddress, setDetailedAddress] = useState("");
  const [addressCity, setAddressCity] = useState("");
  const [occupation, setOccupation] = useState("");
  const [messages, setMessages] = useState([]);

  const onChangePatientname = (patientName) => {
    // const patientName = event.target.value;
    setPatientName(patientName);
    patient.fullName = patientName;
  };

  const onChangeEmail = (emailAddress) => {
    setEmail(emailAddress);
    patient.emailAddress = emailAddress;
  };

  const onChangeYearOfBirth = (event) => {
    const yearOfBirth = event.target.value;
    console.log("year of birth is: ahahha");
    console.log(yearOfBirth);
    setYearOfBirth(yearOfBirth);
    patient.yearOfBirth = yearOfBirth;
  };

  const onChangeGender = (event) => {
    const gender = event.target.value;
    setGender(gender);
    patient.gender = gender;
  };

  const onChangePhoneNumber = (event) => {
    const phoneNumber = event.target.value;
    setPhoneNumber(phoneNumber);
    patient.phoneNumber = phoneNumber;
  };

  const onChangeDetailedAddress = (event) => {
    const detailedAddress = event.target.value;
    setDetailedAddress(detailedAddress);
    patient.detailedAddress = detailedAddress;
  };

  const onChangeOccupation = (event) => {
    const occupation = event.target.value;
    setOccupation(occupation);
    patient.occupation = occupation;
  };

  const handleGenderChange = (value) => {
    setGender(value);
    patient.gender = value;
  };

  const handleEdit = (patientId) => {
    PatientService.editPatient(
      patient.id,
      patient.fullName,
      patient.emailAddress,
      patient.yearOfBirth,
      patient.gender,
      patient.phoneNumber,
      patient.detailedAddress,
      patient.addressCity,
      patient.occupation
    ).then(
      (response) => {
        let updatedPatient = response.data;
        patient.gender = patient.gender === "Male" ? "Nam" : "Nữ";
        patient.age = !patient.age ? "N/A" : patient.age;
        patient.phoneNumber = !patient.phoneNumber
          ? "N/A"
          : patient.phoneNumber;
        patient.addressCity = !patient.addressCity
          ? "N/A"
          : patient.addressCity;
        console.log("updated:");
        var updateIndex = patients.map((item) => item.id).indexOf(patientId);
        patients[updateIndex] = updatedPatient;
        setPatients(patients);
        setMessages([]);
        onClose(false);
      },
      (error) => {
        if (error.response.data.errors !== undefined) {
          var a = error.response.data.errors.EmailAddress;
          var b = error.response.data.errors.FullName;
          let arr = [];
          if (a !== undefined) {
            arr.push(a);
          }
          if (b !== undefined) {
            arr.push(b);
          }
          setMessages(arr);
        }
      }
    );
  };

  const closeModal = () => {
    setMessages([]);
    onClose(false);
  };

  return (
    <CModal show={modal} onClose={closeModal}>
      <CModalHeader closeButton>
        <CModalTitle>Bệnh nhân</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <div>
          <div>
            <TextField
              id="standard-full-width"
              value={patient.fullName}
              onChange={(e) => onChangePatientname(e.target.value)}
              type="username"
              label="Tên bệnh nhân"
              style={{ margin: 8 }}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <div>
            <TextField
              id="filled-full-width"
              label="Email"
              value={patient.emailAddress}
              onChange={(e) => onChangeEmail(e.target.value)}
              type="email"
              style={{ margin: 8 }}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <div>
            <TextField
              id="filled-full-width"
              value={patient.yearOfBirth}
              onChange={onChangeYearOfBirth}
              label="Năm sinh"
              style={{ margin: 8 }}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <div style={{ "padding-left": "10px" }}>
            <FormControl>
              <InputLabel id="demo-simple-select-label">Giới tính</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={patient.gender}
                onChange={(e) => handleGenderChange(e.target.value)}
              >
                <MenuItem value={"Male"}>Nam</MenuItem>
                <MenuItem value={"Female"}>Nữ</MenuItem>
                <MenuItem value={"Other"}>Khác</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div>
            <TextField
              id="filled-full-width"
              value={patient.phoneNumber}
              onChange={onChangePhoneNumber}
              label="Số điện thoại"
              style={{ margin: 8 }}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>

          <div>
            <TextField
              id="filled-full-width"
              value={patient.detailedAddress}
              onChange={onChangeDetailedAddress}
              label="Địa chỉ"
              style={{ margin: 8 }}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <div>
            <TextField
              id="filled-full-width"
              value={patient.occupation}
              onChange={onChangeOccupation}
              label="Nghề nghiệp"
              style={{ margin: 8 }}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
        </div>
      </CModalBody>
      <CModalFooter>
        {messages.length > 0
          ? messages.map((message) => <Alert color="danger">{message}</Alert>)
          : ""}
        <CButton color="primary" onClick={() => handleEdit(id)}>
          Lưu
        </CButton>{" "}
        <CButton color="secondary" onClick={() => closeModal()}>
          Hủy
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

export default PatientUpdateModal;
