/* eslint-disable @typescript-eslint/no-unused-vars */
import {css} from "@emotion/css";
import {useState} from "react";
import Select, {
  components,
  OptionProps,
  MultiValueProps,
  DropdownIndicatorProps,
  ClearIndicatorProps,
  IndicatorSeparatorProps,
} from "react-select";

import ButtonIcon from "../../../../components/ButtonIcon/ButtonIcon";
import {ButtonIconStyle} from "../../../../components/ButtonIcon/constants";
import {IconAppName} from "../../../../components/Icons/constants";
import Icons from "../../../../components/Icons/Icons";
import {InputType} from "../../../../components/Input/constants";
import {InputStyle} from "../../../../components/Input/constants";
import Input from "../../../../components/Input/Input";
import {getTheme} from "../../../../hooks/useTheme";
import type {IOptionInterface} from "../../../../submodules/interfaces/dto/common/ioption.interface";
import {KeyExtractor} from "../../../../utils/types/keyExtractor";

import {selectStyles} from "./selectStyles";

const optionAll = "ALL";

const ArrayMethod = {
  Filter: "filter",
  Some: "some",
} as const;

const ScoreSelect = ({options}: {options: IOptionInterface[]}) => {
  const combinedOptions = options && [{label: "ALL", value: "ALL"}, ...options];
  const [selectedOption, setSelectedOption] = useState<IOptionInterface[]>([]);

  const handleChange = (option: readonly IOptionInterface[]): void => {
    const handleSelectedValue = (
      option: IOptionInterface[] | readonly IOptionInterface[],
      method: KeyExtractor<typeof ArrayMethod> = ArrayMethod.Some,
    ): IOptionInterface[] | boolean => {
      if (method === ArrayMethod.Filter) {
        return option[method](({value}) => value.toLocaleLowerCase() !== optionAll.toLocaleLowerCase());
      }

      return option[method](({value}) => value.toLocaleLowerCase() === optionAll.toLocaleLowerCase());
    };

    setSelectedOption((prevSelectedOption) => {
      if (
        handleSelectedValue(prevSelectedOption) &&
        !handleSelectedValue(option) &&
        option.length < combinedOptions.length
      ) {
        return [];
      }

      if (option.length === combinedOptions.length - 1 && !handleSelectedValue(option)) {
        return [...combinedOptions];
      }

      if (!handleSelectedValue(prevSelectedOption) && handleSelectedValue(option)) {
        return [...combinedOptions];
      }

      const filteredOption = handleSelectedValue(option, "filter");

      return Array.isArray(filteredOption) ? filteredOption : [];
    });
  };

  const Option = (props: OptionProps<IOptionInterface, true>) => {
    return (
      <components.Option {...props}>
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
      </components.Option>
    );
  };

  const MultiValue = (props: MultiValueProps<IOptionInterface, true>) => {
    const maxToShow = 1;

    const multiValueStyle = props.getStyles("multiValue", props);
    const multiValueLabel = props.getStyles("multiValueLabel", props);

    if (props.index < maxToShow) {
      return <components.MultiValue {...props} />;
    } else if (props.index === maxToShow) {
      return (
        <div className={css(multiValueStyle)}>
          <div className={css(multiValueLabel)}>{`+${props.getValue().length - 1}`}</div>
        </div>
      );
    }

    return null;
  };

  const DropdownIndicator = (props: DropdownIndicatorProps<IOptionInterface, true>) => (
    <components.DropdownIndicator {...props}>
      <Icons.ChevronSmallDown />
    </components.DropdownIndicator>
  );

  const ClearIndicator = (props: ClearIndicatorProps<IOptionInterface, true>) => (
    <components.ClearIndicator {...props}>
      <ButtonIcon
        icon={IconAppName.ClearInput}
        buttonIconStyle={ButtonIconStyle.Input}
        ariaLabel={"Clear Input"}
        onClick={() => setSelectedOption([])}
      />
    </components.ClearIndicator>
  );

  const IndicatorSeparator = (props: IndicatorSeparatorProps<IOptionInterface, true>) => null;

  if (options) {
    return (
      <>
        <Select
          components={{
            IndicatorSeparator,
            ClearIndicator,
            DropdownIndicator,
            Option,
            MultiValue,
          }}
          placeholder=""
          onChange={handleChange}
          closeMenuOnSelect={false}
          options={combinedOptions}
          styles={selectStyles(getTheme())}
          isMulti
          value={selectedOption}
          escapeClearsValue={false}
          hideSelectedOptions={false}
          isSearchable={false}
        />
      </>
    );
  }
  return null;
};

export default ScoreSelect;
