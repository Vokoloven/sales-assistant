import type {StylesConfig} from "react-select";

const {Gray400, GrayA400, Gray100, Gray600, Black, White, Gray800, GrayA300} = colors;

type IsMulti = false;
import colors from "../../design/settings/colors.scss";
import type {ThemeMode} from "../../hooks/useTheme";
import {ThemeConfig} from "../../hooks/useTheme";

import type {TOption} from "./types/types";

export const selectStyles = (theme: ThemeMode) => {
  const selectStyles: StylesConfig<TOption, IsMulti> = {
    container: (base) => ({
      ...base,
      minWidth: 100,
    }),
    option: (base, state) => ({
      ...base,
      ...(theme === ThemeConfig.Light
        ? {backgroundColor: state.isSelected ? Gray600 : "inherit"}
        : {backgroundColor: state.isSelected ? Gray800 : "inherit"}),
      ...(theme === ThemeConfig.Light ? {color: Black} : {color: White}),
      "&:hover": {
        ...(theme === ThemeConfig.Light
          ? {backgroundColor: state.isSelected ? Gray600 : Gray100}
          : {backgroundColor: state.isSelected ? Gray800 : GrayA300}),
      },
    }),
    control: (base) => ({
      ...base,
      ...(theme === ThemeConfig.Light ? {borderColor: Gray400} : {borderColor: GrayA400}),
      ...(theme === ThemeConfig.Light ? {backgroundColor: White} : {backgroundColor: Black}),

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
      ...(theme === ThemeConfig.Light ? {border: `solid 1px ${Gray400}`} : {border: `solid 1px ${GrayA400}`}),
      boxShadow: "none",
      ...(theme === ThemeConfig.Light ? {backgroundColor: White} : {backgroundColor: Black}),
    }),
    menuList: (base) => ({
      ...base,
    }),
    singleValue: (base) => ({
      ...base,
      ...(theme === ThemeConfig.Light ? {color: Black} : {color: White}),
      margin: "0",
      lineHeight: 1.5,
    }),
    input: (base) => ({
      ...base,
      padding: "0",
      margin: "0",
      caretColor: "transparent",
    }),
    valueContainer: (base) => ({
      ...base,
      padding: "11px 12px",
    }),
  };

  return selectStyles;
};
