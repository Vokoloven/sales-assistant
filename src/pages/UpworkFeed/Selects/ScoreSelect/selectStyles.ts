/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type {StylesConfig} from "react-select";

const {Gray400, Gray100, Gray600, Black, White, Gray800, GrayA300, GrayA800, BlueA200, BlueA700} = colors;

type IsMulti = true;
import colors from "../../../../design/settings/colors.scss";
import type {ThemeMode} from "../../../../hooks/useTheme";
import {ThemeConfig} from "../../../../hooks/useTheme";
import type {IOptionInterface} from "../../../../submodules/interfaces/dto/common/ioption.interface";

export const selectStyles = (theme: ThemeMode) => {
  const selectStyles: StylesConfig<IOptionInterface, IsMulti> = {
    container: (base) => ({
      ...base,
      minWidth: 100,
    }),
    option: (base, state) => ({
      ...base,
      ...(theme === ThemeConfig.Light
        ? {backgroundColor: state.isSelected ? "inherit" : "inherit"}
        : {backgroundColor: state.isSelected ? "inherit" : "inherit"}),
      ...(theme === ThemeConfig.Light ? {color: Black} : {color: White}),
      "&:hover": {
        ...(theme === ThemeConfig.Light
          ? {backgroundColor: state.isSelected ? Gray600 : Gray100}
          : {backgroundColor: state.isSelected ? Gray800 : GrayA300}),
      },
    }),
    control: (base) => ({
      ...base,
      ...(theme === ThemeConfig.Light ? {borderColor: Gray400} : {borderColor: Gray400}),
      ...(theme === ThemeConfig.Light ? {backgroundColor: White} : {backgroundColor: Black}),

      "&:hover": {
        borderColor: undefined,
      },
      outline: "none",
      boxShadow: "none",
      borderRadius: "8px",
    }),
    dropdownIndicator: (base, state) => ({
      ...base,
      transition: "all 0.2s ease-in-out",
      transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : undefined,
      padding: "11px 8px",
    }),
    menu: (base) => ({
      ...base,
      ...(theme === ThemeConfig.Light ? {border: `solid 1px ${Gray400}`} : {border: `solid 1px ${Gray400}`}),
      boxShadow: "none",
      ...(theme === ThemeConfig.Light ? {backgroundColor: White} : {backgroundColor: Black}),
      borderRadius: "8px",
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
    }),
    valueContainer: (base) => ({
      ...base,
      padding: "11px 12px",
      fontSize: "14px",
      lineHeight: "20px",
    }),
    multiValue: (base) => ({
      ...base,
      ...(theme === ThemeConfig.Light ? {backgroundColor: Gray400} : {backgroundColor: GrayA300}),
      "&:first-child": {marginRight: "auto"},
    }),
    multiValueLabel: (base) => ({
      ...base,
      ...(theme === ThemeConfig.Light ? {color: White} : {color: White}),
    }),
    multiValueRemove: (base) => ({
      ...base,
      "&:hover": {
        ...(theme === ThemeConfig.Light ? {backgroundColor: BlueA700} : {backgroundColor: BlueA200}),
      },
      "& > svg": {
        fill: White,
      },
      "&:hover > svg": {
        ...(theme === ThemeConfig.Light ? {fill: White} : {fill: White}),
      },
    }),
  };

  return selectStyles;
};
