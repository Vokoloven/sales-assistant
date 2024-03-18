import type {IIconProps} from "../types/icon";

export const ChevronSmall = ({viewBox = "0 0 16 16", width = "16", height = "16", className}: IIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox={viewBox}
    className={className}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8 9.5L3.5 5L2 6.5L7.5 12.0042H8.5L14 6.5L12.5 5L8 9.5Z"
    />
  </svg>
);
