import type {FilterFn} from "@tanstack/react-table";

import type {IUpworkFeedItemDTO} from "../../../submodules/interfaces/dto/upwork-feed/iupwork-feed-item.dto";

export const dateFilterFn: FilterFn<IUpworkFeedItemDTO> = (row, columnId) => {
  return row.original[columnId];
};
