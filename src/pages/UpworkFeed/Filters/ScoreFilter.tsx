/* eslint-disable @typescript-eslint/no-unused-vars */
import {Column, Table} from "@tanstack/react-table";

import type {IUpworkResponseListFeedsDto} from "../../../submodules/interfaces/dto/upwork-feed/iupwork-response-list-feeds.dto";
import TableSelect from "../Selects/TableSelect/TableSelect";

const ScoreFilter = <T,>({column, table}: {column: Column<T, unknown>; table: Table<T>}) => {
  const {scoreOptions} = table.options.meta as Pick<IUpworkResponseListFeedsDto, "scoreOptions">;

  return <TableSelect options={scoreOptions} />;
};

export default ScoreFilter;
