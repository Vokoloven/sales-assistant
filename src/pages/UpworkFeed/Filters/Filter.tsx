import {Column, Table} from "@tanstack/react-table";
import {useState, useEffect} from "react";

import {IconAppName} from "../../../components/Icons/constants";
import {InputType} from "../../../components/Input/constants";
import {InputStyle} from "../../../components/Input/constants";
import Input from "../../../components/Input/Input";
import {UpworkFeedSortBy} from "../../../submodules/enums/upwork-feed/upwork-feed-sort-by.enum";

const Filter = <T, U>({column}: {column: Column<T, U>; table: Table<T>}) => {
  const [value, setValue] = useState("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(event.target.value);
  };

  const isDirtyField = Boolean(column.getFilterValue());

  const {id} = column;

  useEffect(() => {
    if (value) {
      const timeoutId = setTimeout(() => {
        column.setFilterValue(value);
      }, 500);

      return () => clearTimeout(timeoutId);
    }
  }, [value]);

  if (id === UpworkFeedSortBy.Title) {
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
        value={value || ((column.getFilterValue() ?? "") as string)}
        inputStyle={InputStyle.Table}
      />
    );
  }

  return null;
};

export default Filter;
