import React, { useMemo, useState } from "react";
import {
  CButton,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CModalTitle,
  CContainer,
} from "@coreui/react";
import { useDropzone } from "react-dropzone";
import Dropzone from "react-dropzone";
import fileService from "src/services/file/file.service";
import * as Icon from "react-bootstrap-icons";

const FileUploadModal = ({ modal, onClose, patientId, retrieveFiles }) => {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({ accept: "image/*" });
  const init = [];
  const [readyFiles, setReadyFiles] = useState(init);
  const [currentData, setCurrentData] = useState("");

  const setCloseModal = () => {
    setReadyFiles(init);
    onClose(false);
  };

  const uploadImage = (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "xdf93shk");
    var today = new Date();
    var date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();

    data.append("folder", "hapham/" + date);
    data.append("cloud_name", "dzftzmcxb");
    fetch("  https://api.cloudinary.com/v1_1/dzftzmcxb/image/upload", {
      method: "post",
      body: data,
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        setCurrentData(data);
        setReadyFiles((prev) => [...readyFiles, data]);
      })
      .catch((err) => console.log(err));
  };

  const onDrop = (files) => {
    files.map((file) => {
      uploadImage(file);
    });
  };

  function getBase64(file) {
    return new Promise((resolve, reject) => {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        resolve(reader.result);
      };
      reader.onerror = function (error) {
        reject(error);
      };
    });
  }

  const upload = async () => {
    fileService.uploadV2(patientId, readyFiles).then(
      (response) => {
        // go to the dashboard page
        console.log("upload successfully");
        console.log(response);
        setTimeout(() => {
          retrieveFiles();
        }, 3000);
      },
      (error) => {
        console.log("=========");
        console.log(error.response);
        const resMessage = error.response.data;
      }
    );
    setCloseModal(false);
  };

  const baseStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    borderWidth: 2,
    borderRadius: 2,
    borderColor: "#eeeeee",
    borderStyle: "dashed",
    backgroundColor: "#fafafa",
    color: "#bdbdbd",
    outline: "none",
    transition: "border .24s ease-in-out",
  };

  const activeStyle = {
    borderColor: "#2196f3",
  };

  const acceptStyle = {
    borderColor: "#00e676",
  };

  const rejectStyle = {
    borderColor: "#ff1744",
  };

  const handleChangeStatus = ({ meta }, status) => {
    console.log(status, meta);
  };

  const handleSubmit = (files, allFiles) => {
    console.log(files.map((f) => f.meta));
    allFiles.forEach((f) => f.remove());
  };

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  const styleRemove = {
    float: "right",
    "margin-top": "5px",
  };

  const removeElement = (index) => {
    setReadyFiles(readyFiles.filter((_, i) => i !== index));
  };

  return (
    <CModal show={modal} onClose={onClose}>
      <CModalHeader closeButton>
        <CModalTitle>Tải ảnh</CModalTitle>
      </CModalHeader>

      <CModalBody>
        <CContainer>
          <Dropzone
            dropzoneActive={{ borderColor: "green" }}
            accept="image/jpg,image/jpeg,image/png"
            // onChangeStatus={handleChangeStatus}
            onSubmit={handleSubmit}
            onDrop={(acceptedFiles) => {
              onDrop(acceptedFiles);
            }}
            onChangeStatus={({ meta, file }, status) => {
              console.log(status, meta, file);
            }}
          >
            {({ getRootProps, getInputProps }) => (
              <section>
                <div {...getRootProps({ style })}>
                  <input {...getInputProps()} />
                  <p>Kéo & Thả các file hoặc click vào khung này để tải file</p>
                </div>
              </section>
            )}
          </Dropzone>
          <div>
            <aside>
              <ul className="list-group mt-2">
                {readyFiles.map((entry, index) => (
                  <li className="list-group-item list-group-item-success">
                    {entry.original_filename} - {entry.bytes} B
                    <Icon.Trash
                      style={styleRemove}
                      onClick={() => {
                        removeElement(index);
                      }}
                    ></Icon.Trash>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </CContainer>
      </CModalBody>
      <CModalFooter>
        <CButton
          color="primary"
          onClick={() => upload()}
          disabled={readyFiles.length === 0}
        >
          OK
        </CButton>{" "}
        <CButton color="secondary" onClick={() => setCloseModal()}>
          THOÁT
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

export default FileUploadModal;
