import {ColumnDef, useReactTable, getCoreRowModel, getPaginationRowModel} from "@tanstack/react-table";
import {useMemo, useState} from "react";

import TableInstance from "../../components/Table/Table";
import {useAuth} from "../../hooks/useAuth";
import {useGetFeedsQuery} from "../../redux/api/upworkFeedsApi";
import {SortDirection} from "../../submodules/enums/common/sort-direction.enum";
import {UpworkFeedSortBy} from "../../submodules/enums/upwork-feed/upwork-feed-sort-by.enum";
import type {IReviewDTO} from "../../submodules/interfaces/dto/upwork-feed/ireview.dto";
import type {IUpworkFeedItemDTO} from "../../submodules/interfaces/dto/upwork-feed/iupwork-feed-item.dto";
import {formatDate} from "../../utils/formatDates";

import styles from "./UpworkFeed.module.scss";
import tableStyles from "./UpworkFeedTable.module.scss";

export const UpworkFeed = () => {
  const {isLogged} = useAuth();
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const {data: fetchedData} = useGetFeedsQuery(
    {
      sortDirection: SortDirection.ASC,
      sortBy: UpworkFeedSortBy.Title,
    },
    {skip: !isLogged},
  );

  const columns = useMemo<ColumnDef<IUpworkFeedItemDTO>[]>(
    () => [
      {
        accessorKey: "title",
        header: "Title",
        cell: (info) => {
          const title = info.getValue() as string;
          return <span>{title}</span>;
        },
        minSize: 200,
        width: 200,
        className: "title",
      },
      {
        accessorKey: "published",
        header: "Published",
        cell: (info) => formatDate(info.getValue()),
        minSize: 140,
        width: 140,
        className: "published",
      },
      {
        accessorKey: "keywords",
        header: "Keywords",
        cell: (info) => {
          const keywords = info.getValue() as string[];

          return keywords?.length ? keywords.map((keyword, index) => <span key={index}>{keyword}</span>) : "";
        },
        minSize: 200,
        width: 200,
        className: "keywords",
      },
      {
        accessorKey: "score",
        header: "Score",
        cell: (info) => info.getValue() ?? "",
        minSize: 140,
        width: 140,
        className: "score",
      },
      {
        accessorKey: "review",
        header: "Reaction",
        cell: (info) => {
          const type = info.getValue() as IReviewDTO | null;
          return type ? type.type : "";
        },
        minSize: 140,
        width: 140,
        className: "review",
      },
      {
        accessorKey: "matchedCases",
        header: "Matched Cases",
        cell: (info) => info.getValue(),
        minSize: 110,
        width: 110,
        className: "publishmatchedCasesed",
      },
      {
        accessorKey: "matchedBlogs",
        header: "Matched Blogs",
        cell: (info) => info.getValue(),
        minSize: 110,
        width: 110,
        className: "matchedBlogs",
      },
    ],
    [],
  );

  const data = useMemo<IUpworkFeedItemDTO[]>(() => {
    if (fetchedData) {
      return fetchedData.data.items.items;
    } else {
      return [];
    }
  }, [fetchedData]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {pagination},
  });

  if (data?.length) {
    return (
      <>
        <main className={styles.outer}>
          <div className={styles.inner}>
            <TableInstance<IUpworkFeedItemDTO>
              table={table}
              styles={tableStyles}
            />
          </div>
        </main>
        <footer>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Neque fuga incidunt porro aliquam atque quo magnam
          ratione, reprehenderit sapiente numquam quidem cum, accusantium voluptatem asperiores eos doloremque modi
          culpa ex!
        </footer>
      </>
    );
  }
  return null;
};

export default UpworkFeed;
