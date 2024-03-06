import type {StylesConfig} from "react-select";

import colors from "../../design/settings/colors.scss";

const {Gray400, Gray100, Gray600, Black} = colors;
import type {TOption} from "./UpworkFeed";
type IsMulti = false;

export const selectStyles: StylesConfig<TOption, IsMulti> = {
  container: (base) => ({
    ...base,
    minWidth: 100,
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected ? Gray600 : "inherit",
    color: Black,
    "&:hover": {backgroundColor: state.isSelected ? Gray600 : Gray100},
  }),
  control: (base) => ({
    ...base,
    borderColor: Gray400,
    "&:hover": {
      borderColor: undefined,
    },
    outline: "none",
    boxShadow: "none",
  }),
  dropdownIndicator: (base, state) => ({
    ...base,
    transition: "all 0.2s ease-in-out",
    transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : undefined,
    padding: "11px 8px",
  }),
  menu: (base) => ({
    ...base,
    border: `solid 1px ${Gray400}`,
    boxShadow: "none",
  }),
  menuList: (base) => ({
    ...base,
    color: Black,
  }),
  singleValue: (base) => ({
    ...base,
    color: Black,
    margin: "0",
    lineHeight: 1.5,
  }),
  input: (base) => ({
    ...base,
    padding: "0",
    margin: "0",
  }),
  valueContainer: (base) => ({
    ...base,
    padding: "11px 12px",
  }),
};
