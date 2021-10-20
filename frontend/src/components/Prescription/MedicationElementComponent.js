import { CInput } from "@coreui/react";
import { useState } from "react";
import * as Icon from "react-bootstrap-icons";

const MedicationElementComponent = ({
  index,
  removeMedicalService,
  setMedicalServices,
  medicalServices,
  medicalService,
}) => {
  const [name, setName] = useState(medicalService.name);
  const [quantity, setQuantity] = useState(medicalService.number);
  const [usage, setUsage] = useState(medicalService.usage);

  const onRemoveMedicationElement = () => {
    removeMedicalService(index);
  };

  const onChangeMedicationName = (event) => {
    const name = event.target.value;
    var a = [...medicalServices];
    a[index].name = name;
    setMedicalServices((prev) => [...a]);
    // setMedications(medications);
    setName(name);
  };

  const onChangeQuantity = (event) => {
    const quantity = event.target.value;
    console.log(quantity);
    var a = [...medicalServices];
    a[index].quantity = quantity;
    setMedicalServices((prev) => [...a]);
    setQuantity(quantity);
    console.log(medicalServices);
  };

  const onChangeUsage = (event) => {
    const usage = event.target.value;
    var a = [...medicalServices];
    a[index].usage = usage;
    setMedicalServices((prev) => [...a]);
    setUsage(usage);
  };

  const cursorPointerStyle = {
    cursor: "pointer",
  };

  return (
    <li v="48">
      <div class="l">0{index + 1}.</div>
      <div class="c">
        <div class="cl">
          <input
            type="text"
            name="ioc66_d_name"
            placeholder="Thuốc"
            value={medicalService.name}
            onChange={onChangeMedicationName}
            class="ioc_textbox txt-dot ioc66name readonly"
          />
        </div>
        <div class="cr">
          <span>Số lượng: </span>
          <CInput
            type="number"
            name="ioc66_d_num"
            value={medicalService.quantity}
            onChange={onChangeQuantity}
            data-d="3"
            class="ioc_textbox txt-dot ioc66num"
          />
          <span></span>
        </div>
        <div class="clear"></div>
        <div class="cb">
          <span>Cách dùng: </span>
          <input
            type="text"
            name="ioc66_d_use"
            value={medicalService.usage}
            onChange={onChangeUsage}
            class="ioc_textbox txt-dot ioc66use"
          />
        </div>
      </div>
      <div class="r">
        <Icon.Trash
          size="22"
          style={cursorPointerStyle}
          onClick={() => {
            onRemoveMedicationElement();
          }}
        />
      </div>
      <div class="clear"></div>
    </li>
  );
};

export default MedicationElementComponent;
