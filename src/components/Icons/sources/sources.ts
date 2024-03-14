import {IconInstanceName} from "../constants";
import type {TIconComponent} from "../types/icon";

import {Chevron} from "./Chevron";
import {ChevronWithLine} from "./ChevronWithLine";
import {CollapseMenu} from "./CollapseMenu";
import {Cross} from "./Cross";
import {Dislike} from "./Dislike";
import {Eye} from "./Eye";
import {EyeCrossOut} from "./EyeCrossOut";
import {Feed} from "./Feed";
import {Like} from "./Like";
import {LogOut} from "./LogOut";
import {Menu} from "./Menu";
import {Moon} from "./Moon";
import {Sort} from "./Sort";
import {SortDesc} from "./SortAsc";
import {Sun} from "./Sun";
import {User} from "./User";

type TIconInstance = {
  [K in (typeof IconInstanceName)[keyof typeof IconInstanceName]]: TIconComponent;
};

export const IconInstance: TIconInstance = {
  Eye,
  EyeCrossOut,
  Menu,
  CollapseMenu,
  Sun,
  Moon,
  Cross,
  Chevron,
  User,
  LogOut,
  Feed,
  Like,
  Dislike,
  ChevronWithLine,
  Sort,
  SortDesc,
};
