import {Column, Table} from "@tanstack/react-table";

import {IOptionInterface} from "../../../submodules/interfaces/dto/common/ioption.interface";
import TableSelect from "../Selects/TableSelect/TableSelect";

const ReactionFilter = <T, U>({column}: {column: Column<T, U>; table: Table<T>}) => {
  const reactionOptions = [
    {value: "Like", label: "Like"},
    {value: "Dislike", label: "Dislike"},
  ] as IOptionInterface[];

  const setFilterValue = (value: string[]) => {
    column.setFilterValue(value);
  };

  return (
    <TableSelect
      options={reactionOptions}
      setFilterValue={setFilterValue}
      filterValue={(column.getFilterValue() as string[]) ?? []}
    />
  );
};

export default ReactionFilter;
