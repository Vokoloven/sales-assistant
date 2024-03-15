/* eslint-disable @typescript-eslint/no-explicit-any */
import {Table, flexRender} from "@tanstack/react-table";
import classnames from "classnames";

import ButtonIcon from "../../components/ButtonIcon/ButtonIcon";
import {ButtonIconVariant} from "../../components/ButtonIcon/constants";
import {IconAppName} from "../../components/Icons/constants";
// import {InputType} from "../../components/Input/constants";
// import {InputStyle} from "../../components/Input/constants";
// import Input from "../../components/Input/Input";
import {SortDirection} from "../../submodules/enums/common/sort-direction.enum";
import {KeyExtractor} from "../../utils/types/keyExtractor";

import Filter from "./Filter";

// import {AccessorKey} from "./constants";

import "react-datepicker/dist/react-datepicker.css";
interface IProps<T> {
  table: Table<T>;
  styles: {[x: string]: string};
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

// const Filter = ({column}: {column: Column<any, any>; table: Table<any>}) => {
//   const columnFilterValue = column.getFilterValue();
//   const {id} = column;

//   const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     column.setFilterValue(e.target.value);
//   };

//   if (id === AccessorKey.Title)
//     return (
//       <Input
//         id={id}
//         name={id}
//         type={InputType.Text}
//         value={(columnFilterValue ?? "") as string}
//         onChange={onChange}
//         inputStyle={InputStyle.Form}
//       />
//     );

//   // const [startDate, setStartDate] = useState("");

//   // const DateInput = forwardRef(({value, onClick}: {value?: string | number; onClick?: () => void}, ref) => {
//   //   return (
//   //     <Input
//   //       id={InputType.Date}
//   //       name={InputType.Date}
//   //       type={InputType.Text}
//   //       value={value}
//   //       onChange={onChange}
//   //       onClick={onClick}
//   //       forwardedRef={ref}
//   //       inputStyle={InputStyle.Form}
//   //     />
//   //   );
//   // });

//   // if (id === AccessorKey.Published)
//   //   return (
//   //     <DatePicker
//   //       selected={startDate}
//   //       onChange={(date: Date) => {
//   //         setStartDate(format(date, "MM/dd/yyyy"));
//   //         column.setFilterValue(format(date, "MM/dd/yyyy"));
//   //       }}
//   //       customInput={<DateInput />}
//   //     />
//   //   );

//   return null;
// };

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
                      <Filter
                        table={table}
                        column={header.column}
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
