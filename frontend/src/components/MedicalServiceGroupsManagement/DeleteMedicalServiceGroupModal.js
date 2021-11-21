import React from "react";
import {
  CButton,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CModalTitle,
} from "@coreui/react";
import medicalService from "src/services/medicalservice/medical.service";

const DeleteMedicalServiceGroupModal = ({
  modal,
  onClose,
  groups,
  setGroups,
  medicalServiceGroup,
  setOpenSuccessModal,
  setOpenErrorModal,
  setNotificationMessage,
}) => {
  const handleDelete = () => {
    medicalService.deleteMedicalServiceGroup(medicalServiceGroup.id).then(
      () => {
        setOpenSuccessModal(true);
        setNotificationMessage("Xóa nhóm chỉ định xét nghiệm thành công");
        var removeIndex = groups
          .map((item) => item.id)
          .indexOf(medicalServiceGroup.id);
        ~removeIndex && groups.splice(removeIndex, 1);
        setGroups(groups);
        onClose(false);
      },
      (error) => {
        setOpenErrorModal(true);
        if (typeof error.response.data === "string") {
          setNotificationMessage(error.response.data);
          return;
        }
        setNotificationMessage("Xóa nhóm chỉ định xét nghiệm không thành công");
      }
    );
  };

  const setDeleteModal = () => {
    onClose(false);
  };

  return (
    <CModal show={modal} onClose={onClose}>
      <CModalHeader closeButton>
        <CModalTitle>XÓA</CModalTitle>
      </CModalHeader>
      <CModalBody>
        Bạn chắc muốn xóa nhóm chỉ định xét nghiệm này chứ?
      </CModalBody>
      <CModalFooter>
        <CButton color="primary" onClick={() => handleDelete()}>
          XÓA
        </CButton>{" "}
        <CButton color="secondary" onClick={() => setDeleteModal()}>
          THOÁT
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

export default DeleteMedicalServiceGroupModal;
