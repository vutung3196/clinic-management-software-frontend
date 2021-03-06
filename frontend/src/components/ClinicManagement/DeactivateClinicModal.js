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
import clinicService from "../../services/clinicservice/clinic.service";

const DeactivateClinicModal = ({
  modal,
  onClose,
  clinics,
  setClinics,
  clinic,
  setOpenSuccessModal,
  setOpenErrorModal,
  setNotificationMessage,
}) => {
  const handleDeactivate = () => {
    console.log("REALLY");
    clinicService.deativateClinic(clinic.id).then(
      (response) => {
        let updatedClinic = {
          id: clinic.id,
          name: clinic.name,
          phoneNumber: clinic.phoneNumber,
          emailAddress: clinic.emailAddress,
          address: clinic.address,
          username: clinic.username,
          password: clinic.password,
          createdAt: clinic.createdAt,
          isEnabled: false,
          status: "Khóa",
        };
        var updateIndex = clinics.map((item) => item.id).indexOf(clinic.id);
        clinics[updateIndex] = updatedClinic;
        setClinics(clinics);
        setOpenSuccessModal(true);
        setNotificationMessage("Khóa phòng khám thành công");
        onClose(false);
      },
      (error) => {
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
        <CModalTitle>KHÓA</CModalTitle>
      </CModalHeader>
      <CModalBody>Bạn chắc muốn khóa phòng khám này chứ?</CModalBody>
      <CModalFooter>
        <CButton color="primary" onClick={() => handleDeactivate()}>
          KHÓA
        </CButton>{" "}
        <CButton color="secondary" onClick={() => setDeleteModal()}>
          THOÁT
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

export default DeactivateClinicModal;
