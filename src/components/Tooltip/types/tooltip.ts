import {KeyExtractor} from "../../../utils/types/keyExtractor";
import {IconAppName} from "../../Icons/constants";

interface IElement {
  id: string | number;
  text: string;
  iconAfter?: KeyExtractor<typeof IconAppName>;
  iconBefore?: KeyExtractor<typeof IconAppName>;
  onClick?: () => void;
}

export type TElements = Array<IElement>;
