import React from "react";
import {
  CButton,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CModalTitle,
} from "@coreui/react";
import fileService from "src/services/file/file.service";

const FileDeleteModal = ({ modal, onClose, file, files, setFiles }) => {
  const handleDelete = () => {
    fileService.deleteFile(file.id).then(
      () => {
        console.log("delete successfully");
        var removeIndex = files.map((item) => item.id).indexOf(file.id);
        ~removeIndex && files.splice(removeIndex, 1);
        setFiles(files);
        onClose(false);
      },
      (error) => {
        console.log("=========");
        console.log(error.response);
        // setLoading(false);
        // setMessage(resMessage);
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
      <CModalBody>Bạn chắc muốn xóa ảnh này chứ?</CModalBody>
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

export default FileDeleteModal;
