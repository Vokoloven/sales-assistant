/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// import {useState} from "react";
import {useState} from "react";
import Select, {components} from "react-select";

import ButtonIcon from "../../../../components/ButtonIcon/ButtonIcon";
import {ButtonIconVariant} from "../../../../components/ButtonIcon/constants";
import {IconAppName} from "../../../../components/Icons/constants";
import Icons from "../../../../components/Icons/Icons";
import {getTheme} from "../../../../hooks/useTheme";
import type {IOptionInterface} from "../../../../submodules/interfaces/dto/common/ioption.interface";

import {selectStyles} from "./selectStyles";

const FormSelect = ({options}: {options: IOptionInterface[]}) => {
  const combinedOptions = options && [{label: "All", value: "ALL"}, ...options];
  const [option, setOption] = useState<IOptionInterface[]>([]);

  const handleChange = (option: readonly IOptionInterface[]) => {
    const isAllOption = option.some(({value}) => value === "ALL");

    if (isAllOption) {
      setOption(combinedOptions);
      return;
    }

    setOption([...option]);
  };

  if (options) {
    return (
      <Select
        components={{
          IndicatorSeparator: null,
          ClearIndicator: (props) => {
            return (
              <components.ClearIndicator {...props}>
                <ButtonIcon
                  icon={IconAppName.ClearInput}
                  buttonIconVariant={ButtonIconVariant.Input}
                  ariaLabel={"Clear Input"}
                  onClick={() => setOption([])}
                />
              </components.ClearIndicator>
            );
          },
          DropdownIndicator: (props) => {
            return (
              <components.DropdownIndicator {...props}>
                <Icons.ChevronSmallDown />
              </components.DropdownIndicator>
            );
          },
        }}
        placeholder=""
        onChange={handleChange}
        closeMenuOnSelect={false}
        options={combinedOptions}
        styles={selectStyles(getTheme())}
        isMulti
        value={option}
      />
    );
  }
  return null;
};

export default FormSelect;
