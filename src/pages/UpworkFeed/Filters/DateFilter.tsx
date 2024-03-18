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
  const [dateRange, setDateRange] = useState<null[] | Date[]>([null, null]);
  const [startDate, endDate] = dateRange;

  const isDirtyField = Boolean(column.getFilterValue());

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    column.setFilterValue(event.target.value);
  };

  const datePickerOnChange = (update: Date[]) => {
    const [startDate, endDate] = update;
    setDateRange(update);
    if (startDate && endDate) {
      column.setFilterValue(`${startDate.toISOString()} - ${endDate.toISOString()}`);
      return;
    }
    if (startDate) {
      column.setFilterValue(startDate.toISOString());
      return;
    }
  };

  const DateInput = forwardRef(({value, onClick}: {value?: string; onClick?: () => void}, ref) => {
    return (
      <Input
        id={column.id}
        name={column.id}
        type={InputType.Text}
        onChange={handleChange}
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
        inputStyle={InputStyle.Form}
      />
    );
  });

  return (
    <DatePicker
      startDate={startDate}
      endDate={endDate}
      onChange={datePickerOnChange}
      customInput={<DateInput />}
      dateFormat="MM/dd/yyyy"
      selectsRange={true}
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
        ];
        const monthName = months[date.getMonth()];

        return (
          <div>
            <ButtonIcon
              icon={IconAppName.ChevronLeft}
              onClick={decreaseMonth}
              disabled={prevMonthButtonDisabled}
              className={"react-datepicker__header--custom__button"}
            />
            <span>{`${monthName} ${date.getFullYear()}`}</span>
            <ButtonIcon
              icon={IconAppName.ChevronRight}
              onClick={increaseMonth}
              disabled={nextMonthButtonDisabled}
              className={"react-datepicker__header--custom__button"}
            />
          </div>
        );
      }}
    />
  );
};

export default DateFilter;
