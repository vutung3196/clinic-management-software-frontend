import React, { useState, useEffect } from "react";
import * as Icon from "react-bootstrap-icons";
import { Alert } from "reactstrap";
import authService from "../../services/authentication/auth.service";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import clinicService from "src/services/clinicservice/clinic.service";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

const InformationManagement = () => {
  const [visible, setVisible] = useState(false);
  const [visibleError, setVisibleError] = useState(false);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [successMessage, setSuccessMessage] = useState("Sửa thành công");
  const [errorMessages, setErrorMessages] = useState([]);

  const retrieveClinicInformation = () => {
    var currentUser = authService.getCurrentUser();
    console.log("=====");
    console.log(currentUser);
    clinicService
      .getClinicInformation(currentUser.clinicId)
      .then((response) => {
        var clinic = response.data;
        setId(clinic.id);
        setName(clinic.name);
        setEmailAddress(clinic.emailAddress);
        setPhoneNumber(clinic.phoneNumber);
        setAddress(clinic.address);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const onChangeName = (name) => {
    setName(name);
  };

  const onChangeAddress = (value) => {
    setAddress(value);
  };

  const onChangeEmailAddress = (value) => {
    setEmailAddress(value);
  };

  const onChangePhoneNumber = (value) => {
    setPhoneNumber(value);
  };

  const handleEdit = () => {
    clinicService.editClinic(id, name, phoneNumber, address, "", "", true).then(
      (response) => {
        console.log(response);
        setVisible(true);
      },
      (error) => {
        console.log(error);
        console.log(error.response.data.errors.Name);
        if (error.response.data.errors !== undefined) {
          console.log(error.response.data.errors.Name);
          console.log(error.response.data.errors.Name);
          console.log(error.response.data.errors.Name);
          console.log("rockkk");
          var a = error.response.data.errors.Name;
          var b = error.response.data.errors.EmailAddress;
          let arr = [];
          if (a !== undefined) {
            arr.push(a);
          }
          if (b !== undefined) {
            arr.push(b);
          }
          setErrorMessages(arr);
          setVisibleError(true);
        }
      }
    );
  };

  useEffect(() => {
    retrieveClinicInformation();
    setTimeout(() => {
      setVisible(false);
    }, 3000);
    setTimeout(() => {
      setVisibleError(false);
    }, 6000);
  }, [visible, visibleError]);
  return (
    <div class="information-management">
      <div>
        <TextField
          id="standard-full-width"
          value={name}
          required
          onChange={(e) => onChangeName(e.target.value)}
          label="Tên phòng khám"
          style={{ margin: 8 }}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
      <div>
        {/* <TextField
          id="filled-full-width"
          onChange={(e) => onChangePhoneNumber(e.target.value)}
          value={phoneNumber}
          label="Điện thoại"
          style={{ margin: 8 }}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        /> */}
        <PhoneInput
          defaultCountry="VN"
          id="filled-full-width"
          placeholder="Số điện thoại"
          value={phoneNumber}
          onChange={setPhoneNumber}
        />
      </div>
      <div>
        <TextField
          id="filled-full-width"
          onChange={(e) => onChangeAddress(e.target.value)}
          value={address}
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
        <Button
          variant="contained"
          color="primary"
          style={{ "margin-left": "30px" }}
          onClick={() => handleEdit()}
        >
          Lưu
        </Button>

        <Alert color="success" isOpen={visible}>
          {successMessage}
        </Alert>
        {errorMessages.map((message) => (
          <Alert color="danger" isOpen={visibleError}>
            {message}
          </Alert>
        ))}
      </div>
    </div>
  );
};

export default InformationManagement;
