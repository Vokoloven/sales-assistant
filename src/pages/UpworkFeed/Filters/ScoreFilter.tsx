/* eslint-disable @typescript-eslint/no-unused-vars */
import {Column, Table} from "@tanstack/react-table";

import type {IUpworkResponseListFeedsDto} from "../../../submodules/interfaces/dto/upwork-feed/iupwork-response-list-feeds.dto";
import ScoreSelect from "../Selects/ScoreSelect/ScoreSelect";

const ScoreFilter = <T,>({column, table}: {column: Column<T, unknown>; table: Table<T>}) => {
  const {scoreOptions} = table.options.meta as Pick<IUpworkResponseListFeedsDto, "scoreOptions">;

  return <ScoreSelect options={scoreOptions} />;
};

export default ScoreFilter;
