import type {TIconComponent, IIconProps} from "./types/icon";

export const makeIcon = (Icon: TIconComponent, {viewBox, width, height, className}: IIconProps = {}) => {
  const IconWrapper = () => {
    return (
      <Icon
        className={className}
        height={height}
        width={width}
        viewBox={viewBox}
      />
    );
  };

  return IconWrapper;
};
