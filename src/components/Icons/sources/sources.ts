import {CollapseMenu} from "./CollapseMenu";
import {Eye} from "./Eye";
import {Menu} from "./Menu";
import {Moon} from "./Moon";
import {Sun} from "./Sun";
import {IconInstanceName} from "../constants";
import type {TIconComponent} from "../types/icon";

type TIconInstance = {
  [K in (typeof IconInstanceName)[keyof typeof IconInstanceName]]: TIconComponent;
};

export const IconInstance: TIconInstance = {
  Eye,
  Menu,
  CollapseMenu,
  Sun,
  Moon,
};
