/* eslint-disable @typescript-eslint/no-explicit-any */
import {Table, flexRender, Column} from "@tanstack/react-table";
import classnames from "classnames";
import {format} from "date-fns";
import {useState, forwardRef} from "react";
import DatePicker from "react-datepicker";

import {InputType} from "../../components/Input/constants";
import Input from "../../components/Input/Input";

import {AccessorKey} from "./constants";

import "react-datepicker/dist/react-datepicker.css";
interface IProps<T> {
  table: Table<T>;
  styles: {[x: string]: string};
}

function Filter({column}: {column: Column<any, any>; table: Table<any>}) {
  const [startDate, setStartDate] = useState("");
  const columnFilterValue = column.getFilterValue();
  const {id} = column;

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
                        column={header.column}
                        table={table}
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