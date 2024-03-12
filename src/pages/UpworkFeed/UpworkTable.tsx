/* eslint-disable indent */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {Table, flexRender, Column} from "@tanstack/react-table";
import classnames from "classnames";
import {format} from "date-fns";
import {useState, forwardRef} from "react";
import DatePicker from "react-datepicker";
import Select from "react-select";

import {InputType} from "../../components/Input/constants";
import {InputStyle} from "../../components/Input/constants";
import Input from "../../components/Input/Input";
import {getTheme} from "../../hooks/useTheme";

import {AccessorKey} from "./constants";
import {selectStyles} from "./selectStyles";

import "react-datepicker/dist/react-datepicker.css";
interface IProps<T> {
  table: Table<T>;
  styles: {[x: string]: string};
}

function Filter({column}: {column: Column<any, any>; table: Table<any>}) {
  const [startDate, setStartDate] = useState("");
  const columnFilterValue = column.getFilterValue();
  const {id} = column;
  const theme = getTheme();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    column.setFilterValue(e.target.value);
  };

  const DateInput = forwardRef(({value, onClick}: {value?: string | number; onClick?: () => void}, ref) => {
    return (
      <Input
        id={InputType.Date}
        name={InputType.Date}
        type={InputType.Text}
        value={value}
        onChange={onChange}
        onClick={onClick}
        forwardedRef={ref}
        inputStyle={InputStyle.Form}
      />
    );
  });

  if (id === AccessorKey.Title)
    return (
      <Input
        id={id}
        name={id}
        type={InputType.Text}
        value={(columnFilterValue ?? "") as string}
        onChange={onChange}
        inputStyle={InputStyle.Form}
      />
    );

  if (id === AccessorKey.Published)
    return (
      <DatePicker
        selected={startDate}
        onChange={(date: Date) => {
          setStartDate(format(date, "MM/dd/yyyy"));
          column.setFilterValue(format(date, "MM/dd/yyyy"));
        }}
        customInput={<DateInput />}
      />
    );

  const options = [
    {value: 30, label: "0 - 100"},
    {value: 150, label: "100 - 150"},
    {value: 200, label: "150 - 200"},
  ];

  if (id === AccessorKey.Score) {
    const handleChange = (option: any): void => {
      column.setFilterValue(option.value);
    };

    return (
      <Select
        options={options}
        onChange={handleChange}
        styles={selectStyles(theme)}
      />
    );
  }

  return null;
}

const UpworkTable = <T,>({table, styles}: IProps<T>) => {
  return (
    <table className={styles.table}>
      <thead className={styles.thead}>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr
            key={headerGroup.id}
            className={styles.tr}
          >
            {headerGroup.headers.map((header) => {
              return (
                <th
                  onClick={() => console.log(header.column.columnDef.meta)}
                  key={header.id}
                  className={classnames(styles.th, styles[`${header.column.columnDef?.["className"]}`])}
                  style={{
                    minWidth: header.column.columnDef.minSize,
                    width: header.column.columnDef.size,
                    flex: `${header.column.columnDef.size} 0 auto`,
                  }}
                >
                  <div
                    className={classnames(styles.cell, {
                      [`${styles.sort}`]:
                        header.column.id === AccessorKey.Title ||
                        header.column.id === AccessorKey.Published ||
                        header.column.id === AccessorKey.Score,
                    })}
                    onClick={
                      header.column.id === AccessorKey.Title ||
                      header.column.id === AccessorKey.Published ||
                      header.column.id === AccessorKey.Score
                        ? header.column.getToggleSortingHandler()
                        : undefined
                    }
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </div>
                  {header.column.getCanFilter() ? (
                    <div>
                      <Filter
                        table={table}
                        column={header.column}
                      />
                    </div>
                  ) : null}
                </th>
              );
            })}
          </tr>
        ))}
      </thead>
      <tbody className={styles.tbody}>
        {table.getRowModel().rows.map((row) => {
          return (
            <tr
              key={row.id}
              className={styles.tr}
            >
              {row.getVisibleCells().map((cell) => {
                return (
                  <td
                    key={cell.id}
                    className={classnames(styles.td, styles[`${cell.column.columnDef?.["className"]}`])}
                    style={{
                      minWidth: cell.column.columnDef.minSize,
                      width: cell.column.columnDef.size,
                      flex: `${cell.column.columnDef.size} 0 auto`,
                    }}
                  >
                    <div className={styles.cell}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</div>
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default UpworkTable;
