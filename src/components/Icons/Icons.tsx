import {IconAppName} from './constants';
import {makeIcon} from './makeIcon';
import {Eye} from './sources/Eye';
import type {TIconComponent} from './types/icon';

type TIcon = {
  [K in (typeof IconAppName)[keyof typeof IconAppName]]: TIconComponent;
};

const Icons: TIcon = {
  [IconAppName.SHOW_PASSWORD]: makeIcon(Eye),
};

export default Icons;
