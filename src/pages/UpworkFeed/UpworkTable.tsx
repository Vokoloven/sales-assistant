import {Table, flexRender} from "@tanstack/react-table";
import type {FilterMeta, Column} from "@tanstack/react-table";
import classnames from "classnames";

import ButtonIcon from "../../components/ButtonIcon/ButtonIcon";
import {ButtonIconVariant} from "../../components/ButtonIcon/constants";
import {IconAppName} from "../../components/Icons/constants";
import {SortDirection} from "../../submodules/enums/common/sort-direction.enum";
import {KeyExtractor} from "../../utils/types/keyExtractor";

import Filter from "./Filters/Filter";

import "react-datepicker/dist/react-datepicker.css";
interface IProps<T> {
  table: Table<T>;
  styles: {[x: string]: string};
}

interface ICustomFilterMeta extends FilterMeta {
  filterComponent: <T>(info: {column: Column<T, unknown>; table: Table<T>}) => JSX.Element;
}

const handleSortIcon = (
  getIsSorted: () => false | Lowercase<KeyExtractor<typeof SortDirection>>,
): KeyExtractor<typeof IconAppName> => {
  const result = getIsSorted();

  switch (result) {
    case false:
      return IconAppName.Sort;

    case "asc":
      return IconAppName.SortAsc;

    case "desc":
      return IconAppName.SortDesc;
  }
};

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
                  <div className={styles.cell}>
                    <span>{flexRender(header.column.columnDef.header, header.getContext())}</span>
                    {header.column.columnDef?.["isSorted"] && (
                      <ButtonIcon
                        onClick={header.column.getToggleSortingHandler()}
                        icon={handleSortIcon(header.column.getIsSorted)}
                        buttonIconVariant={ButtonIconVariant.Input}
                      />
                    )}
                  </div>
                  {header.column.getCanFilter() ? (
                    <div>
                      {header.column.columnDef?.meta &&
                      (header.column.columnDef?.meta as ICustomFilterMeta).filterComponent ? (
                        (header.column.columnDef?.meta as ICustomFilterMeta).filterComponent({
                          column: header.column,
                          table,
                        })
                      ) : (
                        <Filter
                          table={table}
                          column={header.column}
                        />
                      )}
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
