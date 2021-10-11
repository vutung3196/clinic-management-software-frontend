import React, { useState } from "react";
import {
  CButton,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CModalTitle,
  CContainer,
} from "@coreui/react";
import {
  Image,
  Video,
  Transformation,
  CloudinaryContext,
} from "cloudinary-react";

const ViewImageModal = ({ modal, onClose, file }) => {
  return (
    <CModal size="xl" show={modal} onClose={onClose}>
      <CModalHeader closeButton>
        <CModalTitle>Ảnh</CModalTitle>
      </CModalHeader>

      <CModalBody>
        <CContainer>
          <div id="_vw_file_content">
            <div>
              <Image
                cloudName="dzftzmcxb"
                secure="true"
                upload_preset="xdf93shk"
                publicId={file.publicId}
              >
                <Transformation
                  width="500"
                  height="500"
                  gravity="south"
                  crop="fill"
                />
              </Image>
            </div>
          </div>
        </CContainer>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => onClose(false)}>
          THOÁT
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

export default ViewImageModal;
