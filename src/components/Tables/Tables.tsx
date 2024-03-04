/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  flexRender,
  PaginationState,
  getPaginationRowModel,
} from "@tanstack/react-table";
import classnames from "classnames";
import {useMemo, useState} from "react";

import type {IUpworkFeedItemDTO} from "../../submodules/interfaces/dto/upwork-feed/iupwork-feed-item.dto";
import type {IUpworkResponseListFeedsDto} from "../../submodules/interfaces/dto/upwork-feed/iupwork-response-list-feeds.dto";
import {formatDate} from "../../utils/formatDates";

import styles from "./Tables.module.scss";

const scoreHandler = (score: number) => {
  if (score < 100) {
    return "scorePink";
  } else if (score > 100 && score < 150) {
    return "scoreOrange";
  } else if (score > 150 && score < 200) {
    return "scoreYellow";
  } else if (score > 200 && score < 250) {
    return "scoreGreen";
  } else if (score > 250) {
    return "scoreBlue";
  }
};

const Tables = ({fetchedData}: {fetchedData: {data: IUpworkResponseListFeedsDto} | undefined}) => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });

  const data = useMemo<IUpworkFeedItemDTO[]>(() => {
    if (fetchedData) return fetchedData.data.items.items;

    return [];
  }, [fetchedData]);

  const columnHelper = createColumnHelper<IUpworkFeedItemDTO>();

  const columns = useMemo(
    () => [
      columnHelper.accessor("title", {
        header: "Title",
        cell: (info) => info.getValue(),
        footer: (info) => info.column.id,
      }),
      columnHelper.accessor("published", {
        header: "Published",
        cell: (info) => formatDate(info.getValue()),
        footer: (info) => info.column.id,
      }),
      columnHelper.accessor("keywords", {
        header: "Keywords",
        cell: (info) => {
          const keywords = info.getValue();
          return keywords?.map((keyword, index) => (
            <span
              key={index}
              className={styles.tbodyTdBoxText}
            >
              {keyword}
            </span>
          ));
        },

        footer: (info) => info.column.id,
      }),
      columnHelper.accessor("score", {
        header: "Score",
        cell: (info) => {
          const score = info.getValue();

          return <span className={classnames(styles.score, styles[`${scoreHandler(score)}`])}>{score}</span>;
        },
        footer: (info) => info.column.id,
      }),
      columnHelper.accessor("matchedCases", {
        header: "Matched cases",
        cell: (info) => info.getValue(),
        footer: (info) => info.column.id,
      }),
      columnHelper.accessor("matchedBlogs", {
        header: "Matched blogs",
        cell: (info) => info.getValue(),
        footer: (info) => info.column.id,
      }),
    ],
    [],
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination,
    },
  });

  if (fetchedData)
    return (
      <div className={styles.wrapper}>
        <div className={styles.tableResponsive}>
          <table>
            <thead className={styles.thead}>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      className={styles.theadTh}
                      key={header.id}
                    >
                      <div>
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className={styles.tbodyTr}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className={styles.tbodyTd}
                    >
                      <div className={styles.tbodyTdBox}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );

  return null;
};

export default Tables;
