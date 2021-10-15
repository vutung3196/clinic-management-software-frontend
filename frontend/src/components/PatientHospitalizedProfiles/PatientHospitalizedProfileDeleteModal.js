import React from "react";
import {
  CButton,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CModalTitle,
} from "@coreui/react";
import hospitalizedprofileService from "src/services/hospitalizedprofile/hospitalizedprofile.service";
import Button from "@mui/material/Button";

const PatientHospitalizedProfileDeleteModal = ({
  modal,
  id,
  onClose,
  patientHospitalizedProfiles,
  setOpenSuccessModal,
  setOpenErrorModal,
  setNotificationMessage,
}) => {
  const handleDelete = (patientId) => {
    console.log("let's delete");
    console.log(id);
    hospitalizedprofileService.deleteById(id).then(
      () => {
        var removeIndex = patientHospitalizedProfiles
          .map((item) => item.id)
          .indexOf(patientId);
        ~removeIndex && patientHospitalizedProfiles.splice(removeIndex, 1);
        setOpenSuccessModal(true);
        setNotificationMessage("Xóa hồ sơ y tế thành công");
        onClose(false);
      },
      (error) => {
        setOpenErrorModal(true);
        setNotificationMessage("Xóa hồ sơ y tế không thành công");
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
      <CModalBody>Bạn chắc muốn xóa hồ sơ y tế này chứ?</CModalBody>
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

export default PatientHospitalizedProfileDeleteModal;
