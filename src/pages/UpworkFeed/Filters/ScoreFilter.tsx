/* eslint-disable @typescript-eslint/no-unused-vars */
import {Column, Table, TableMeta} from "@tanstack/react-table";

import type {IUpworkResponseListFeedsDto} from "../../../submodules/interfaces/dto/upwork-feed/iupwork-response-list-feeds.dto";
import FormSelect from "../Selects/FormSelect/FormSelect";

const ScoreFilter = <T,>({column, table}: {column: Column<T, unknown>; table: Table<T>}) => {
  const {scoreOptions} = table.options.meta as Pick<IUpworkResponseListFeedsDto, "scoreOptions">;

  return <FormSelect options={scoreOptions} />;
};

export default ScoreFilter;
