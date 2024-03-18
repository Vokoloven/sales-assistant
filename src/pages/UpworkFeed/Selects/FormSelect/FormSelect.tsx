/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// import {useState} from "react";
import {useState} from "react";
import Select, {components} from "react-select";

import Icons from "../../../../components/Icons/Icons";
import {getTheme} from "../../../../hooks/useTheme";
import type {IOptionInterface} from "../../../../submodules/interfaces/dto/common/ioption.interface";

import {selectStyles} from "./selectStyles";

const FormSelect = ({options}: {options: IOptionInterface[]}) => {
  const [option, setOption] = useState<IOptionInterface[]>(() => {
    if (options) {
      return options;
    }
    return [];
  });

  if (options) {
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
        options={options}
        styles={selectStyles(getTheme())}
        isMulti
      />
    );
  }
  return null;
};

export default FormSelect;
