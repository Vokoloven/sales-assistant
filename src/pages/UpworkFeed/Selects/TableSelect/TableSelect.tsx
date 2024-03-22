/* eslint-disable @typescript-eslint/no-unused-vars */
import {css} from "@emotion/css";
import {useVirtualizer} from "@tanstack/react-virtual";
import {useState, useEffect, useRef, ElementRef} from "react";
import Select, {
  components,
  OptionProps,
  MultiValueProps,
  DropdownIndicatorProps,
  ClearIndicatorProps,
  MenuListProps,
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
    return option[method](({value}) => value !== optionAll);
  }

  return option[method](({value}) => value === optionAll);
};

const TableSelect = ({
  options,
  setFilterValue,
  filterValue,
}: {
  options: IOptionInterface[];
  setFilterValue: (value: string[]) => void;
  filterValue: string[];
}) => {
  const combinedOptions = options && [{label: "ALL", value: "ALL"}, ...options];
  const [selectedOption, setSelectedOption] = useState<IOptionInterface[]>(() => {
    if (filterValue.length > 0) {
      return filterValue.reduce((acc: IOptionInterface[], val: string, index: number) => {
        if (options.length - 1 === index) {
          return (acc = [{value: optionAll, label: optionAll}, ...acc, {value: val, label: val}]);
        }

        return (acc = [...acc, {value: val, label: val}]);
      }, []);
    }
    return [];
  });
  const [isCheckboxIndeterminate, setIsCheckboxIndeterminate] = useState(() => {
    if (filterValue.length > 0 && filterValue.length !== options.length) {
      return true;
    }
    return false;
  });

  useEffect(() => {
    const clearOption = handleSelectedValue(selectedOption, "filter");
    if (Array.isArray(clearOption)) {
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

  const MenuList = ({children, ...rest}: MenuListProps<IOptionInterface, true>) => {
    const parentRef = useRef<ElementRef<"div">>(null);

    const rows = Array.isArray(children) ? children : [];

    const rowVirtualizer = useVirtualizer({
      count: rows.length,
      getScrollElement: () => parentRef.current,
      estimateSize: () => 50,
    });

    const virtualRows = rowVirtualizer.getVirtualItems();
    const virtualRowsLenth = virtualRows.length;
    const totalSize = rowVirtualizer.getTotalSize();
    const paddingTop = virtualRowsLenth > 0 ? virtualRows?.[0].start || 0 : 0;
    const paddingBottom = virtualRowsLenth > 0 ? totalSize - (virtualRows?.[virtualRowsLenth - 1]?.end || 0) : 0;

    return (
      <components.MenuList {...rest}>
        <div
          ref={parentRef}
          style={{
            width: "100%",
            height: 250,
            overflowY: "auto",
            contain: "strict",
            scrollbarWidth: "thin",
            WebkitOverflowScrolling: "touch",
          }}
        >
          <div style={{height: totalSize}}>
            <div>
              {paddingTop > 0 && <div style={{height: `${paddingTop}px`}}>test</div>}
              {virtualRows.map((virtualRow) => (
                <div
                  key={virtualRow.key}
                  data-index={virtualRow.index}
                  ref={rowVirtualizer.measureElement}
                >
                  {rows[virtualRow.index]}
                </div>
              ))}
              {paddingBottom > 0 && <div style={{height: `${[paddingBottom]}px`}}></div>}
            </div>
          </div>
        </div>
      </components.MenuList>
    );
  };

  return (
    <>
      <Select
        components={{
          IndicatorSeparator,
          ClearIndicator,
          DropdownIndicator,
          Option,
          MultiValue,
          MenuList,
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
        captureMenuScroll={false}
      />
    </>
  );
};

export default TableSelect;
