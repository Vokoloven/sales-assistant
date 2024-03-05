import {IconInstanceName} from "../constants";
import type {TIconComponent} from "../types/icon";

import {Chevron} from "./Chevron";
import {CollapseMenu} from "./CollapseMenu";
import {Cross} from "./Cross";
import {Dislike} from "./Dislike";
import {Eye} from "./Eye";
import {Feed} from "./Feed";
import {Like} from "./Like";
import {LogOut} from "./LogOut";
import {Menu} from "./Menu";
import {Moon} from "./Moon";
import {Sun} from "./Sun";
import {User} from "./User";

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
  Chevron,
  User,
  LogOut,
  Feed,
  Like,
  Dislike,
};
