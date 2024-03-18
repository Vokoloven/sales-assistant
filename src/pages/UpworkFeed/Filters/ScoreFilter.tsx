/* eslint-disable @typescript-eslint/no-unused-vars */
import {Column, Table} from "@tanstack/react-table";
import Select, {components} from "react-select";

import Icons from "../../../components/Icons/Icons";

const ScoreFilter = <T,>({column}: {column: Column<T, unknown>; table: Table<T>}) => {
  return (
    // <Select
    //   components={{
    //     IndicatorSeparator: null,
    //     DropdownIndicator: (props) => {
    //       return (
    //         <components.DropdownIndicator {...props}>
    //           <Icons.ChevronDown />
    //         </components.DropdownIndicator>
    //       );
    //     },
    //   }}
    //   defaultValue={selectedOption}
    //   options={options}
    //   onChange={handleChange}
    //   styles={selectStyles(getTheme())}
    //   menuPlacement="top"
    // />
    null
  );
};

export default ScoreFilter;
