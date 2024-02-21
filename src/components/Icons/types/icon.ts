export interface IIconProps {
  viewBox?: string;
  width?: string;
  height?: string;
  className?: string;
}

export type TIconComponent = ({viewBox, width, height, className}: IIconProps) => JSX.Element;
