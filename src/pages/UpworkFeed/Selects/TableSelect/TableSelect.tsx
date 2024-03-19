/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// import {useState} from "react";
import {useState} from "react";
import Select, {components} from "react-select";

import ButtonIcon from "../../../../components/ButtonIcon/ButtonIcon";
import {ButtonIconStyle} from "../../../../components/ButtonIcon/constants";
import {IconAppName} from "../../../../components/Icons/constants";
import Icons from "../../../../components/Icons/Icons";
import {InputType} from "../../../../components/Input/constants";
import Input from "../../../../components/Input/Input";
import {getTheme} from "../../../../hooks/useTheme";
import type {IOptionInterface} from "../../../../submodules/interfaces/dto/common/ioption.interface";

import {selectStyles} from "./selectStyles";

const optionAll = "All";

const TableSelect = ({options}: {options: IOptionInterface[]}) => {
  const combinedOptions = options && [{label: "All", value: "ALL"}, ...options];
  const [option, setOption] = useState<IOptionInterface[]>([]);

  const handleChange = (option: readonly IOptionInterface[]): void => {
    const isAllOptionSelected = (options: IOptionInterface[], option: readonly IOptionInterface[]): boolean => {
      const isSelectedOnlyAll = option.some(({value}) => value.toLocaleLowerCase() === optionAll.toLocaleLowerCase());
      const isSelectedAllExceptAll =
        option.length === options.length &&
        options.every(({value}, index) => value.toLocaleLowerCase() === option[index].value.toLocaleLowerCase());

      if (isSelectedOnlyAll || isSelectedAllExceptAll) {
        return true;
      } else {
        return false;
      }
    };

    if (isAllOptionSelected(options, option)) {
      setOption(combinedOptions);
      return;
    }

    setOption([...option]);
  };

  if (options) {
    return (
      <>
        <Select
          components={{
            IndicatorSeparator: null,
            ClearIndicator: (props) => {
              return (
                <components.ClearIndicator {...props}>
                  <ButtonIcon
                    icon={IconAppName.ClearInput}
                    buttonIconStyle={ButtonIconStyle.Input}
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
      </>
    );
  }
  return null;
};

export default TableSelect;
