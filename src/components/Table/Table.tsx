/* eslint-disable @typescript-eslint/no-explicit-any */
import {Table, flexRender, Column} from "@tanstack/react-table";
import classnames from "classnames";

import Icons from "../Icons/Icons";
import {InputType} from "../Input/constants";
import Input from "../Input/Input";

interface IProps<T> {
  table: Table<T>;
  styles: {[x: string]: string};
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function Filter({column, table}: {column: Column<any, any>; table: Table<any>}) {
  const columnFilterValue = column.getFilterValue();
  const header = column.columnDef.header;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    column.setFilterValue(e.target.value);
  };

  if (header === "Title")
    return (
      <Input
        id={header}
        name={header}
        type={InputType.Text}
        value={(columnFilterValue ?? "") as string}
        onChange={onChange}
      />
    );

  return null;
}

const TableInstance = <T,>({table, styles}: IProps<T>) => {
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
                  {/* <div className={styles.cell}>{flexRender(header.column.columnDef.header, header.getContext())}</div> */}
                  <div className={styles.cell}>
                    {flexRender(header.column.columnDef.header, header.getContext())}{" "}
                    <div>
                      <Icons.Sort />
                    </div>
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

export default TableInstance;
