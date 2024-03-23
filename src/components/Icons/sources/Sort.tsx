import type {IIconProps} from "../types/icon";

export const Sort = ({viewBox = "0 0 16 16", width = "16", height = "16", className}: IIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox={viewBox}
    className={className}
  >
    <path d="M6 12H8V13L5 16L2 13V12H4L4 6H6V12Z" />
    <path d="M10 4H8V3L11 0L14 3V4H12L12 10H10V4Z" />
  </svg>
);
