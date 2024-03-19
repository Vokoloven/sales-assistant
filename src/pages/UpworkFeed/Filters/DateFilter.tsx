/* eslint-disable indent */
import {Column, Table} from "@tanstack/react-table";
import {useState, forwardRef} from "react";
import DatePicker from "react-datepicker";

import ButtonIcon from "../../../components/ButtonIcon/ButtonIcon";
import {IconAppName} from "../../../components/Icons/constants";
import {InputType} from "../../../components/Input/constants";
import {InputStyle} from "../../../components/Input/constants";
import Input from "../../../components/Input/Input";

import "./DatePicker.scss";

const DateFilter = <T,>({column}: {column: Column<T, unknown>; table: Table<T>}) => {
  const [dateRange, setDateRange] = useState<null[] | Date[]>(() => {
    if (column.getFilterValue()) {
      const value = column.getFilterValue() as string;
      const arrayValue = value.split(" - ");
      const startDate = new Date(arrayValue[0]);
      const endDate = new Date(arrayValue[1]);

      return [startDate, endDate];
    }

    return [null, null];
  });
  const [startDate, endDate] = dateRange;

  const isDirtyField = Boolean(column.getFilterValue());

  const handleChange = (update: Date[]) => {
    const [startDate, endDate] = update;
    setDateRange(update);
    if (startDate && endDate) {
      column.setFilterValue(`${startDate.toISOString()} - ${endDate.toISOString()}`);
    }
  };

  const DateInput = forwardRef(({value, onClick}: {value?: string; onClick?: () => void}, ref) => {
    return (
      <Input
        id={column.id}
        name={column.id}
        type={InputType.Text}
        readOnly
        onClick={onClick}
        forwardedRef={ref}
        buttonIcon={
          isDirtyField
            ? {
                icon: IconAppName.ClearInput,
                ariaLabel: "Clear field",
                onClick: () => {
                  column.setFilterValue("");
                  setDateRange([null, null]);
                },
              }
            : undefined
        }
        value={value}
        inputStyle={InputStyle.Table}
      />
    );
  });

  return (
    <DatePicker
      startDate={startDate}
      endDate={endDate}
      onChange={handleChange}
      customInput={<DateInput />}
      dateFormat="MM/dd/yyyy"
      selectsRange={true}
      calendarStartDay={1}
      formatWeekDay={(nameOfDay) => nameOfDay.substr(0, 3).toUpperCase()}
      renderCustomHeader={({decreaseMonth, increaseMonth, prevMonthButtonDisabled, nextMonthButtonDisabled, date}) => {
        const months = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ] as const;

        const monthName = months[date.getMonth()];

        return (
          <div>
            <ButtonIcon
              icon={IconAppName.ChevronLeft}
              onClick={decreaseMonth}
              disabled={prevMonthButtonDisabled}
            />
            <span>{`${monthName} ${date.getFullYear()}`}</span>
            <ButtonIcon
              icon={IconAppName.ChevronRight}
              onClick={increaseMonth}
              disabled={nextMonthButtonDisabled}
            />
          </div>
        );
      }}
    />
  );
};

export default DateFilter;
