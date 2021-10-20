import React from "react";
import {
  CButton,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CModalTitle,
} from "@coreui/react";
import laborderformService from "src/services/laborderform/laborderform.service";
import Button from "@mui/material/Button";

const LabOrderFormDeleteModal = ({
  modal,
  id,
  onClose,
  labOrderForms,
  setOpenSuccessModal,
  setOpenErrorModal,
  setNotificationMessage,
}) => {
  const handleDelete = (id) => {
    console.log("let's delete");
    console.log(id);
    laborderformService.deleteById(id).then(
      () => {
        var removeIndex = labOrderForms.map((item) => item.id).indexOf(id);
        ~removeIndex && labOrderForms.splice(removeIndex, 1);
        setOpenSuccessModal(true);
        setNotificationMessage("Hủy phiếu chỉ định thành công");
        onClose(false);
      },
      (error) => {
        setOpenErrorModal(true);
        setNotificationMessage("Hủy phiếu chỉ định không thành công");
        console.log(error);
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
      <CModalBody>Bạn chắc muốn xóa phiếu chỉ định này chứ?</CModalBody>
      <CModalFooter>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={() => handleDelete(id)}
        >
          XÓA
        </Button>
        <CButton color="secondary" onClick={() => setDeleteModal()}>
          THOÁT
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

export default LabOrderFormDeleteModal;
