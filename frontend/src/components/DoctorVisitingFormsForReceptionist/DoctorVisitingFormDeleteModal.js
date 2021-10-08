import React from "react";
import {
  CButton,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CModalTitle,
} from "@coreui/react";
import Button from "@mui/material/Button";
import patientdoctorvisitingformService from "src/services/patientdoctorvisitingform/patientdoctorvisitingform.service";

const DoctorVisitingFormDeleteModal = ({
  modal,
  id,
  onClose,
  doctorVisitingForms,
}) => {
  const handleDelete = (id) => {
    console.log("let's delete");
    console.log(id);
    patientdoctorvisitingformService.deleteById(id).then(
      () => {
        var removeIndex = doctorVisitingForms
          .map((item) => item.id)
          .indexOf(id);
        ~removeIndex && doctorVisitingForms.splice(removeIndex, 1);
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
      <CModalBody>Bạn chắc muốn xóa phiếu khám này chứ?</CModalBody>
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

export default DoctorVisitingFormDeleteModal;
