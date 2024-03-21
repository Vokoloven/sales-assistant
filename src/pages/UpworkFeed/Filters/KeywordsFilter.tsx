import {Column, Table} from "@tanstack/react-table";

import type {IUpworkResponseListFeedsDto} from "../../../submodules/interfaces/dto/upwork-feed/iupwork-response-list-feeds.dto";
import TableSelect from "../Selects/TableSelect/TableSelect";

const KeywordsFilter = <T,>({column, table}: {column: Column<T, unknown>; table: Table<T>}) => {
  const {keywordsOptions} = table.options.meta as Pick<IUpworkResponseListFeedsDto, "keywordsOptions">;

  const setFilterValue = (value: string[]) => {
    column.setFilterValue(value);
  };

  return (
    <TableSelect
      options={keywordsOptions}
      setFilterValue={setFilterValue}
      filterValue={(column.getFilterValue() as string[]) ?? []}
    />
  );
};

export default KeywordsFilter;
