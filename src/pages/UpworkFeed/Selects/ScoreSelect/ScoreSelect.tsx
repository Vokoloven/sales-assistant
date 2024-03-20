/* eslint-disable @typescript-eslint/no-unused-vars */
import {css} from "@emotion/css";
import {useState, useEffect} from "react";
import Select, {
  components,
  OptionProps,
  MultiValueProps,
  DropdownIndicatorProps,
  ClearIndicatorProps,
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

const handleSelectedValue = (
  option: IOptionInterface[] | readonly IOptionInterface[],
  method: KeyExtractor<typeof ArrayMethod> = ArrayMethod.Some,
): IOptionInterface[] | boolean => {
  if (method === ArrayMethod.Filter) {
    return option[method](({value}) => value.toLocaleLowerCase() !== optionAll.toLocaleLowerCase());
  }

  return option[method](({value}) => value.toLocaleLowerCase() === optionAll.toLocaleLowerCase());
};

const ScoreSelect = ({
  options,
  setFilterValue,
}: {
  options: IOptionInterface[];
  setFilterValue: (value: string[]) => void;
}) => {
  const combinedOptions = options && [{label: "ALL", value: "ALL"}, ...options];
  const [selectedOption, setSelectedOption] = useState<IOptionInterface[]>([]);
  const [isCheckboxIndeterminate, setIsCheckboxIndeterminate] = useState(false);

  console.log(selectedOption);

  useEffect(() => {
    const clearOption = handleSelectedValue(selectedOption, "filter");
    if (Array.isArray(clearOption) && clearOption.length > 0) {
      const resultAsArray = clearOption.reduce((acc: string[], val: IOptionInterface) => {
        return [...acc, val.value];
      }, []);
      setFilterValue(resultAsArray);
    }
  }, [JSON.stringify(selectedOption)]);

  const handleChange = (option: readonly IOptionInterface[]): void => {
    setSelectedOption((prevSelectedOption) => {
      if (
        handleSelectedValue(prevSelectedOption) &&
        !handleSelectedValue(option) &&
        option.length < combinedOptions.length
      ) {
        setIsCheckboxIndeterminate(false);
        return [];
      }

      if (option.length === combinedOptions.length - 1 && !handleSelectedValue(option)) {
        setIsCheckboxIndeterminate(false);
        return [...combinedOptions];
      }

      if (!handleSelectedValue(prevSelectedOption) && handleSelectedValue(option)) {
        setIsCheckboxIndeterminate(false);
        return [...combinedOptions];
      }

      const filteredOption = handleSelectedValue(option, "filter");

      if (Array.isArray(filteredOption) && filteredOption.length !== 0) {
        setIsCheckboxIndeterminate(true);
      } else {
        setIsCheckboxIndeterminate(false);
      }

      return Array.isArray(filteredOption) ? filteredOption : [];
    });
  };

  const handleOptionStyle = ({data: {value}}: OptionProps<IOptionInterface, true>) => {
    if (value === optionAll && isCheckboxIndeterminate) {
      return InputStyle.CheckboxIndeterminate;
    }

    return InputStyle.Checkbox;
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
          inputStyle={handleOptionStyle(props)}
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

  const IndicatorSeparator = () => null;

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
