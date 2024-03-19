/* eslint-disable @typescript-eslint/no-unused-vars */
import {useState} from "react";
import Select, {components, OptionProps, GroupBase} from "react-select";

import ButtonIcon from "../../../../components/ButtonIcon/ButtonIcon";
import {ButtonIconStyle} from "../../../../components/ButtonIcon/constants";
import {IconAppName} from "../../../../components/Icons/constants";
import Icons from "../../../../components/Icons/Icons";
import {InputType} from "../../../../components/Input/constants";
import {InputStyle} from "../../../../components/Input/constants";
import Input from "../../../../components/Input/Input";
import {getTheme} from "../../../../hooks/useTheme";
import type {IOptionInterface} from "../../../../submodules/interfaces/dto/common/ioption.interface";

import {selectStyles} from "./selectStyles";

const optionAll = "ALL";

const TableSelect = ({options}: {options: IOptionInterface[]}) => {
  const combinedOptions = options && [{label: "ALL", value: "ALL"}, ...options];
  const [option, setOption] = useState<IOptionInterface[]>([]);

  const handleChange = (option: readonly IOptionInterface[]): void => {
    const isAllOptionSelected = (options: IOptionInterface[], option: readonly IOptionInterface[]): boolean => {
      const isSelectedOnlyAll = option.some(({value}) => value.toLocaleLowerCase() === optionAll.toLocaleLowerCase());

      if (isSelectedOnlyAll) return true;

      const sortedOptions = (options: readonly IOptionInterface[] | IOptionInterface[]) =>
        [...options].sort((a, b) => a.value.localeCompare(b.value));

      const isSelectedAllExceptAll =
        option.length === options.length &&
        sortedOptions(options).every(
          ({value}, index) => value.toLocaleLowerCase() === sortedOptions(option)[index].value.toLocaleLowerCase(),
        );

      if (isSelectedAllExceptAll) return true;

      return false;
    };

    if (isAllOptionSelected(options, option)) {
      setOption(combinedOptions);
      return;
    }

    setOption([...option]);
  };

  const CustomOption = (props: OptionProps<IOptionInterface, true>) => {
    return (
      <Input
        id={props.innerProps.id as string}
        name={props.data.value}
        type={InputType.Checkbox}
        label={props.label}
        forwardedRef={props.innerRef}
        inputStyle={InputStyle.Checkbox}
        checked={props.isSelected}
        readOnly
      />
    );
  };

  if (options) {
    return (
      <>
        <Select
          components={{
            IndicatorSeparator: null,
            ClearIndicator: (props) => (
              <components.ClearIndicator {...props}>
                <ButtonIcon
                  icon={IconAppName.ClearInput}
                  buttonIconStyle={ButtonIconStyle.Input}
                  ariaLabel={"Clear Input"}
                  onClick={() => setOption([])}
                />
              </components.ClearIndicator>
            ),
            DropdownIndicator: (props) => (
              <components.DropdownIndicator {...props}>
                <Icons.ChevronSmallDown />
              </components.DropdownIndicator>
            ),
            Option: (props) => (
              <components.Option {...props}>
                <CustomOption {...props} />
              </components.Option>
            ),
          }}
          placeholder=""
          onChange={handleChange}
          closeMenuOnSelect={false}
          options={combinedOptions}
          styles={selectStyles(getTheme())}
          isMulti
          value={option}
          escapeClearsValue={false}
          hideSelectedOptions={false}
        />
      </>
    );
  }
  return null;
};

export default TableSelect;
