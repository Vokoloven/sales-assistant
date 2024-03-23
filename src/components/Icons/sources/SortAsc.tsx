import type {IIconProps} from "../types/icon";

export const SortDesc = ({viewBox = "0 0 10 15", width = "15", height = "15", className}: IIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox={viewBox}
    className={className}
  >
    <g>
      <path d="M6 9L10 9V10L5 15L0 10V9H4V0L6 4.76995e-08V9Z" />
    </g>
  </svg>
);
