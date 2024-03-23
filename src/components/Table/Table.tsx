import {Table as TanStackTable, flexRender} from "@tanstack/react-table";
import type {FilterMeta, Column, Row} from "@tanstack/react-table";
import {useVirtualizer} from "@tanstack/react-virtual";
import classnames from "classnames";
import {useRef, ElementRef} from "react";

import Filter from "../../pages/UpworkFeed/Filters/Filter";
import {SortDirection} from "../../submodules/enums/common/sort-direction.enum";
import {KeyExtractor} from "../../utils/types/keyExtractor";
import ButtonIcon from "../ButtonIcon/ButtonIcon";
import {ButtonIconStyle} from "../ButtonIcon/constants";
import {IconAppName} from "../Icons/constants";

import "react-datepicker/dist/react-datepicker.css";
interface IProps<T> {
  table: TanStackTable<T>;
  styles: {[x: string]: string};
}

interface ICustomFilterMeta extends FilterMeta {
  filterComponent: <T>(info: {column: Column<T, unknown>; table: TanStackTable<T>}) => JSX.Element;
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

const Table = <T,>({table, styles}: IProps<T>) => {
  const {rows} = table.getRowModel();

  const tableContainerRef = useRef<ElementRef<"div">>(null);

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    estimateSize: () => 50,
    getScrollElement: () => tableContainerRef.current,
    measureElement:
      typeof window !== "undefined" && navigator.userAgent.indexOf("Firefox") === -1
        ? (element) => element?.getBoundingClientRect().height
        : undefined,
  });
  const virtualRows = rowVirtualizer.getVirtualItems();
  const totalSize = rowVirtualizer.getTotalSize();

  return (
    <div
      ref={tableContainerRef}
      className={styles.containerRef}
      style={{
        overflow: "auto",
        position: "relative",
        height: 1100,
        scrollbarWidth: "thin",
        WebkitOverflowScrolling: "touch",
      }}
    >
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
                          buttonIconStyle={ButtonIconStyle.Input}
                        />
                      )}
                    </div>
                    {header.column.getCanFilter() ? (
                      <div>
                        {header.column.columnDef?.meta &&
                        (header.column.columnDef?.meta as ICustomFilterMeta)?.filterComponent ? (
                          (header.column.columnDef?.meta as ICustomFilterMeta)?.filterComponent({
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
        <tbody
          className={styles.tbody}
          style={{height: totalSize, position: "relative"}}
        >
          {virtualRows.map((virtualRow) => {
            const row = rows[virtualRow.index] as Row<T>;
            return (
              <tr
                data-index={virtualRow.index}
                ref={(node) => rowVirtualizer.measureElement(node)}
                key={row.id}
                className={styles.tr}
                style={{
                  position: "absolute",
                  transform: `translateY(${virtualRow.start}px)`,
                  width: "100%",
                }}
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
    </div>
  );
};

export default Table;
