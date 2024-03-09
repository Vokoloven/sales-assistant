import {IconAppName} from "./constants";
import styles from "./Icons.module.scss";
import {makeIcon} from "./makeIcon";
import {IconInstance} from "./sources/sources";
import type {TIconComponent} from "./types/icon";

type TIcon = {
  [K in (typeof IconAppName)[keyof typeof IconAppName]]: TIconComponent;
};

const Icons: TIcon = {
  [IconAppName.ShowPassword]: makeIcon(IconInstance.Eye),
  [IconAppName.Menu]: makeIcon(IconInstance.Menu),
  [IconAppName.CollapseMenu]: makeIcon(IconInstance.CollapseMenu),
  [IconAppName.Moon]: makeIcon(IconInstance.Moon),
  [IconAppName.Sun]: makeIcon(IconInstance.Sun),
  [IconAppName.Cross]: makeIcon(IconInstance.Cross),
  [IconAppName.ChevronRight]: makeIcon(IconInstance.Chevron),
  [IconAppName.User]: makeIcon(IconInstance.User),
  [IconAppName.LogOut]: makeIcon(IconInstance.LogOut),
  [IconAppName.Feed]: makeIcon(IconInstance.Feed),
  [IconAppName.Like]: makeIcon(IconInstance.Like),
  [IconAppName.Dislike]: makeIcon(IconInstance.Dislike),
  [IconAppName.ChevronDown]: makeIcon(IconInstance.Chevron, {
    className: styles.chevronDown,
  }),
  [IconAppName.ChevronWithLineRight]: makeIcon(IconInstance.ChevronWithLine, {className: styles.chevron}),
  [IconAppName.ChevronLeft]: makeIcon(IconInstance.Chevron, {
    className: styles.chevronLeft,
  }),
  [IconAppName.ChevronWithLineLeft]: makeIcon(IconInstance.ChevronWithLine, {
    className: styles.chevronLeft,
  }),
  [IconAppName.Sort]: makeIcon(IconInstance.Sort, {className: styles.sort}),
};

export default Icons;
