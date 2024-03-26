import React from "react";

import Button from "../../Button/Button";
import ButtonIcon from "../../ButtonIcon/ButtonIcon";
import {ButtonIconStyle} from "../../ButtonIcon/constants";
import {IconAppName} from "../../Icons/constants";
import {InputType} from "../../Input/constants";
import {InputStyle} from "../../Input/constants";
import Input from "../../Input/Input";

import styles from "./ModalInstance.module.scss";

interface IProps {
  handleOpen: () => void;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
}

const CreateChat = ({handleOpen, value, onChange, handleSubmit}: IProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h3 className={styles.headerText}>Create chat name</h3>
        <ButtonIcon
          icon={IconAppName.Close}
          buttonIconStyle={ButtonIconStyle.Input}
          onClick={handleOpen}
        />
      </div>
      <Input
        id={"chatName"}
        name={"chatName"}
        type={InputType.Text}
        inputStyle={InputStyle.Table}
        label={"Chat history name"}
        value={value}
        onChange={onChange}
      />
      <div className={styles.buttons}>
        <div>
          <Button
            text={"No, Keep it"}
            onClick={handleOpen}
          />
        </div>
        <div>
          <Button
            text={"Yes, Create it"}
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateChat;
