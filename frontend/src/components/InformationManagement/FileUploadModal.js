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

const FileUploadModal = ({
  modal,
  onClose,
  setFile,
  setOpenSuccessModal,
  setOpenErrorModal,
  setNotificationMessage,
}) => {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles, fileRejections) => {
      fileRejections.forEach((file) => {
        file.errors.forEach((err) => {
          console.log(err);
          if (err.code === "file-too-large") {
            console.log(`Error: ${err.message}`);
          }

          if (err.code === "file-invalid-type") {
            console.log(`Error: ${err.message}`);
          }
        });
      });
    },
  });

  const [readyFile, setReadyFile] = useState("");
  const [currentData, setCurrentData] = useState("");

  const setCloseModal = () => {
    setReadyFile("");
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
        console.log(data);
        setReadyFile(data);
      })
      .catch((err) => console.log(err));
  };

  const onDrop = (files) => {
    if (readyFile !== "") {
      setOpenErrorModal(true);
      setNotificationMessage("Bạn chỉ được tải lên 1 file");
      return;
    }
    files.map((file) => {
      uploadImage(file);
    });
  };

  const upload = async () => {
    fileService.uploadLogo(readyFile).then(
      (response) => {
        // go to the dashboard page
        setFile(response.data);
        console.log("upload successfully");
        setOpenSuccessModal(true);
        setNotificationMessage("Ảnh tải lên thành công");
      },
      (error) => {
        console.log(error);
        setOpenErrorModal(true);
        setNotificationMessage("Ảnh tải lên không thành công");
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
    allFiles.forEach((f) => f.remove());
  };

  const removeFile = () => {
    console.log(readyFile.public_id);
    fileService.deleteCloudinaryFile(readyFile.public_id).then(
      (response) => {
        setNotificationMessage("Xóa ảnh thành công");
        setReadyFile("");
      },
      (error) => {
        setOpenErrorModal(true);
        setNotificationMessage("Xóa ảnh không thành công");
      }
    );
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
    setReadyFile(readyFile.filter((_, i) => i !== index));
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
            onSubmit={handleSubmit}
            onDrop={(acceptedFiles, rejectedFiles) => {
              rejectedFiles.forEach((file) => {
                file.errors.forEach((err) => {
                  setOpenErrorModal(true);
                  var message = "";
                  if (err.code === "file-too-large") {
                    console.log(`Error: ${err.message}`);
                    message += err.message;
                  }

                  if (err.code === "file-invalid-type") {
                    console.log(`Error: ${err.message}`);
                    message +=
                      ", " +
                      "Hệ thống chỉ chấp nhận file image/jpg, image/jpeg, image/png";
                    setNotificationMessage(err.message);
                  }
                  setNotificationMessage(message);
                });
              });
              onDrop(acceptedFiles);
            }}
            maxSize={9242880}
            onChangeStatus={({ meta, file }, status) => {
              console.log(status);
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
                {readyFile !== "" ? (
                  <li className="list-group-item list-group-item-success">
                    {readyFile.original_filename}
                    <Icon.Trash
                      style={styleRemove}
                      onClick={() => {
                        removeFile();
                      }}
                    ></Icon.Trash>
                  </li>
                ) : (
                  ""
                )}
              </ul>
            </aside>
          </div>
        </CContainer>
      </CModalBody>
      <CModalFooter>
        <CButton
          color="primary"
          onClick={() => upload()}
          disabled={readyFile.length === 0}
        >
          LƯU
        </CButton>{" "}
        <CButton color="secondary" onClick={() => setCloseModal()}>
          THOÁT
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

export default FileUploadModal;
