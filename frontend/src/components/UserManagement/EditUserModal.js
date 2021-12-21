import React, { useState, useEffect } from "react";
import {
  CButton,
  CModal,
  CModalHeader,
  CModalBody,
  CModalTitle,
  CModalFooter,
  CAlert,
} from "@coreui/react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import userService from "../../services/user/user.service";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import PhoneInput from "react-phone-number-input";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import medicalService from "src/services/medicalservice/medical.service";

const EditUserModal = ({
  modal,
  onClose,
  users,
  setUsers,
  user,
  isEditing,
  setOpenSuccessModal,
  setOpenErrorModal,
  setNotificationMessage,
}) => {
  const [role, setRole] = useState("");
  const [isTestSpecialist, setIsTestSpecialist] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [enabled, setEnabled] = useState(false);
  const [messages, setMessages] = useState([]);
  const [medicalServiceGroupId, setMedicalServiceGroupId] = useState("");
  const [medicalServiceGroups, setMedicalServiceGroups] = useState([]);
  const [emailAddress, setEmailAddress] = useState("");

  const retrieveGroups = () => {
    medicalService
      .getAllMedicalServiceGroups()
      .then((response) => {
        console.log(response.data);
        setMedicalServiceGroups(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const { register, handleSubmit, errors, formState } = useForm({
    mode: "all",
  });

  useEffect(() => {
    retrieveGroups();
    if (isEditing) {
      setRole(user.role);
      setFullName(user.fullName);
      setUserName(user.userName);
      setPhoneNumber(user.phoneNumber);
      setEnabled(user.enabled);
      setEmailAddress(user.emailAddress);
      setMedicalServiceGroupId(user.medicalServiceGroupForTestSpecialistId);
    } else {
      setRole("Admin");
      setFullName("");
      setUserName("");
      setEmailAddress("");
      setPhoneNumber("");
      setEnabled(true);
    }
  }, [user, isEditing]);

  const onChangeRole = (e) => {
    let value = e.target.value;
    setRole(value);
  };

  const onChangeUserName = (value) => {
    setUserName(value);
  };

  const onChangePhoneNumber = (value) => {
    setPhoneNumber(value);
  };

  const onChangePassword = (value) => {
    setPassword(value);
  };

  const onChangeFullName = (value) => {
    setFullName(value);
  };

  const handleEnabledChange = (e) => {
    setEnabled(e.target.checked);
    console.log(enabled);
  };

  const handleEdit = () => {
    console.log(user.id);
    console.log(userName);
    if (isEditing === true) {
      userService
        .editUser(
          user.id,
          emailAddress,
          userName,
          password,
          fullName,
          enabled,
          role,
          medicalServiceGroupId
        )
        .then(
          (response) => {
            let updatedUser = response.data;
            var updateIndex = users.map((item) => item.id).indexOf(user.id);
            users[updateIndex] = updatedUser;
            setUsers(users);
            setOpenSuccessModal(true);
            setNotificationMessage(
              "Cập nhật thông tin tài khoản người dùng thành công"
            );
            onClose(false);
          },
          (error) => {
            var errorMessage = "";
            if (error.response.data.errors !== undefined) {
              console.log("===================");
              console.log(error.response.data.errors);
              var a = error.response.data.errors.UserName;
              let arr = [];
              if (a !== undefined) {
                arr.push(a);
              }

              a = error.response.data.errors.FullName;
              if (a !== undefined) {
                arr.push(a);
              }
              a = error.response.data.errors.PassWord;
              if (a !== undefined) {
                arr.push(a);
              }
              for (let index = 0; index < arr.length; index++) {
                errorMessage += arr[index];
                if (index !== arr.length - 1) {
                  errorMessage += " và ";
                }
              }
            }
            if (typeof error.response.data === "string") {
              let b = error.response.data;
              if (b !== undefined) {
                errorMessage += b;
              }
            }
            setOpenErrorModal(true);
            setNotificationMessage(errorMessage);
            setUserName("");
            setPassword("");
            setPhoneNumber("");
            setEnabled(true);
            setRole("Admin");
          }
        );
    } else {
      userService
        .createUser(
          emailAddress,
          userName,
          password,
          fullName,
          enabled,
          role,
          medicalServiceGroupId
        )
        .then(
          (response) => {
            let newUser = response.data;
            users = [newUser].concat(users);
            setUsers(users);
            onClose(false);
            setOpenSuccessModal(true);
            setNotificationMessage("Tạo tài khoản người dùng thành công");
          },
          (error) => {
            setUserName("");
            setPassword("");
            setPhoneNumber("");
            setEnabled(true);
            setRole("Admin");
            var errorMessage = "";
            if (error.response.data.errors !== undefined) {
              let arr = [];
              var a = error.response.data.errors.FullName;
              if (a !== undefined) {
                arr.push(a);
              }

              a = error.response.data.errors.UserName;
              if (a !== undefined) {
                arr.push(a);
              }
              a = error.response.data.errors.PassWord;
              if (a !== undefined) {
                arr.push(a);
              }
              for (let index = 0; index < arr.length; index++) {
                errorMessage += arr[index];
                if (index !== arr.length - 1) {
                  errorMessage += " và ";
                }
              }
            }
            if (typeof error.response.data === "string") {
              let b = error.response.data;
              if (b !== undefined) {
                errorMessage += b;
              }
            }
            setOpenErrorModal(true);
            setNotificationMessage(errorMessage);
          }
        );
    }
  };

  const onChangeEmail = (email) => {
    setEmailAddress(email);
  };

  const closeModal = () => {
    setRole(user.type);
    setPassword(user.total);
    setFullName(user.description);
    setUserName(user.payerName);
    setMessages([]);
    onClose(!modal);
  };

  return (
    <CModal show={modal} onClose={closeModal}>
      <CModalHeader closeButton>
        {isEditing === false ? (
          <CModalTitle>Tạo người dùng</CModalTitle>
        ) : (
          <CModalTitle>Chỉnh sửa người dùng</CModalTitle>
        )}
      </CModalHeader>

      <form onSubmit={handleSubmit(handleEdit)} novalidate>
        <CModalBody>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                id="filled-full-width"
                label="Email (ví dụ: abcde@gmail.com)"
                type="email"
                fullWidth
                margin="normal"
                variant="standard"
                required
                value={emailAddress}
                onChange={(e) => onChangeEmail(e.target.value)}
              />
            </Grid>
            {!isEditing ? (
              <Grid item xs={12}>
                <TextField
                  id="filled-full-width"
                  value={userName}
                  onChange={(e) => onChangeUserName(e.target.value)}
                  type="username"
                  required
                  label="Tên đăng nhập"
                  style={{ margin: 8 }}
                  fullWidth
                  margin="normal"
                />
              </Grid>
            ) : (
              <Grid item xs={12}>
                <TextField
                  id="filled-full-width"
                  value={userName}
                  disabled
                  type="username"
                  readonly
                  label="Tên đăng nhập"
                  style={{ margin: 8 }}
                  fullWidth
                  margin="normal"
                />
              </Grid>
            )}
            <Grid item xs={12}>
              {/* <div> */}
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
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="filled-full-width"
                onChange={(e) => onChangeFullName(e.target.value)}
                value={fullName}
                label="Tên đầy đủ"
                required
                style={{ margin: 8 }}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl>
                <InputLabel id="demo-simple-select-label">Vai trò</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={role}
                  onChange={onChangeRole}
                >
                  <MenuItem value={"Admin"}>Admin phòng khám</MenuItem>
                  <MenuItem value={"Receptionist"}>Lễ tân</MenuItem>
                  <MenuItem value={"Doctor"}>Bác sĩ</MenuItem>
                  <MenuItem value={"TestSpecialist"}>
                    Nhân viên xét nghiệm
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {role === "TestSpecialist" ? (
              <Grid item xs={12}>
                <InputLabel id="demo-simple-select-label">
                  Chuyên môn
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  sx={{ width: "100%" }}
                  value={medicalServiceGroupId}
                  label="Nhóm xét nghiệm"
                  onChange={(e) => setMedicalServiceGroupId(e.target.value)}
                >
                  {medicalServiceGroups !== undefined &&
                  medicalServiceGroups.length > 0
                    ? medicalServiceGroups
                        .filter((entry) => entry.name !== "Khám bệnh")
                        .map((entry) => (
                          <MenuItem value={entry.id}>{entry.name}</MenuItem>
                        ))
                    : ""}
                </Select>
              </Grid>
            ) : (
              ""
            )}
            <Grid item xs={12}>
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
            </Grid>
          </Grid>
        </CModalBody>
        <CModalFooter>
          <Button type="submit" variant="contained" color="primary">
            Lưu
          </Button>
          <CButton
            color="secondary"
            variant="contained"
            onClick={() => closeModal()}
          >
            Hủy
          </CButton>
        </CModalFooter>
      </form>
    </CModal>
  );
};

export default EditUserModal;
