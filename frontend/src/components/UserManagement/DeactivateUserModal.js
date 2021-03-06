import React from "react";
import {
  CButton,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CModalTitle,
} from "@coreui/react";
import userService from "src/services/user/user.service";

const DeactivateUserModal = ({
  modal,
  onClose,
  users,
  setUsers,
  user,
  setOpenSuccessModal,
  setOpenErrorModal,
  setNotificationMessage,
}) => {
  console.log(
    user.id,
    user.userName,
    user.password,
    user.fullName,
    user.phoneNumber,
    false,
    user.role
  );
  const handleDelete = () => {
    userService.deactivateUser(user.id).then(
      (response) => {
        let updatedUser = {
          id: user.id,
          userName: user.userName,
          phoneNumber: user.phoneNumber,
          fullName: user.fullName,
          createdAt: user.createdAt,
          enabled: false,
          role: user.role,
          roleDescription: user.roleDescription,
          status: "Khóa",
        };
        var updateIndex = users.map((item) => item.id).indexOf(user.id);
        users[updateIndex] = updatedUser;
        setUsers(users);
        setOpenSuccessModal(true);
        setNotificationMessage("Khóa tài khoản người dùng thành công");
        onClose(false);
      },
      (error) => {
        console.log(error);
        setOpenErrorModal(true);
        setNotificationMessage("Khóa tài khoản người dùng không thành công");
      }
    );
  };

  const setDeactivateModal = () => {
    onClose(false);
  };

  return (
    <CModal show={modal} onClose={onClose}>
      <CModalHeader closeButton>
        <CModalTitle>KHÓA</CModalTitle>
      </CModalHeader>
      <CModalBody>Bạn chắc muốn khóa người dùng này chứ?</CModalBody>
      <CModalFooter>
        <CButton color="primary" onClick={() => handleDelete()}>
          KHÓA
        </CButton>{" "}
        <CButton color="secondary" onClick={() => setDeactivateModal()}>
          THOÁT
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

export default DeactivateUserModal;
