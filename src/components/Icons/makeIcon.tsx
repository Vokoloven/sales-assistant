import type {TIconComponent, IIconProps} from "./types/icon";

export const makeIcon = (
  Icon: TIconComponent,
  {viewBox: defaultViewBox, width: defaultWidth, height: defaultHeight, className: defaultClassName}: IIconProps = {},
) => {
  const IconWrapper = ({className, height, viewBox, width}: IIconProps) => {
    const props: IIconProps = {
      className: className ?? defaultClassName,
      height: height ?? defaultHeight,
      viewBox: viewBox ?? defaultViewBox,
      width: width ?? defaultWidth,
    };

    return <Icon {...props} />;
  };

  return IconWrapper;
};
