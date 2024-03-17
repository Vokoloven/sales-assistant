import {Column, Table} from "@tanstack/react-table";

import {IconAppName} from "../../../components/Icons/constants";
import {InputType} from "../../../components/Input/constants";
import {InputStyle} from "../../../components/Input/constants";
import Input from "../../../components/Input/Input";

const DateFilter = <T,>({column}: {column: Column<T, unknown>; table: Table<T>}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    column.setFilterValue(event.target.value);
  };

  const isDirtyField = Boolean(column.getFilterValue());

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
};

export default DateFilter;
