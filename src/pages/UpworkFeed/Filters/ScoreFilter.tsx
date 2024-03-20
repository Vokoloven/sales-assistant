import {Column, Table} from "@tanstack/react-table";

import type {IUpworkResponseListFeedsDto} from "../../../submodules/interfaces/dto/upwork-feed/iupwork-response-list-feeds.dto";
import ScoreSelect from "../Selects/ScoreSelect/ScoreSelect";

const ScoreFilter = <T,>({column, table}: {column: Column<T, unknown>; table: Table<T>}) => {
  const {scoreOptions} = table.options.meta as Pick<IUpworkResponseListFeedsDto, "scoreOptions">;

  const setFilterValue = (value: string[]) => {
    column.setFilterValue(value);
  };

  return (
    <ScoreSelect
      options={scoreOptions}
      setFilterValue={setFilterValue}
      filterValue={(column.getFilterValue() as string[]) ?? []}
    />
  );
};

export default ScoreFilter;
