import {Table, flexRender} from "@tanstack/react-table";
import classnames from "classnames";

interface IProps<T> {
  table: Table<T>;
  styles: {[x: string]: string};
}

const TableInstance = <T,>({table, styles}: IProps<T>) => {
  return (
    <table className={styles.table}>
      <thead className={styles.thead}>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr
            key={headerGroup.id}
            className={styles.row}
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
                  <div>{flexRender(header.column.columnDef.header, header.getContext())}</div>
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
              className={styles.row}
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
