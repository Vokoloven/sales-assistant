import {IconAppName} from './constants';
import {makeIcon} from './makeIcon';
import {IconInstance} from './sources/sources';
import type {TIconComponent} from './types/icon';

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
};

export default Icons;
