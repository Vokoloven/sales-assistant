import {IconInstanceName} from "../constants";
import type {TIconComponent} from "../types/icon";

import {CollapseMenu} from "./CollapseMenu";
import {Cross} from "./Cross";
import {Eye} from "./Eye";
import {Menu} from "./Menu";
import {Moon} from "./Moon";
import {Sun} from "./Sun";

type TIconInstance = {
  [K in (typeof IconInstanceName)[keyof typeof IconInstanceName]]: TIconComponent;
};

export const IconInstance: TIconInstance = {
  Eye,
  Menu,
  CollapseMenu,
  Sun,
  Moon,
  Cross,
};
