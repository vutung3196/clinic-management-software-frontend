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

const EditUserModal = ({
  modal,
  onClose,
  users,
  setUsers,
  user,
  isEditing,
}) => {
  const [role, setRole] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [enabled, setEnabled] = useState(false);
  const [messages, setMessages] = useState([]);

  const { register, handleSubmit, errors, formState } = useForm({
    mode: "all",
  });

  useEffect(() => {
    if (isEditing) {
      setRole(user.role);
      setFullName(user.fullName);
      setUserName(user.userName);
      setPhoneNumber(user.phoneNumber);
      setEnabled(user.enabled);
    } else {
      setRole("Admin");
      setFullName("");
      setUserName("");
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
    if (isEditing) {
      userService
        .editUser(
          user.id,
          userName,
          password,
          fullName,
          phoneNumber,
          enabled,
          role
        )
        .then(
          (response) => {
            let updatedUser = response.data;
            var updateIndex = users.map((item) => item.id).indexOf(user.id);
            users[updateIndex] = updatedUser;
            setUsers(users);
            setMessages([]);
            onClose(false);
          },
          (error) => {
            setUserName("");
            setPassword("");
            setPhoneNumber("");
            setEnabled(true);
            setRole("");
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
      userService
        .createUser(userName, password, fullName, phoneNumber, enabled, role)
        .then(
          (response) => {
            let newUser = response.data;
            users = [newUser].concat(users);
            setUsers(users);
            onClose(false);
            setMessages([]);
          },
          (error) => {
            setUserName("");
            setPassword("");
            setPhoneNumber("");
            setEnabled(true);
            setRole("");
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
        <CModalTitle>Tạo người dùng</CModalTitle>
      </CModalHeader>
      <form onSubmit={handleSubmit(handleEdit)} novalidate>
        <CModalBody>
          <div>
            {!isEditing ? (
              <div>
                <TextField
                  id="standard-full-width"
                  value={userName}
                  onChange={(e) => onChangeUserName(e.target.value)}
                  type="username"
                  required
                  label="Tên đăng nhập"
                  style={{ margin: 8 }}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>
            ) : (
              <div>
                <TextField
                  id="standard-full-width"
                  value={userName}
                  disabled
                  type="username"
                  readonly
                  label="Tên đăng nhập"
                  style={{ margin: 8 }}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>
            )}
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
              <TextField
                id="filled-full-width"
                onChange={(e) => onChangeFullName(e.target.value)}
                value={fullName}
                label="Tên đầy đủ"
                required
                style={{ margin: 8 }}
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
            {/* <div>
              <PhoneInput
                defaultCountry="VN"
                id="filled-full-width"
                placeholder="Số điện thoại"
                value={phoneNumber}
                onChange={setPhoneNumber}
              />
            </div> */}
            <div style={{ "padding-left": "10px" }}>
              <FormControl>
                <InputLabel id="demo-simple-select-label">Vai trò</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={role}
                  onChange={onChangeRole}
                  style={{ paddingTop: 10, width: 300 }}
                >
                  <MenuItem value={"Admin"}>Admin phòng khám</MenuItem>
                  <MenuItem value={"Receptionist"}>Lễ tân</MenuItem>
                  <MenuItem value={"Doctor"}>Bác sĩ</MenuItem>
                  <MenuItem value={"TestSpecialist"}>
                    Nhân viên xét nghiệm
                  </MenuItem>
                </Select>
              </FormControl>
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
