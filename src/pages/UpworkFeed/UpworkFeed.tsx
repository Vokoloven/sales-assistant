/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import classnames from "classnames";
import {useMemo, useState} from "react";
import Select, {components} from "react-select";

import Button from "../../components/Button/Button";
import {ButtonColor} from "../../components/Button/constants";
import ButtonIcon from "../../components/ButtonIcon/ButtonIcon";
import {IconAppName} from "../../components/Icons/constants";
import Icons from "../../components/Icons/Icons";
import TableInstance from "../../components/Table/Table";
import {useAuth} from "../../hooks/useAuth";
import {getTheme} from "../../hooks/useTheme";
import {useGetFeedsQuery} from "../../redux/api/upworkFeedsApi";
import {SortDirection} from "../../submodules/enums/common/sort-direction.enum";
import {ReviewType} from "../../submodules/enums/upwork-feed/review-type.enum";
import {UpworkFeedSortBy} from "../../submodules/enums/upwork-feed/upwork-feed-sort-by.enum";
import type {IReviewDTO} from "../../submodules/interfaces/dto/upwork-feed/ireview.dto";
import type {IUpworkFeedItemDTO} from "../../submodules/interfaces/dto/upwork-feed/iupwork-feed-item.dto";
import {formatDate} from "../../utils/formatDates";

import {selectStyles} from "./selectStyles";
import styles from "./UpworkFeedTable.module.scss";

const options = [
  {value: 10, label: "10"},
  {value: 20, label: "20"},
  {value: 30, label: "30"},
  {value: 40, label: "40"},
  {value: 50, label: "50"},
] as const;

export type TOption = {
  [K in keyof (typeof options)[number]]: (typeof options)[number][K] extends number ? number : string;
};

export const UpworkFeed = () => {
  const [selectedOption, setSelectedOption] = useState({value: 10, label: "10"});
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

  const columns = useMemo<ColumnDef<IUpworkFeedItemDTO>[]>(
    () => [
      {
        accessorKey: "title",
        header: "Title",
        cell: (info) => <span>{info.getValue() as string}</span>,
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
        cell: (info) => {
          const score = info.getValue() as number;

          return <span className={classnames(styles[`${scoreHandler(score)}`])}>{score}</span>;
        },
        minSize: 140,
        width: 140,
        className: "score",
      },
      {
        accessorKey: "review",
        header: "Reaction",
        cell: (info) => {
          const type = info.getValue() as IReviewDTO | null;
          if (type?.type === ReviewType.Like) {
            return <Icons.Dislike className={styles.iconLike} />;
          } else if (type?.type === ReviewType.Dislike) {
            return <Icons.Like className={styles.iconDislike} />;
          } else {
            return "";
          }
        },
        minSize: 140,
        width: 140,
        className: "review",
      },
      {
        accessorKey: "matchedCases",
        header: () => (
          <>
            <span>Matched</span>
            <span>Cases</span>
          </>
        ),
        cell: (info) => info.getValue(),
        minSize: 110,
        width: 110,
        className: "matchedCases",
      },
      {
        accessorKey: "matchedBlogs",
        header: () => (
          <>
            <span>Matched</span>
            <span>Blogs</span>
          </>
        ),
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
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {pagination},
  });

  const handleChange = (option: TOption | null): void => {
    setSelectedOption((prevSelectedOption) => ({...prevSelectedOption, ...option}));
    setPagination((prevPagination) => ({...prevPagination, pageSize: option!.value}));
  };

  const currentPage = table.getState().pagination.pageIndex + 1;
  const totalPages = table.getPageCount();

  const pages = useMemo<Array<number>>(() => {
    const start = Math.floor(table.getState().pagination.pageIndex / 6) * 6;
    const end = start + 6 > totalPages ? totalPages : start + 6;
    return Array.from({length: end - start}, (_, i) => start + i + 1);
  }, [table.getState().pagination.pageIndex, totalPages]);

  if (data?.length) {
    return (
      <>
        <main className={styles.main}>
          <div className={styles.mainOuter}>
            <div className={styles.mainInner}>
              <TableInstance<IUpworkFeedItemDTO>
                table={table}
                styles={styles}
              />
            </div>
          </div>
        </main>
        <footer className={styles.footer}>
          <div className={styles.footerOuter}>
            <div className={styles.footerInner}>
              <div className={styles.footerInnerItems}>
                <div className={styles.footerInnerItemsOuter}>
                  <div className={styles.footerInnerItemsInner}>
                    <div className={styles.footerInnerItemsInnerShown}>
                      <span>Items shown:</span>
                      <span>1-{table.getRowModel().rows.length.toLocaleString()}</span>
                      <span>out of</span>
                      <span>{data?.length}</span>
                    </div>
                  </div>
                </div>
                <div className={styles.footerInnerItemsOuter}>
                  <div className={styles.footerInnerItemsInner}>
                    <div className={styles.footerInnerItemsInnerPerPage}>
                      <span>Items per page:</span>
                      <div>
                        <Select
                          components={{
                            IndicatorSeparator: null,
                            DropdownIndicator: (props) => {
                              return (
                                <components.DropdownIndicator {...props}>
                                  <Icons.ChevronDown />
                                </components.DropdownIndicator>
                              );
                            },
                          }}
                          defaultValue={selectedOption}
                          options={options}
                          onChange={handleChange}
                          styles={selectStyles(getTheme())}
                          menuPlacement="top"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.footerInnerButtons}>
                <ButtonIcon
                  className={styles.footerButtonIcon}
                  icon={IconAppName.ChevronWithLineLeft}
                  onClick={() => table.firstPage()}
                  disabled={!table.getCanPreviousPage()}
                />
                <ButtonIcon
                  className={styles.footerButtonIcon}
                  icon={IconAppName.ChevronLeft}
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                />

                {pages.map((page, index) => (
                  <Button
                    key={index}
                    text={page}
                    color={currentPage === page ? ButtonColor.PaginationActive : ButtonColor.Pagiantion}
                    classname={styles.footerButton}
                    onClick={() => table.setPageIndex(page - 1)}
                  />
                ))}

                <ButtonIcon
                  className={styles.footerButtonIcon}
                  icon={IconAppName.ChevronRight}
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                />
                <ButtonIcon
                  className={styles.footerButtonIcon}
                  icon={IconAppName.ChevronWithLineRight}
                  onClick={() => table.lastPage()}
                  disabled={!table.getCanNextPage()}
                />
              </div>
            </div>
          </div>
        </footer>
      </>
    );
  }
  return null;
};

export default UpworkFeed;
