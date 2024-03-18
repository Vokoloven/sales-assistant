import {ColumnDef, useReactTable, getCoreRowModel, Column} from "@tanstack/react-table";
import classnames from "classnames";
import {format} from "date-fns";
import {useCallback, useEffect, useMemo, useState} from "react";
import Select, {components} from "react-select";

import Button from "../../components/Button/Button";
import {ButtonColor} from "../../components/Button/constants";
import ButtonIcon from "../../components/ButtonIcon/ButtonIcon";
import {IconAppName} from "../../components/Icons/constants";
import Icons from "../../components/Icons/Icons";
import {NotifyType} from "../../components/Notify/constants";
import Notify from "../../components/Notify/Notify";
import Spinner from "../../components/Spinner/Spinner";
import {useAuth} from "../../hooks/useAuth";
import {useDebounceValue} from "../../hooks/useDebounceValue";
import {getTheme} from "../../hooks/useTheme";
import {useRecoverUserQuery} from "../../redux/api/authApi";
import {useGetFeedsMutation} from "../../redux/api/upworkFeedsApi";
import {STATUS_CODE} from "../../redux/utils";
import {SortDirection} from "../../submodules/enums/common/sort-direction.enum";
import {ReviewType} from "../../submodules/enums/upwork-feed/review-type.enum";
import type {UpworkFeedSearchBy} from "../../submodules/enums/upwork-feed/upwork-feed-search-by.enum";
import {UpworkFeedSortBy} from "../../submodules/enums/upwork-feed/upwork-feed-sort-by.enum";
import type {ISearchParameterDTO} from "../../submodules/interfaces/dto/common/isearch-parameter.interface";
import type {IReviewDTO} from "../../submodules/interfaces/dto/upwork-feed/ireview.dto";
import type {IUpworkFeedItemDTO} from "../../submodules/interfaces/dto/upwork-feed/iupwork-feed-item.dto";

import {options, AccessorKey} from "./constants";
import DateFilter from "./Filters/DateFilter";
import {selectStyles} from "./selectStyles";
import type {TOption} from "./types/types";
import styles from "./UpworkFeedTable.module.scss";
import TableInstance from "./UpworkTable";
import {capitalize, scoreHandler} from "./utils";

type ColumnSort = {
  id: string;
  desc: boolean;
};

type PaginationState = {
  pageIndex: number;
  pageSize: number;
};

type TSerachParameterDTO = ISearchParameterDTO<UpworkFeedSearchBy>[];

export const UpworkFeed = () => {
  const [getFeeds, {isLoading, isError, error, data: fetchedData}] = useGetFeedsMutation();
  const {isLogged} = useAuth();
  useRecoverUserQuery(undefined, {skip: !isError});
  const [selectedOption, setSelectedOption] = useState({value: 10, label: "10"});
  const [sorting, setSorting] = useState<ColumnSort[]>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const data = useMemo<IUpworkFeedItemDTO[]>(() => {
    if (fetchedData) {
      return fetchedData.data.items.items;
    } else {
      return [];
    }
  }, [fetchedData]);

  const columns = useMemo<ColumnDef<IUpworkFeedItemDTO>[]>(
    () => [
      {
        accessorKey: AccessorKey.Title,
        header: capitalize(AccessorKey.Title),
        cell: (info) => <span>{info.getValue() as string}</span>,
        minSize: 200,
        width: 200,
        className: AccessorKey.Title,
        isSorted: true,
      },
      {
        accessorKey: AccessorKey.Published,
        accessorFn: (row) => format(row.published, "MM/dd/yyyy"),
        header: capitalize(AccessorKey.Published),
        cell: (info) => info.getValue(),
        minSize: 140,
        width: 140,
        className: AccessorKey.Published,
        isSorted: true,
        meta: {
          filterComponent: DateFilter,
        },
      },
      {
        accessorKey: AccessorKey.Keywords,
        header: capitalize(AccessorKey.Keywords),
        cell: (info) => {
          const keywords = info.getValue() as string[];

          return keywords?.length ? keywords.map((keyword, index) => <span key={index}>{keyword}</span>) : "";
        },
        minSize: 200,
        width: 200,
        className: AccessorKey.Keywords,
      },
      {
        accessorKey: AccessorKey.Score,
        header: capitalize(AccessorKey.Score),
        cell: (info) => {
          const score = info.getValue() as number;

          return <span className={classnames(styles[`${scoreHandler(score)}`])}>{score}</span>;
        },
        minSize: 140,
        width: 140,
        className: AccessorKey.Score,
        isSorted: true,
      },
      {
        accessorKey: AccessorKey.Review,
        header: capitalize(AccessorKey.Review),
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
        className: AccessorKey.Review,
      },
      {
        accessorKey: AccessorKey.MatchedCases,
        header: () => (
          <>
            <span>Matched</span>
            <span>Cases</span>
          </>
        ),
        cell: (info) => info.getValue(),
        minSize: 110,
        width: 110,
        className: AccessorKey.MatchedCases,
      },
      {
        accessorKey: AccessorKey.MatchedBlogs,
        header: () => (
          <>
            <span>Matched</span>
            <span>Blogs</span>
          </>
        ),
        cell: (info) => info.getValue(),
        minSize: 110,
        width: 110,
        className: AccessorKey.MatchedBlogs,
      },
    ],
    [],
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    rowCount: fetchedData?.data.items.totalCount,
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,
    state: {
      pagination,
      sorting,
    },
  });

  const tableFilterValue = table
    .getAllColumns()
    .reduce((acc: TSerachParameterDTO, column: Column<IUpworkFeedItemDTO, unknown>) => {
      if (column.getFilterValue()) {
        return (acc = [
          ...acc,
          {searchBy: column.id as UpworkFeedSearchBy, searchQuery: column.getFilterValue() as string},
        ]);
      }

      return acc;
    }, []);

  const debouncedTableFilterValue = useDebounceValue(tableFilterValue, 1000);

  const getFeedsRequest = useCallback(
    async ({
      pagination,
      sorting,
      debouncedTableFilterValue,
    }: {
      pagination: PaginationState;
      sorting: ColumnSort[];
      debouncedTableFilterValue: TSerachParameterDTO;
    }) => {
      if (isLogged) {
        try {
          await getFeeds({
            pageSize: pagination.pageSize,
            pageNumber: pagination.pageIndex + 1,
            sortBy: sorting[0]?.id as UpworkFeedSortBy,
            sortDirection: sorting.length ? (sorting[0]?.desc ? SortDirection.DESC : SortDirection.ASC) : undefined,
            searchParameters: debouncedTableFilterValue,
          });
        } catch (error) {
          /* empty */
        }
      }
    },

    [isLogged, pagination, sorting, JSON.stringify(debouncedTableFilterValue)],
  );

  useEffect(() => {
    getFeedsRequest({pagination, sorting, debouncedTableFilterValue});
  }, [getFeedsRequest]);

  const handleChange = (option: TOption | null): void => {
    setSelectedOption((prevSelectedOption) => ({...prevSelectedOption, ...option}));
    setPagination((prevPagination) => ({...prevPagination, pageSize: option!.value}));
  };

  const totalPages = table.getPageCount();
  const currentPage = table.getState().pagination.pageIndex + 1;

  const pages = useMemo<number[]>(() => {
    const numberOfButtons = 6;

    const start = Math.floor((currentPage - 1) / numberOfButtons) * numberOfButtons;
    const end = start + numberOfButtons > totalPages ? totalPages : start + numberOfButtons;
    return Array.from({length: end - start}, (_, i) => start + i + 1);
  }, [currentPage, totalPages]);

  if (isLoading) return <div className={styles.spinner}>Loading...{<Spinner />}</div>;
  if (error) {
    if ("status" in error && error.status === STATUS_CODE.UNAUTHORIZED) {
      return (
        <div>
          <Notify
            type={NotifyType.Error}
            message={"Something went wrong"}
          />
          <div className={styles.error}>
            Please try again later.&nbsp;
            <span
              onClick={() => {
                getFeedsRequest({pagination, sorting, debouncedTableFilterValue});
              }}
              className={styles.errorReload}
            >
              Reload
            </span>
          </div>
        </div>
      );
    }
  }
  if (data) {
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
                      <span>1-{pagination.pageSize}</span>
                      <span>out of</span>
                      <span>{fetchedData?.data.items.totalCount}</span>
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
