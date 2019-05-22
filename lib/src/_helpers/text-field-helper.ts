import { DateTextFieldProps } from '../_shared/DateTextField';
import { MaterialUiPickersDate } from '../typings/date';

export const getDisplayDate = ({
  utils,
  value,
  format,
  invalidLabel,
  emptyLabel,
  labelFunc,
}: DateTextFieldProps) => {
  const isEmpty = value === null;
  const date = utils.date(value);

  if (labelFunc) {
    return labelFunc(isEmpty ? null : date, invalidLabel!);
  }

  if (isEmpty) {
    return emptyLabel;
  }

  return utils.isValid(date) ? utils.format(date, format) : invalidLabel;
};

export const getError = (
  value: MaterialUiPickersDate,
  props: DateTextFieldProps
): React.ReactNode => {
  const {
    utils,
    maxDate,
    minDate,
    disablePast,
    disableFuture,
    maxDateMessage,
    minDateMessage,
    invalidDateMessage,
  } = props;

  // if null - do not show error
  if (utils.isNull(value)) {
    return '';
  }

  if (!utils.isValid(value)) {
    return invalidDateMessage;
  }

  // do not include minDates as errors
  const isAfterMinDate =
    utils.isAfter(value, utils.date(maxDate)) &&
    Math.abs(utils.getDiff(value, utils.date(maxDate))) > 60000;

  const isAfterToday =
    utils.isAfter(value, utils.date()) && Math.abs(utils.getDiff(value, utils.date())) > 60000;

  const isBeforeMinDate =
    utils.isBefore(value, utils.date(minDate)) &&
    Math.abs(utils.getDiff(value, utils.date(minDate))) > 60000;

  const isBeforeToday =
    utils.isBefore(value, utils.date()) && Math.abs(utils.getDiff(value, utils.date())) > 60000;

  if ((maxDate && isAfterMinDate) || (disableFuture && isAfterToday)) {
    return maxDateMessage;
  }

  if ((minDate && isBeforeMinDate) || (disablePast && isBeforeToday)) {
    return minDateMessage;
  }

  return '';
};
