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

const DeleteMedicalServiceModal = ({
  modal,
  onClose,
  medicalServices,
  setMedicalServices,
  medicalServiceElement,
  setOpenSuccessModal,
  setOpenErrorModal,
  setNotificationMessage,
}) => {
  const handleDelete = () => {
    medicalService.deleteMedicalService(medicalServiceElement.id).then(
      () => {
        setOpenSuccessModal(true);
        setNotificationMessage("Xóa xét nghiệm thành công");
        var removeIndex = medicalServices
          .map((item) => item.id)
          .indexOf(medicalServiceElement.id);
        ~removeIndex && medicalServices.splice(removeIndex, 1);
        setMedicalServices(medicalServices);
        onClose(false);
      },
      (error) => {
        setOpenErrorModal(true);
        setNotificationMessage("Xóa xét nghiệm không thành công");
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
      <CModalBody>Bạn chắc muốn xóa xét nghiệm này chứ?</CModalBody>
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

export default DeleteMedicalServiceModal;
