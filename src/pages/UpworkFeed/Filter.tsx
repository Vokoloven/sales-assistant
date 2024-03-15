/* eslint-disable @typescript-eslint/no-explicit-any */
import {Column, Table} from "@tanstack/react-table";

import {IconAppName} from "../../components/Icons/constants";
import {InputType} from "../../components/Input/constants";
import {InputStyle} from "../../components/Input/constants";
import Input from "../../components/Input/Input";

const Filter = <T,>({column, table}: {column: Column<T, unknown>; table: Table<T>}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    column.setFilterValue(event.target.value);
  };

  const firstValue = table.getPreFilteredRowModel().flatRows[0]?.getValue(column.id);
  const isDirtyField = Boolean(column.getFilterValue());

  if (typeof firstValue === "string") {
    return (
      <Input
        id={column.id}
        name={column.id}
        type={InputType.Text}
        onChange={handleChange}
        buttonIcon={
          isDirtyField
            ? {icon: IconAppName.ClearInput, ariaLabel: "Clear field", onClick: () => column.setFilterValue("")}
            : undefined
        }
        value={(column.getFilterValue() ?? "") as string}
        inputStyle={InputStyle.Form}
      />
    );
  }

  return null;
};

export default Filter;
