import {Column, Table} from "@tanstack/react-table";

import type {IUpworkResponseListFeedsDto} from "../../../submodules/interfaces/dto/upwork-feed/iupwork-response-list-feeds.dto";
import TableSelect from "../Selects/TableSelect/TableSelect";

const ScoreFilter = <T, U>({column, table}: {column: Column<T, U>; table: Table<T>}) => {
  const {scoreOptions} = table.options.meta as Pick<IUpworkResponseListFeedsDto, "scoreOptions">;

  const setFilterValue = (value: string[]) => {
    column.setFilterValue(value);
  };

  return (
    <TableSelect
      options={scoreOptions}
      setFilterValue={setFilterValue}
      filterValue={(column.getFilterValue() as string[]) ?? []}
    />
  );
};

export default ScoreFilter;
