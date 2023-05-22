import { DatePicker, DatePickerProps } from '@mui/x-date-pickers/DatePicker';
import { useField, useFormikContext } from 'formik';
import React from 'react';
type Props<TDate> = {
  name: string;
} & Omit<DatePickerProps<TDate>, 'onChange' | 'value'>;

const FormikDatePicker = <TInputDate, TDate = TInputDate>(props: Props<TDate>) => {
  const { name, ...restProps } = props;
  const [field] = useField(name);
  const { setFieldValue } = useFormikContext();
  return (
    <DatePicker
      {...restProps}
      value={field.value ?? null}
      onChange={(val) => setFieldValue(name, val)}
    />
  );
};

export default FormikDatePicker;
