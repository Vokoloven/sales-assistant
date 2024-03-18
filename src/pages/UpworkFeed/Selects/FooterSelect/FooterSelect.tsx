import {useState} from "react";
import Select, {components} from "react-select";

import Icons from "../../../../components/Icons/Icons";
import {getTheme} from "../../../../hooks/useTheme";
import type {PaginationState} from "../../UpworkFeed";

import {selectStyles} from "./selectStyles";

export const options = [
  {value: 10, label: "10"},
  {value: 20, label: "20"},
  {value: 30, label: "30"},
  {value: 40, label: "40"},
  {value: 50, label: "50"},
] as const;

export type TOption = {
  [K in keyof (typeof options)[number]]: (typeof options)[number][K] extends number ? number : string;
};

const FooterSelect = ({
  pagination,
  setPagination,
}: {
  pagination: PaginationState;
  setPagination: React.Dispatch<React.SetStateAction<PaginationState>>;
}) => {
  const [selectedOption, setSelectedOption] = useState(() => {
    if (pagination) {
      return {value: pagination.pageSize, label: String(pagination.pageSize)};
    }

    return {value: 10, label: "10"};
  });

  const handleChange = (option: TOption | null): void => {
    setSelectedOption((prevSelectedOption) => ({...prevSelectedOption, ...option}));
    setPagination((prevPagination) => ({...prevPagination, pageSize: option!.value}));
  };

  return (
    <Select
      components={{
        IndicatorSeparator: null,
        DropdownIndicator: (props) => {
          return (
            <components.DropdownIndicator {...props}>
              <Icons.ChevronDown />
            </components.DropdownIndicator>
          );
        },
      }}
      defaultValue={selectedOption}
      options={options}
      onChange={handleChange}
      styles={selectStyles(getTheme())}
      menuPlacement="top"
    />
  );
};

export default FooterSelect;
