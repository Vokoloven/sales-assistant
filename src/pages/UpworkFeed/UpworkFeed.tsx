import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import classnames from "classnames";
import {format} from "date-fns";
import {useMemo, useState} from "react";
import Select, {components} from "react-select";

import Button from "../../components/Button/Button";
import {ButtonColor} from "../../components/Button/constants";
import ButtonIcon from "../../components/ButtonIcon/ButtonIcon";
import {IconAppName} from "../../components/Icons/constants";
import Icons from "../../components/Icons/Icons";
import Spinner from "../../components/Spinner/Spinner";
import TableInstance from "../../components/Table/Table";
import {useAuth} from "../../hooks/useAuth";
import {getTheme} from "../../hooks/useTheme";
import {useGetFeedsQuery} from "../../redux/api/upworkFeedsApi";
import {SortDirection} from "../../submodules/enums/common/sort-direction.enum";
import {ReviewType} from "../../submodules/enums/upwork-feed/review-type.enum";
import {UpworkFeedSortBy} from "../../submodules/enums/upwork-feed/upwork-feed-sort-by.enum";
import type {IReviewDTO} from "../../submodules/interfaces/dto/upwork-feed/ireview.dto";
import type {IUpworkFeedItemDTO} from "../../submodules/interfaces/dto/upwork-feed/iupwork-feed-item.dto";

import {options, AccessorKey} from "./constants";
import {selectStyles} from "./selectStyles";
import type {TOption} from "./types/types";
import styles from "./UpworkFeedTable.module.scss";
import {capitalize, scoreHandler} from "./utils";

export const UpworkFeed = () => {
  const [selectedOption, setSelectedOption] = useState({value: 10, label: "10"});
  const {isLogged} = useAuth();
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const {data: fetchedData, isLoading} = useGetFeedsQuery(
    {
      sortDirection: SortDirection.ASC,
      sortBy: UpworkFeedSortBy.Title,
    },
    {skip: !isLogged},
  );

  const columns = useMemo<ColumnDef<IUpworkFeedItemDTO>[]>(
    () => [
      {
        accessorKey: AccessorKey.Title,
        header: capitalize(AccessorKey.Title),
        cell: (info) => <span>{info.getValue() as string}</span>,
        minSize: 200,
        width: 200,
        className: AccessorKey.Title,
      },
      {
        accessorKey: AccessorKey.Published,
        accessorFn: (row) => format(row.published, "MM/dd/yyyy"),
        header: capitalize(AccessorKey.Published),
        cell: (info) => info.getValue(),
        minSize: 140,
        width: 140,
        className: AccessorKey.Published,
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

  if (isLoading) return <div className={styles.spinner}>Loading...{<Spinner />}</div>;
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
