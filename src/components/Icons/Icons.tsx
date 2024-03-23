import classnames from "classnames";

import {IconAppName} from "./constants";
import styles from "./Icons.module.scss";
import {makeIcon} from "./makeIcon";
import {IconInstance} from "./sources/sources";
import type {TIconComponent} from "./types/icon";

type TIcon = {
  [K in (typeof IconAppName)[keyof typeof IconAppName]]: TIconComponent;
};

const Icons: TIcon = {
  [IconAppName.ShowPassword]: makeIcon(IconInstance.Eye, {className: classnames(styles.icon, styles.showPassword)}),
  [IconAppName.Menu]: makeIcon(IconInstance.Menu, {className: styles.icon}),
  [IconAppName.CollapseMenu]: makeIcon(IconInstance.CollapseMenu, {className: styles.icon}),
  [IconAppName.Moon]: makeIcon(IconInstance.Moon, {className: styles.icon}),
  [IconAppName.Sun]: makeIcon(IconInstance.Sun, {className: styles.icon}),
  [IconAppName.Cross]: makeIcon(IconInstance.Cross, {className: styles.icon}),
  [IconAppName.ChevronRight]: makeIcon(IconInstance.Chevron, {className: styles.icon}),
  [IconAppName.User]: makeIcon(IconInstance.User, {className: styles.icon}),
  [IconAppName.LogOut]: makeIcon(IconInstance.LogOut, {className: styles.icon}),
  [IconAppName.Feed]: makeIcon(IconInstance.Feed, {className: styles.icon}),
  [IconAppName.Like]: makeIcon(IconInstance.Like, {className: styles.like}),
  [IconAppName.Dislike]: makeIcon(IconInstance.Dislike, {className: styles.dislike}),
  [IconAppName.ChevronDown]: makeIcon(IconInstance.Chevron, {
    className: classnames(styles.icon, styles.chevronDown),
  }),
  [IconAppName.ChevronWithLineRight]: makeIcon(IconInstance.ChevronWithLine, {className: styles.icon}),
  [IconAppName.ChevronLeft]: makeIcon(IconInstance.Chevron, {
    className: classnames(styles.icon, styles.chevronLeft),
  }),
  [IconAppName.ChevronWithLineLeft]: makeIcon(IconInstance.ChevronWithLine, {
    className: classnames(styles.icon, styles.chevronLeft),
  }),
  [IconAppName.Sort]: makeIcon(IconInstance.Sort, {className: styles.sort}),
  [IconAppName.SortDesc]: makeIcon(IconInstance.SortDesc, {className: styles.sort}),
  [IconAppName.SortAsc]: makeIcon(IconInstance.SortDesc, {className: classnames(styles.sort, styles.sortAsc)}),
  [IconAppName.HidePassword]: makeIcon(IconInstance.EyeCrossOut, {className: styles.icon}),
  [IconAppName.ClearInput]: makeIcon(IconInstance.DeleteRounded, {className: styles.deleteRounded}),
  [IconAppName.ChevronSmallDown]: makeIcon(IconInstance.ChevronSmall, {className: styles.icon}),
  [IconAppName.Refresh]: makeIcon(IconInstance.Refresh, {className: styles.icon}),
};

export default Icons;
