import React from "react";
import {
  CButton,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CModalTitle,
} from "@coreui/react";
import PatientService from "../../services/patient/patient.service";
import Button from "@mui/material/Button";

const PatientDeleteModal = ({ modal, id, onClose, patients }) => {
  const handleDelete = (patientId) => {
    console.log("let's delete");
    console.log(patientId);
    PatientService.deletePatient(patientId).then(
      () => {
        var removeIndex = patients.map((item) => item.id).indexOf(patientId);
        ~removeIndex && patients.splice(removeIndex, 1);
        onClose(false);
      },
      (error) => {
        const resMessage = error.response.data;
        console.log(resMessage);
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
      <CModalBody>Bạn chắc muốn xóa bệnh nhân này chứ?</CModalBody>
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

export default PatientDeleteModal;
