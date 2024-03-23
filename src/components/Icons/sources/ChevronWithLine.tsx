import type {IIconProps} from "../types/icon";

export const ChevronWithLine = ({viewBox = "0 0 24 24", width = "24", height = "24", className}: IIconProps) => (
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
      d="M5.29289 17.2929C4.90237 17.6834 4.90237 18.3166 5.29289 18.7071C5.68342 19.0976 6.31658 19.0976 6.70711 18.7071L12.7071 12.7071C13.0976 12.3166 13.0976 11.6834 12.7071 11.2929L6.70711 5.29289C6.31658 4.90237 5.68342 4.90237 5.29289 5.29289C4.90237 5.68342 4.90237 6.31658 5.29289 6.70711L10.5858 12L5.29289 17.2929ZM18 18C18 18.5523 17.5523 19 17 19C16.4477 19 16 18.5523 16 18V6C16 5.44772 16.4477 5 17 5C17.5523 5 18 5.44772 18 6V18Z"
    />
  </svg>
);
