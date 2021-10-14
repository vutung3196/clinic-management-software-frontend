import { CButton, CInput, CCardHeader, CCard } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import * as Icon from "react-bootstrap-icons";
import { useState, useEffect } from "react";
import FileUploadModal from "./FileUploadModal";
import fileService from "src/services/file/file.service";
import ViewImageModal from "./ViewImageModal";
import FileUpdateModal from "./FileUpdateModal";
import FileDeleteModal from "./FileDeleteModal";

const style1 = {
  position: "relative",
  overflow: "auto",
  width: "auto",
  height: "336px",
};

const style2 = {
  height: "336px",
  overflow: "hidden",
  width: "auto",
};

const styleFile = {
  float: "left",
};

const FilesUpload = ({
  modal,
  patientId,
  files,
  setFiles,
  labTestId,
  setOpenSuccessModal,
  setOpenErrorModal,
  setNotificationMessage,
  isPrescriptionModal,
  visitingFormId,
}) => {
  console.log("LOL");
  console.log(isPrescriptionModal);
  const [uploadModal, setUploadModal] = useState(false);
  const [uploadFiles, setUploadFiles] = useState([]);
  const [currentFile, setCurrentFile] = useState("");
  const [viewModal, setViewModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [file, setFile] = useState("");

  const showViewModal = (file) => {
    setCurrentFile(file);
    setViewModal(!viewModal);
  };

  const retrieveFiles = () => {
    fileService
      .getByLabTestId(labTestId)
      .then((response) => {
        console.log(response);
        setFiles(response.data);
      })
      .catch((e) => {
        console.log(e);
        setFiles([]);
      });
  };

  const toggleEditModal = (entry) => {
    setFile(entry);
    setEditModal(!editModal);
  };

  const toggleDeleteModal = (entry) => {
    setFile(entry);
    setDeleteModal(!deleteModal);
  };

  return (
    <div>
      <CCard className="mx-4">
        <div id="ioc66_files" class="box66">
          <div class="h">
            <div class="background-box" style={styleFile}>
              Files
            </div>
            {isPrescriptionModal === false ? (
              <div id="ioc66upload" class="icon-upload" title="Tải lên">
                <Icon.Upload
                  id="icon-upload-button"
                  width="16"
                  height="16"
                  onClick={() => setUploadModal(!uploadModal)}
                />
              </div>
            ) : (
              ""
            )}
            <div class="clear"></div>
          </div>
          <div class="slimScrollDiv">
            <div class="b box66h slimScrollDiv-element">
              <ul class="file-list-c">
                {files !== undefined && files.length > 0
                  ? files.map((entry) => (
                      <li>
                        <div class="i">
                          <d>{entry.createdAt}</d>
                          <div class="icons-file-list">
                            <Icon.Image
                              onClick={() => {
                                showViewModal(entry);
                              }}
                            ></Icon.Image>
                            {isPrescriptionModal === false ? (
                              <>
                                <Icon.PencilSquare
                                  class="icon-pencil-square"
                                  onClick={() => toggleEditModal(entry)}
                                />
                                <Icon.Trash
                                  class="icon-trash"
                                  onClick={() => toggleDeleteModal(entry)}
                                />
                              </>
                            ) : (
                              ""
                            )}
                          </div>
                          <t></t>
                          <h class="file-jpg">{entry.name}</h>
                          <div class="n"></div>
                        </div>
                      </li>
                    ))
                  : ""}
              </ul>
            </div>
          </div>
        </div>
      </CCard>
      <FileUploadModal
        modal={uploadModal}
        onClose={setUploadModal}
        patientId={patientId}
        retrieveFiles={retrieveFiles}
        labTestId={labTestId}
        setOpenSuccessModal={setOpenSuccessModal}
        setOpenErrorModal={setOpenErrorModal}
        setNotificationMessage={setNotificationMessage}
      />
      <ViewImageModal
        modal={viewModal}
        onClose={setViewModal}
        file={currentFile}
      />
      <FileUpdateModal
        modal={editModal}
        onClose={setEditModal}
        file={file}
        files={files}
        setFiles={setFiles}
      />
      <FileDeleteModal
        modal={deleteModal}
        onClose={setDeleteModal}
        file={file}
        files={files}
        setFiles={setFiles}
        setOpenSuccessModal={setOpenSuccessModal}
        setOpenErrorModal={setOpenErrorModal}
        setNotificationMessage={setNotificationMessage}
      />
    </div>
  );
};

export default FilesUpload;
