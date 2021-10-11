import React, { useState, useEffect } from "react";
import {
  CModal,
  CButton,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CForm,
  CFormGroup,
  CInputGroup,
  CInput,
  CLabel,
  CCol,
} from "@coreui/react";
import fileService from "src/services/file/file.service";

const FileUpdateModal = ({ modal, onClose, file, files, setFiles }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setName(file.name);
    if (!file.description) {
      setDescription("");
    } else {
      setDescription(file.description);
    }
  }, [file]);

  const onChangeName = (name) => {
    setName(name);
  };

  const onChangeDescription = (fileDescription) => {
    setDescription(fileDescription);
  };

  const handleUpdate = () => {
    fileService.edit(file.id, name, description).then(
      () => {
        console.log("Edit successfully");
        file.name = name;
        file.description = description;
        var updateIndex = files.map((item) => item.id).indexOf(file.id);
        files[updateIndex] = file;
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

  console.log("Here is the detailed modal");
  return (
    <CModal show={modal} onClose={onClose}>
      <CModalHeader closeButton>
        <CModalTitle>CẬP NHẬT THÔNG TIN FILE</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm action="" method="post" className="form-horizontal">
          <CFormGroup row>
            <CCol md="12">
              <CInputGroup>
                <CInput
                  id="input1-group2"
                  name="input1-group2"
                  value={name}
                  placeholder="Tên"
                  onChange={(e) => onChangeName(e.target.value)}
                  required
                />
              </CInputGroup>
            </CCol>
          </CFormGroup>
          <CFormGroup row>
            <CCol md="12">
              <CInputGroup>
                <CInput
                  id="input2-group2"
                  name="input2-group2"
                  placeholder="Mô tả"
                  value={description}
                  onChange={(e) => onChangeDescription(e.target.value)}
                />
              </CInputGroup>
            </CCol>
          </CFormGroup>
        </CForm>
      </CModalBody>
      <CModalFooter>
        <CButton color="primary" onClick={() => handleUpdate()}>
          Lưu
        </CButton>{" "}
        <CButton color="secondary" onClick={() => onClose(false)}>
          Hủy
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

export default FileUpdateModal;
