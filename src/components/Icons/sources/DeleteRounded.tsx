import type {IIconProps} from "../types/icon";

export const DeleteRounded = ({viewBox = "0 0 20 20", width = "20", height = "20", className}: IIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox={viewBox}
    className={className}
  >
    <g clipPath="url(#clip0_2596_9024)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 19.1668C15.0627 19.1668 19.1667 15.0628 19.1667 10.0002C19.1667 4.93755 15.0627 0.833496 10 0.833496C4.93743 0.833496 0.833374 4.93755 0.833374 10.0002C0.833374 15.0628 4.93743 19.1668 10 19.1668ZM13.9226 6.07757C14.2481 6.40301 14.2481 6.93065 13.9226 7.25609L11.1786 10.0002L13.9226 12.7442C14.2481 13.0697 14.2481 13.5973 13.9226 13.9228C13.5972 14.2482 13.0696 14.2482 12.7441 13.9228L10 11.1787L7.25596 13.9228C6.93053 14.2482 6.40289 14.2482 6.07745 13.9228C5.75201 13.5973 5.75201 13.0697 6.07745 12.7442L8.82153 10.0002L6.07745 7.25609C5.75201 6.93065 5.75201 6.40301 6.07745 6.07757C6.40289 5.75214 6.93053 5.75214 7.25596 6.07757L10 8.82165L12.7441 6.07757C13.0696 5.75214 13.5972 5.75214 13.9226 6.07757Z"
      />
    </g>
    <defs>
      <clipPath id="clip0_2596_9024">
        <rect
          width="20"
          height="20"
        />
      </clipPath>
    </defs>
  </svg>
);
