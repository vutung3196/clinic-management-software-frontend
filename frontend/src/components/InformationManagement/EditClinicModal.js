import React, { useState, useEffect } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CContainer,
  CFormGroup,
  CForm,
  CInput as textarea,
  CInputGroup as CFormControl,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  CCardHeader,
  CModal,
  CModalHeader,
  CModalBody,
  CModalTitle,
  CLabel as h4,
  CModalFooter,
  CInputGroup,
  CInput,
  CDropdown,
  CLabel,
  CAlert,
} from "@coreui/react";
import Autocomplete from "@mui/material/Autocomplete";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import clinicService from "src/services/clinicservice/clinic.service";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import FileUploadModal from "./FileUploadModal";

const EditClinicModal = ({
  modal,
  onClose,
  setClinic,
  clinic,
  file,
  setFile,
  setOpenSuccessModal,
  setOpenErrorModal,
  setNotificationMessage,
}) => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [provinces, setProvinces] = useState([]);
  const [address, setAddress] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [enabled, setEnabled] = useState(false);
  const [messages, setMessages] = useState([]);
  const [emailAddress, setEmailAddress] = useState("");
  const [addressDetail, setAddressDetail] = useState("");
  const [addressCity, setAddressCity] = useState("");
  const [addressDistrict, setAddressDistrict] = useState("");
  const [addressStreet, setAddressStreet] = useState("");
  const [uploadModal, setUploadModal] = useState(false);

  const cursorPointerStyle = {
    cursor: "pointer",
  };
  const { register, handleSubmit, errors, formState } = useForm({
    mode: "all",
  });
  const cities = [
    {
      name: "Thành phố Cần Thơ",
      districts: [
        "Huyện Cờ Đỏ",
        "Huyện Phong Điền",
        "Huyện Thới Lai",
        "Huyện Vĩnh Thạnh",
        "Quận Bình Thủy",
        "Quận Cái Răng",
        "Quận Ninh Kiều",
        "Quận Ô Môn",
        "Quận Thốt Nốt",
      ],
    },
    {
      name: "Thành phố Đà Nẵng",
      districts: [
        "Huyện Hòa Vang",
        "Huyện Hoàng Sa",
        "Quận Cẩm Lệ",
        "Quận Hải Châu",
        "Quận Liên Chiểu",
        "Quận Ngũ Hành Sơn",
        "Quận Sơn Trà",
        "Quận Thanh Khê",
      ],
    },
    {
      name: "Thành phố Hà Nội",
      districts: [
        "Huyện Ba Vì",
        "Huyện Chương Mỹ",
        "Huyện Đan Phượng",
        "Huyện Đông Anh",
        "Huyện Gia Lâm",
        "Huyện Hoài Đức",
        "Huyện Mê Linh",
        "Huyện Mỹ Đức",
        "Huyện Phú Xuyên",
        "Huyện Phúc Thọ",
        "Huyện Quốc Oai",
        "Huyện Sóc Sơn",
        "Huyện Thạch Thất",
        "Huyện Thanh Oai",
        "Huyện Thanh Trì",
        "Huyện Thường Tín",
        "Huyện Từ Liêm",
        "Huyện ứng Hòa",
        "Quận Ba Đình",
        "Quận Cầu Giấy",
        "Quận Đống Đa",
        "Quận Hà Đông",
        "Quận Hai Bà Trưng",
        "Quận Hoàn Kiếm",
        "Quận Hoàng Mai",
        "Quận Long Biên",
        "Quận Tây Hồ",
        "Quận Thanh Xuân",
        "Thị xã Sơn Tây",
      ],
    },
    {
      name: "Thành phố Hải Phòng",
      districts: [
        "Huyện An Dương",
        "Huyện An Lão",
        "Huyện Bạch Long Vĩ",
        "Huyện Cát Hải",
        "Huyện Kiến Thụy",
        "Huyện Thủy Nguyên",
        "Huyện Tiên Lãng",
        "Huyện Vĩnh Bảo",
        "Quận Đồ Sơn",
        "Quận Dương Kinh",
        "Quận Hải An",
        "Quận Hồng Bàng",
        "Quận Kiến An",
        "Quận Lê Chân",
        "Quận Ngô Quyền",
      ],
    },
    {
      name: "Thành phố Hồ Chí Minh",
      districts: [
        "Huyện Bình Chánh",
        "Huyện Cần Giờ",
        "Huyện Củ Chi",
        "Huyện Hóc Môn",
        "Huyện Nhà Bè",
        "Quận 1",
        "Quận 10",
        "Quận 11",
        "Quận 12",
        "Quận 2",
        "Quận 3",
        "Quận 4",
        "Quận 5",
        "Quận 6",
        "Quận 7",
        "Quận 8",
        "Quận 9",
        "Quận Bình Tân",
        "Quận Bình Thạnh",
        "Quận Gò Vấp",
        "Quận Phú Nhuận",
        "Quận Tân Bình",
        "Quận Tân Phú",
        "Quận Thủ Đức",
      ],
    },
    {
      name: "Tỉnh An Giang",
      districts: [
        "Huyện An Phú",
        "Huyện Châu Phú",
        "Huyện Châu Thành",
        "Huyện Chợ Mới",
        "Huyện Phú Tân",
        "Huyện Thoại Sơn",
        "Huyện Tịnh Biên",
        "Huyện Tri Tôn",
        "Thành phố Long Xuyên",
        "Thị xã Châu Đốc",
        "Thị xã Tân Châu",
      ],
    },
    {
      name: "Tỉnh Bà Rịa-Vũng Tàu",
      districts: [
        "Huyện Châu Đức",
        "Huyện Côn Đảo",
        "Huyện Đất Đỏ",
        "Huyện Long Điền",
        "Huyện Tân Thành",
        "Huyện Xuyên Mộc",
        "Thành phố Vũng Tàu",
        "Thị xã Bà Rịa",
      ],
    },
    {
      name: "Tỉnh Bắc Giang",
      districts: [
        "Huyện Hiệp Hòa",
        "Huyện Lạng Giang",
        "Huyện Lục Nam",
        "Huyện Lục Ngạn",
        "Huyện Sơn Động",
        "Huyện Tân Yên",
        "Huyện Việt Yên",
        "Huyện Yên Dũng",
        "Huyện Yên Thế",
        "Thành phố Bắc Giang",
      ],
    },
    {
      name: "Tỉnh Bắc Kạn",
      districts: [
        "Huyện Ba Bể",
        "Huyện Bạch Thông",
        "Huyện Chợ Đồn",
        "Huyện Chợ Mới",
        "Huyện Na Rì",
        "Huyện Ngân Sơn",
        "Huyện Pác Nặm",
        "Thị xã Bắc Kạn",
      ],
    },
    {
      name: "Tỉnh Bạc Liêu",
      districts: [
        "Huyện Đông Hải",
        "Huyện Giá Rai",
        "Huyện Hòa Bình",
        "Huyện Hồng Dân",
        "Huyện Phước Long",
        "Huyện Vĩnh Lợi",
        "Thành Phố Bạc Liêu",
      ],
    },
    {
      name: "Tỉnh Bắc Ninh",
      districts: [
        "Huyện Gia Bình",
        "Huyện Lương Tài",
        "Huyện Quế Võ",
        "Huyện Thuận Thành",
        "Huyện Tiên Du",
        "Huyện Yên Phong",
        "Thành phố Bắc Ninh",
        "Thị xã Từ Sơn",
      ],
    },
    {
      name: "Tỉnh Bến Tre",
      districts: [
        "Huyện Ba Tri",
        "Huyện Bình Đại",
        "Huyện Châu Thành",
        "Huyện Chợ Lách",
        "Huyện Giồng Trôm",
        "Huyện Mỏ Cày Bắc",
        "Huyện Mỏ Cày Nam",
        "Huyện Thạnh Phú",
        "Thành phố Bến Tre",
      ],
    },
    {
      name: "Tỉnh Bình Định",
      districts: [
        "Huyện An Lão",
        "Huyện An Nhơn",
        "Huyện Hoài  Ân",
        "Huyện Hoài Nhơn",
        "Huyện Phù Mỹ",
        "Huyện Phù cát",
        "Huyện Tây Sơn",
        "Huyện Tuy Phước",
        "Huyện Vân Canh",
        "Huyện Vĩnh Thạnh",
        "Thành phố Quy Nhơn",
      ],
    },
    {
      name: "Tỉnh Bình Dương",
      districts: [
        "Huyện Bến Cát",
        "Huyện Dầu Tiếng",
        "Huyện Dĩ An",
        "Huyện Phú Giáo",
        "Huyện Tân Uyên",
        "Huyện Thuận An",
        "Thị xã Thủ Dầu Một",
      ],
    },
    {
      name: "Tỉnh Bình Phước",
      districts: [
        "Huyện Bù Đăng",
        "Huyện Bù Đốp",
        "Huyện Bù Gia Mập",
        "Huyện Chơn Thành",
        "Huyện Đồng Phú",
        "Huyện Hớn Quản",
        "Huyện Lộc Ninh",
        "Thị xã Bình Long",
        "Thị xã Đồng Xoài",
        "Thị xã Phước Long",
      ],
    },
    {
      name: "Tỉnh Bình Thuận",
      districts: [
        "Huyện  Đức Linh",
        "Huyện Bắc Bình",
        "Huyện Hàm Tân",
        "Huyện Hàm Thuận Bắc",
        "Huyện Hàm Thuận Nam",
        "Huyện Phú Qúi",
        "Huyện Tánh Linh",
        "Huyện Tuy Phong",
        "Thành phố Phan Thiết",
        "Thị xã La Gi",
      ],
    },
    {
      name: "Tỉnh Cà Mau",
      districts: [
        "Huyện Cái Nước",
        "Huyện Đầm Dơi",
        "Huyện Năm Căn",
        "Huyện Ngọc Hiển",
        "Huyện Phú Tân",
        "Huyện Thới Bình",
        "Huyện Trần Văn Thời",
        "Huyện U Minh",
        "Thành phố Cà Mau",
      ],
    },
    {
      name: "Tỉnh Cao Bằng",
      districts: [
        "Huyện Bảo Lạc",
        "Huyện Bảo Lâm",
        "Huyện Hạ Lang",
        "Huyện Hà Quảng",
        "Huyện Hòa An",
        "Huyện Nguyên Bình",
        "Huyện Phục Hòa",
        "Huyện Quảng Uyên",
        "Huyện Thạch An",
        "Huyện Thông Nông",
        "Huyện Trà Lĩnh",
        "Huyện Trùng Khánh",
        "Thị xã Cao Bằng",
      ],
    },
    {
      name: "Tỉnh Đắk Lắk",
      districts: [
        "Huyện Buôn Đôn",
        "Huyện Cư Kuin",
        "Huyện Cư MGar",
        "Huyện Ea Kar",
        "Huyện Ea Súp",
        "Huyện EaHLeo",
        "Huyện Krông Ana",
        "Huyện Krông Bông",
        "Huyện Krông Búk",
        "Huyện Krông Năng",
        "Huyện Krông Pắc",
        "Huyện Lắk",
        "Huyện MDrắk",
        "Thành phố Buôn Ma Thuột",
        "Thị xã Buôn Hồ",
      ],
    },
    {
      name: "Tỉnh Đắk Nông",
      districts: [
        "Huyện Cư Jút",
        "Huyện Đắk GLong",
        "Huyện Đắk Mil",
        "Huyện Đắk RLấp",
        "Huyện Đắk Song",
        "Huyện KRông Nô",
        "Huyện Tuy Đức",
        "Thị xã Gia Nghĩa",
      ],
    },
    {
      name: "Tỉnh Điện Biên",
      districts: [
        "Huyện Điện Biên",
        "Huyện Điện Biên Đông",
        "Huyện Mường Chà",
        "Huyện Mương Nhé",
        "Huyện Mường ảng",
        "Huyện Tủa Chùa",
        "Huyện Tuần Giáo",
        "Thành phố Điện Biên phủ",
        "Thị xã Mường Lay",
      ],
    },
    {
      name: "Tỉnh Đồng Nai",
      districts: [
        "Huyện Cẩm Mỹ",
        "Huyện Định Quán",
        "Huyện Long Thành",
        "Huyện Nhơn Trạch",
        "Huyện Tân Phú",
        "Huyện Thống Nhất",
        "Huyện Trảng Bom",
        "Huyện Vĩnh Cửu",
        "Huyện Xuân Lộc",
        "Thành phố Biên Hòa",
        "Thị xã Long Khánh",
      ],
    },
    {
      name: "Tỉnh Đồng Tháp",
      districts: [
        "Huyện Cao Lãnh",
        "Huyện Châu Thành",
        "Huyện Hồng Ngự",
        "Huyện Lai Vung",
        "Huyện Lấp Vò",
        "Huyện Tam Nông",
        "Huyện Tân Hồng",
        "Huyện Thanh Bình",
        "Huyện Tháp Mười",
        "Thành phố Cao Lãnh",
        "Thị xã Hồng Ngự",
        "Thị xã Sa Đéc",
      ],
    },
    {
      name: "Tỉnh Gia Lai",
      districts: [
        "Huyện Chư Păh",
        "Huyện Chư Pưh",
        "Huyện Chư Sê",
        "Huyện ChưPRông",
        "Huyện Đăk Đoa",
        "Huyện Đăk Pơ",
        "Huyện Đức Cơ",
        "Huyện Ia Grai",
        "Huyện Ia Pa",
        "Huyện KBang",
        "Huyện KBang",
        "Huyện Kông Chro",
        "Huyện Krông Pa",
        "Huyện Mang Yang",
        "Huyện Phú Thiện",
        "Thành phố Plei Ku",
        "Thị xã AYun Pa",
        "Thị xã An Khê",
      ],
    },
    {
      name: "Tỉnh Hà Giang",
      districts: [
        "Huyện Bắc Mê",
        "Huyện Bắc Quang",
        "Huyện Đồng Văn",
        "Huyện Hoàng Su Phì",
        "Huyện Mèo Vạc",
        "Huyện Quản Bạ",
        "Huyện Quang Bình",
        "Huyện Vị Xuyên",
        "Huyện Xín Mần",
        "Huyện Yên Minh",
        "Thành Phố Hà Giang",
      ],
    },
    {
      name: "Tỉnh Hà Nam",
      districts: [
        "Huyện Bình Lục",
        "Huyện Duy Tiên",
        "Huyện Kim Bảng",
        "Huyện Lý Nhân",
        "Huyện Thanh Liêm",
        "Thành phố Phủ Lý",
      ],
    },
    {
      name: "Tỉnh Hà Tĩnh",
      districts: [
        "Huyện Cẩm Xuyên",
        "Huyện Can Lộc",
        "Huyện Đức Thọ",
        "Huyện Hương Khê",
        "Huyện Hương Sơn",
        "Huyện Kỳ Anh",
        "Huyện Lộc Hà",
        "Huyện Nghi Xuân",
        "Huyện Thạch Hà",
        "Huyện Vũ Quang",
        "Thành phố Hà Tĩnh",
        "Thị xã Hồng Lĩnh",
      ],
    },
    {
      name: "Tỉnh Hải Dương",
      districts: [
        "Huyện Bình Giang",
        "Huyện Cẩm Giàng",
        "Huyện Gia Lộc",
        "Huyện Kim Thành",
        "Huyện Kinh Môn",
        "Huyện Nam Sách",
        "Huyện Ninh Giang",
        "Huyện Thanh Hà",
        "Huyện Thanh Miện",
        "Huyện Tứ Kỳ",
        "Thành phố Hải Dương",
        "Thị xã Chí Linh",
      ],
    },
    {
      name: "Tỉnh Hậu Giang",
      districts: [
        "Huyện Châu Thành",
        "Huyện Châu Thành A",
        "Huyện Long Mỹ",
        "Huyện Phụng Hiệp",
        "Huyện Vị Thủy",
        "Thành Phố Vị Thanh",
        "Thị xã Ngã Bảy",
      ],
    },
    {
      name: "Tỉnh Hòa Bình",
      districts: [
        "Huyện Cao Phong",
        "Huyện Đà Bắc",
        "Huyện Kim Bôi",
        "Huyện Kỳ Sơn",
        "Huyện Lạc Sơn",
        "Huyện Lạc Thủy",
        "Huyện Lương Sơn",
        "Huyện Mai Châu",
        "Huyện Tân Lạc",
        "Huyện Yên Thủy",
        "Thành phố Hòa Bình",
      ],
    },
    {
      name: "Tỉnh Hưng Yên",
      districts: [
        "Huyện Ân Thi",
        "Huyện Khoái Châu",
        "Huyện Kim Động",
        "Huyện Mỹ Hào",
        "Huyện Phù Cừ",
        "Huyện Tiên Lữ",
        "Huyện Văn Giang",
        "Huyện Văn Lâm",
        "Huyện Yên Mỹ",
        "Thành phố Hưng Yên",
      ],
    },
    {
      name: "Tỉnh Khánh Hòa",
      districts: [
        "Huyện Cam Lâm",
        "Huyện Diên Khánh",
        "Huyện Khánh Sơn",
        "Huyện Khánh Vĩnh",
        "Huyện Ninh Hòa",
        "Huyện Trường Sa",
        "Huyện Vạn Ninh",
        "Thành phố Nha Trang",
        "Thị xã Cam Ranh",
      ],
    },
    {
      name: "Tỉnh Kiên Giang",
      districts: [
        "Huyện An Biên",
        "Huyện An Minh",
        "Huyện Châu Thành",
        "Huyện Giang Thành",
        "Huyện Giồng Riềng",
        "Huyện Gò Quao",
        "Huyện Hòn Đất",
        "Huyện Kiên Hải",
        "Huyện Kiên Lương",
        "Huyện Phú Quốc",
        "Huyện Tân Hiệp",
        "Huyện U Minh Thượng",
        "Huyện Vĩnh Thuận",
        "Thành phố Rạch Giá",
        "Thị xã Hà Tiên",
      ],
    },
    {
      name: "Tỉnh Kon Tum",
      districts: [
        "Huyện Đắk Glei",
        "Huyện Đắk Hà",
        "Huyện Đắk Tô",
        "Huyện Kon Plông",
        "Huyện Kon Rẫy",
        "Huyện Ngọc Hồi",
        "Huyện Sa Thầy",
        "Huyện Tu Mơ Rông",
        "Thành phố Kon Tum",
      ],
    },
    {
      name: "Tỉnh Lai Châu",
      districts: [
        "Huyện Mường Tè",
        "Huyện Phong Thổ",
        "Huyện Sìn Hồ",
        "Huyện Tam Đường",
        "Huyện Tân Uyên",
        "Huyện Than Uyên",
        "Thị xã Lai Châu",
      ],
    },
    {
      name: "Tỉnh Lâm Đồng",
      districts: [
        "Huyện Bảo Lâm",
        "Huyện Cát Tiên",
        "Huyện Đạ Huoai",
        "Huyện Đạ Tẻh",
        "Huyện Đam Rông",
        "Huyện Di Linh",
        "Huyện Đơn Dương",
        "Huyện Đức Trọng",
        "Huyện Lạc Dương",
        "Huyện Lâm Hà",
        "Thành phố Bảo Lộc",
        "Thành phố Đà Lạt",
      ],
    },
    {
      name: "Tỉnh Lạng Sơn",
      districts: [
        "Huyện Bắc Sơn",
        "Huyện Bình Gia",
        "Huyện Cao Lộc",
        "Huyện Chi Lăng",
        "Huyện Đình Lập",
        "Huyện Hữu Lũng",
        "Huyện Lộc Bình",
        "Huyện Tràng Định",
        "Huyện Văn Lãng",
        "Huyện Văn Quan",
        "Thành phố Lạng Sơn",
      ],
    },
    {
      name: "Tỉnh Lào Cai",
      districts: [
        "Huyện Bắc Hà",
        "Huyện Bảo Thắng",
        "Huyện Bảo Yên",
        "Huyện Bát Xát",
        "Huyện Mường Khương",
        "Huyện Sa Pa",
        "Huyện Si Ma Cai",
        "Huyện Văn Bàn",
        "Thành phố Lào Cai",
      ],
    },
    {
      name: "Tỉnh Long An",
      districts: [
        "Huyện Bến Lức",
        "Huyện Cần Đước",
        "Huyện Cần Giuộc",
        "Huyện Châu Thành",
        "Huyện Đức Hòa",
        "Huyện Đức Huệ",
        "Huyện Mộc Hóa",
        "Huyện Tân Hưng",
        "Huyện Tân Thạnh",
        "Huyện Tân Trụ",
        "Huyện Thạnh Hóa",
        "Huyện Thủ Thừa",
        "Huyện Vĩnh Hưng",
        "Thành phố Tân An",
      ],
    },
    {
      name: "Tỉnh Nam Định",
      districts: [
        "Huyện Giao Thủy",
        "Huyện Hải Hậu",
        "Huyện Mỹ Lộc",
        "Huyện Nam Trực",
        "Huyện Nghĩa Hưng",
        "Huyện Trực Ninh",
        "Huyện Vụ Bản",
        "Huyện Xuân Trường",
        "Huyện ý Yên",
        "Thành phố Nam Định",
      ],
    },
    {
      name: "Tỉnh Nghệ An",
      districts: [
        "Huyện Anh Sơn",
        "Huyện Con Cuông",
        "Huyện Diễn Châu",
        "Huyện Đô Lương",
        "Huyện Hưng Nguyên",
        "Huyện Kỳ Sơn",
        "Huyện Nam Đàn",
        "Huyện Nghi Lộc",
        "Huyện Nghĩa Đàn",
        "Huyện Quế Phong",
        "Huyện Quỳ Châu",
        "Huyện Quỳ Hợp",
        "Huyện Quỳnh Lưu",
        "Huyện Tân Kỳ",
        "Huyện Thanh Chương",
        "Huyện Tương Dương",
        "Huyện Yên Thành",
        "Thành phố Vinh",
        "Thị xã Cửa Lò",
        "Thị xã Thái Hòa",
      ],
    },
    {
      name: "Tỉnh Ninh Bình",
      districts: [
        "Huyện Gia Viễn",
        "Huyện Hoa Lư",
        "Huyện Kim Sơn",
        "Huyện Nho Quan",
        "Huyện Yên Khánh",
        "Huyện Yên Mô",
        "Thành phố Ninh Bình",
        "Thị xã Tam Điệp",
      ],
    },
    {
      name: "Tỉnh Ninh Thuận",
      districts: [
        "Huyên Bác ái",
        "Huyện Ninh Hải",
        "Huyện Ninh Phước",
        "Huyện Ninh Sơn",
        "Huyện Thuận Bắc",
        "Huyện Thuận Nam",
        "Thành phố Phan Rang-Tháp Chàm",
      ],
    },
    {
      name: "Tỉnh Phú Thọ",
      districts: [
        "Huyện Cẩm Khê",
        "Huyện Đoan Hùng",
        "Huyện Hạ Hòa",
        "Huyện Lâm Thao",
        "Huyện Phù Ninh",
        "Huyện Tam Nông",
        "Huyện Tân Sơn",
        "Huyện Thanh Ba",
        "Huyện Thanh Sơn",
        "Huyện Thanh Thủy",
        "Huyện Yên Lập",
        "Thành phố Việt Trì",
        "Thị xã Phú Thọ",
      ],
    },
    {
      name: "Tỉnh Phú Yên",
      districts: [
        "Huyện Đông Hòa",
        "Huyện Đồng Xuân",
        "Huyện Phú Hòa",
        "Huyện Sơn Hòa",
        "Huyện Sông Hinh",
        "Huyện Tây Hòa",
        "Huyện Tuy An",
        "Thành phố Tuy Hòa",
        "Thị xã Sông Cầu",
      ],
    },
    {
      name: "Tỉnh Quảng Bình",
      districts: [
        "Huyện Bố Trạch",
        "Huyện Lệ Thủy",
        "Huyện MinhHoá",
        "Huyện Quảng Ninh",
        "Huyện Quảng Trạch",
        "Huyện Tuyên Hoá",
        "Thành phố Đồng Hới",
      ],
    },
    {
      name: "Tỉnh Quảng Nam",
      districts: [
        "Huyện Bắc Trà My",
        "Huyện Đại Lộc",
        "Huyện Điện Bàn",
        "Huyện Đông Giang",
        "Huyện Duy Xuyên",
        "Huyện Hiệp Đức",
        "Huyện Nam Giang",
        "Huyện Nam Trà My",
        "Huyện Nông Sơn",
        "Huyện Núi Thành",
        "Huyện Phú Ninh",
        "Huyện Phước Sơn",
        "Huyện Quế Sơn",
        "Huyện Tây Giang",
        "Huyện Thăng Bình",
        "Huyện Tiên Phước",
        "Thành phố Hội An",
        "Thành phố Tam Kỳ",
      ],
    },
    {
      name: "Tỉnh Quảng Ngãi",
      districts: [
        "Huyện Ba Tơ",
        "Huyện Bình Sơn",
        "Huyện Đức Phổ",
        "Huyện Lý sơn",
        "Huyện Minh Long",
        "Huyện Mộ Đức",
        "Huyện Nghĩa Hành",
        "Huyện Sơn Hà",
        "Huyện Sơn Tây",
        "Huyện Sơn Tịnh",
        "Huyện Tây Trà",
        "Huyện Trà Bồng",
        "Huyện Tư Nghĩa",
        "Thành phố Quảng Ngãi",
      ],
    },
    {
      name: "Tỉnh Quảng Ninh",
      districts: [
        "Huyện Ba Chẽ",
        "Huyện Bình Liêu",
        "Huyện Cô Tô",
        "Huyện Đầm Hà",
        "Huyện Đông Triều",
        "Huyện Hải Hà",
        "Huyện Hoành Bồ",
        "Huyện Tiên Yên",
        "Huyện Vân Đồn",
        "Huyện Yên Hưng",
        "Thành phố Hạ Long",
        "Thành phố Móng Cái",
        "Thị xã Cẩm Phả",
        "Thị xã Uông Bí",
      ],
    },
    {
      name: "Tỉnh Quảng Trị",
      districts: [
        "Huyện Cam Lộ",
        "Huyện Cồn Cỏ",
        "Huyện Đa Krông",
        "Huyện Gio Linh",
        "Huyện Hải Lăng",
        "Huyện Hướng Hóa",
        "Huyện Triệu Phong",
        "Huyện Vính Linh",
        "Thành phố Đông Hà",
        "Thị xã Quảng Trị",
      ],
    },
    {
      name: "Tỉnh Sóc Trăng",
      districts: [
        "Huyện Châu Thành",
        "Huyện Cù Lao Dung",
        "Huyện Kế Sách",
        "Huyện Long Phú",
        "Huyện Mỹ Tú",
        "Huyện Mỹ Xuyên",
        "Huyện Ngã Năm",
        "Huyện Thạnh Trị",
        "Huyện Trần Đề",
        "Huyện Vĩnh Châu",
        "Thành phố Sóc Trăng",
      ],
    },
    {
      name: "Tỉnh Sơn La",
      districts: [
        "Huyện Bắc Yên",
        "Huyện Mai Sơn",
        "Huyện Mộc Châu",
        "Huyện Mường La",
        "Huyện Phù Yên",
        "Huyện Quỳnh Nhai",
        "Huyện Sông Mã",
        "Huyện Sốp Cộp",
        "Huyện Thuận Châu",
        "Huyện Yên Châu",
        "Thành phố Sơn La",
      ],
    },
    {
      name: "Tỉnh Tây Ninh",
      districts: [
        "Huyện Bến Cầu",
        "Huyện Châu Thành",
        "Huyện Dương Minh Châu",
        "Huyện Gò Dầu",
        "Huyện Hòa Thành",
        "Huyện Tân Biên",
        "Huyện Tân Châu",
        "Huyện Trảng Bàng",
        "Thị xã Tây Ninh",
      ],
    },
    {
      name: "Tỉnh Thái Bình",
      districts: [
        "Huyện Đông Hưng",
        "Huyện Hưng Hà",
        "Huyện Kiến Xương",
        "Huyện Quỳnh Phụ",
        "Huyện Thái Thụy",
        "Huyện Tiền Hải",
        "Huyện Vũ Thư",
        "Thành phố Thái Bình",
      ],
    },
    {
      name: "Tỉnh Thái Nguyên",
      districts: [
        "Huyện Đại Từ",
        "Huyện Định Hóa",
        "Huyện Đồng Hỷ",
        "Huyện Phổ Yên",
        "Huyện Phú Bình",
        "Huyện Phú Lương",
        "Huyện Võ Nhai",
        "Thành phố Thái Nguyên",
        "Thị xã Sông Công",
      ],
    },
    {
      name: "Tỉnh Thanh Hóa",
      districts: [
        "Huyện Bá Thước",
        "Huyện Cẩm Thủy",
        "Huyện Đông Sơn",
        "Huyện Hà Trung",
        "Huyện Hậu Lộc",
        "Huyện Hoằng Hóa",
        "Huyện Lang Chánh",
        "Huyện Mường Lát",
        "Huyện Nga Sơn",
        "Huyện Ngọc Lặc",
        "Huyện Như Thanh",
        "Huyện Như Xuân",
        "Huyện Nông Cống",
        "Huyện Quan Hóa",
        "Huyện Quan Sơn",
        "Huyện Quảng Xương",
        "Huyện Thạch Thành",
        "Huyện Thiệu Hóa",
        "Huyện Thọ Xuân",
        "Huyện Thường Xuân",
        "Huyện Tĩnh Gia",
        "Huyện Triệu Sơn",
        "Huyện Vĩnh Lộc",
        "Huyện Yên Định",
        "Thành phố Thanh Hóa",
        "Thị xã Bỉm Sơn",
        "Thị xã Sầm Sơn",
      ],
    },
    {
      name: "Tỉnh Thừa Thiên Huế",
      districts: [
        "Huyện A Lưới",
        "Huyện Hương Trà",
        "Huyện Nam Dông",
        "Huyện Phong Điền",
        "Huyện Phú Lộc",
        "Huyện Phú Vang",
        "Huyện Quảng Điền",
        "Thành phố Huế",
        "thị xã Hương Thủy",
      ],
    },
    {
      name: "Tỉnh Tiền Giang",
      districts: [
        "Huyện Cái Bè",
        "Huyện Cai Lậy",
        "Huyện Châu Thành",
        "Huyện Chợ Gạo",
        "Huyện Gò Công Đông",
        "Huyện Gò Công Tây",
        "Huyện Tân Phú Đông",
        "Huyện Tân Phước",
        "Thành phố Mỹ Tho",
        "Thị xã Gò Công",
      ],
    },
    {
      name: "Tỉnh Trà Vinh",
      districts: [
        "Huyện Càng Long",
        "Huyện Cầu Kè",
        "Huyện Cầu Ngang",
        "Huyện Châu Thành",
        "Huyện Duyên Hải",
        "Huyện Tiểu Cần",
        "Huyện Trà Cú",
        "Thành phố Trà Vinh",
      ],
    },
    {
      name: "Tỉnh Tuyên Quang",
      districts: [
        "Huyện Chiêm Hóa",
        "Huyện Hàm Yên",
        "Huyện Na hang",
        "Huyện Sơn Dương",
        "Huyện Yên Sơn",
        "Thành phố Tuyên Quang",
      ],
    },
    {
      name: "Tỉnh Vĩnh Long",
      districts: [
        "Huyện Bình Minh",
        "Huyện Bình Tân",
        "Huyện Long Hồ",
        "Huyện Mang Thít",
        "Huyện Tam Bình",
        "Huyện Trà Ôn",
        "Huyện Vũng Liêm",
        "Thành phố Vĩnh Long",
      ],
    },
    {
      name: "Tỉnh Vĩnh Phúc",
      districts: [
        "Huyện Bình Xuyên",
        "Huyện Lập Thạch",
        "Huyện Sông Lô",
        "Huyện Tam Đảo",
        "Huyện Tam Dương",
        "Huyện Vĩnh Tường",
        "Huyện Yên Lạc",
        "Thành phố Vĩnh Yên",
        "Thị xã Phúc Yên",
      ],
    },
    {
      name: "Tỉnh Yên Bái",
      districts: [
        "Huyện Lục Yên",
        "Huyện Mù Cang Chải",
        "Huyện Trạm Tấu",
        "Huyện Trấn Yên",
        "Huyện Văn Chấn",
        "Huyện Văn Yên",
        "Huyện Yên Bình",
        "Thành phố Yên Bái",
        "Thị xã Nghĩa Lộ",
      ],
    },
  ];

  useEffect(() => {
    setName(clinic.name);
    setUserName(clinic.username);
    setAddress(clinic.address);
    setPhoneNumber(clinic.phoneNumber);
    setEnabled(clinic.enabled);
    setEmailAddress(clinic.emailAddress);
    setAddressDetail(clinic.addressDetail);
    setAddressCity(clinic.addressCity);
    setAddressStreet(clinic.addressStreet);
    setAddressDistrict(clinic.addressDistrict);
  }, [clinic, modal]);

  const onChangeUsername = (value) => {
    setUserName(value);
  };

  const onChangeAddress = (value) => {
    setAddress(value);
  };

  const onChangePhoneNumber = (value) => {
    setPhoneNumber(value);
  };

  const onChangePassword = (value) => {
    setPassword(value);
  };

  const onChangeName = (value) => {
    setName(value);
  };

  const handleEnabledChange = (e) => {
    setEnabled(e.target.checked);
    console.log(enabled);
  };

  const handleEdit = () => {
    console.log("ahahahhaha");
    console.log(emailAddress);
    clinicService
      .editClinic(
        clinic.id,
        name,
        phoneNumber,
        emailAddress,
        "clinic.username",
        "password",
        addressDetail,
        addressStreet,
        addressDistrict,
        addressCity,
        true
      )
      .then(
        (response) => {
          setOpenSuccessModal(true);
          setNotificationMessage("Cập nhật phòng khám thành công");
          let updatedClinic = {
            id: clinic.id,
            name,
            phoneNumber,
            address,
            username,
            password,
            createdAt: clinic.createdAt,
            addressDetail,
            addressStreet,
            addressDistrict,
            addressCity,
            emailAddress: emailAddress,
          };
          updatedClinic.addressDetailInformation =
            updatedClinic.addressDetail +
            ", " +
            updatedClinic.addressStreet +
            ", " +
            updatedClinic.addressDistrict +
            ", " +
            updatedClinic.addressCity;
          setClinic(updatedClinic);
          onClose(false);
        },
        (error) => {
          if (error.response.data.errors !== undefined) {
            let arr = [];
            var error1 = error.response.data.errors.UserName;
            if (error1 !== undefined) {
              arr.push(error1);
            }
            var error2 = error.response.data.errors.Password;
            if (error2 !== undefined) {
              arr.push(error2);
            }

            var error3 = error.response.data.errors.Name;
            if (error3 !== undefined) {
              arr.push(error3);
            }

            var error4 = error.response.data.errors.EmailAddress;
            var error5 = error.response.data.errors.PhoneNumber;
            if (error4 !== undefined) {
              arr.push(error4);
            }
            if (error5 !== undefined) {
              arr.push(error5);
            }

            var errorMessage = "";
            for (let index = 0; index < arr.length; index++) {
              errorMessage += arr[index];
              if (index !== arr.length - 1) {
                errorMessage += " và ";
              }
            }
          }
          setOpenErrorModal(true);
          setNotificationMessage(errorMessage);
        }
      );
  };

  const closeModal = () => {
    setPassword(clinic.total);
    setName(clinic.description);
    setUserName(clinic.payerName);
    setMessages([]);
    onClose(!modal);
  };

  return (
    <CModal show={modal} onClose={closeModal}>
      <CModalHeader closeButton>
        <CModalTitle>Cập nhật phòng khám</CModalTitle>
      </CModalHeader>
      <form onSubmit={handleSubmit(handleEdit)} novalidate>
        <CModalBody>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                id="filled-full-width"
                value={name}
                onChange={(e) => onChangeName(e.target.value)}
                label="Tên phòng khám"
                required
                style={{ margin: 8 }}
                fullWidth
                margin="normal"
                variant="standard"
              />
            </Grid>
            <Grid item xs={12}>
              <PhoneInput
                defaultCountry="VN"
                id="filled-full-width"
                placeholder="Số điện thoại"
                value={phoneNumber}
                onChange={setPhoneNumber}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                id="filled-full-width"
                label="Email (ví dụ: abcde@gmail.com)"
                type="email"
                fullWidth
                required
                margin="normal"
                variant="standard"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                id="city"
                name="city"
                label="Logo"
                fullWidth
                autoComplete="shipping address-level2"
                variant="standard"
                value={file !== null ? file.name : ""}
              />
              <FileUploadIcon
                style={{ cursorPointerStyle }}
                onClick={() => setUploadModal(!uploadModal)}
              />
            </Grid>

            <Grid item xs={12} sm={7}>
              <Autocomplete
                options={cities}
                required
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    label="Tỉnh / TP"
                    margin="normal"
                    fullWidth
                  />
                )}
                value={addressCity}
                onChange={(event, newValue) => {
                  if (newValue != null) {
                    setAddressCity(newValue.name);
                    if (newValue.districts !== null) {
                      setProvinces(newValue.districts);
                      setAddressDistrict(newValue.districts[0]);
                    }
                  }
                }}
                getOptionLabel={(option) => {
                  if (typeof option === "string") {
                    return option;
                  }
                  if (option.name) {
                    return option.name;
                  }
                  return option.name;
                }}
              />
            </Grid>
            <Grid item xs={12} sm={7}>
              <Autocomplete
                options={provinces}
                freeSolo
                autoSelect
                required
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    label="Quận, huyện"
                    margin="normal"
                    fullWidth
                  />
                )}
                value={addressDistrict}
                onChange={(event, newValue) => {
                  setAddressDistrict(newValue);
                }}
                getOptionLabel={(option) => option}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                id="city"
                name="city"
                label="Phố"
                required
                fullWidth
                autoComplete="shipping address-level2"
                variant="standard"
                value={addressStreet}
                onChange={(e) => setAddressStreet(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="address2"
                name="address2"
                label="Số nhà, ngõ"
                required
                fullWidth
                autoComplete="shipping address-line2"
                variant="standard"
                value={addressDetail}
                onChange={(e) => setAddressDetail(e.target.value)}
              />
            </Grid>
          </Grid>
        </CModalBody>
        <CModalFooter>
          {messages.length > 0
            ? messages.map((message) => (
                <CAlert color="danger">{message}</CAlert>
              ))
            : ""}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            // disabled={isSubmitting}
          >
            Lưu
          </Button>
          <CButton color="secondary" onClick={() => closeModal()}>
            Hủy
          </CButton>
        </CModalFooter>
      </form>
      <FileUploadModal
        modal={uploadModal}
        onClose={setUploadModal}
        setFile={setFile}
        setOpenSuccessModal={setOpenSuccessModal}
        setOpenErrorModal={setOpenErrorModal}
        setNotificationMessage={setNotificationMessage}
      />
    </CModal>
  );
};

export default EditClinicModal;
