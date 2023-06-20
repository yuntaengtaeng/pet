import { useCallback, useState } from 'react';

const outputDefault = (v: string) => v;

const useInputState = (
  initialValue = '',
  formatValue: (value: string) => string = outputDefault
) => {
  const [value, setValue] = useState(initialValue);

  const onValueChangeHandler = useCallback(
    (value: string) => {
      setValue(formatValue(value));
    },
    [formatValue]
  );

  return [value, onValueChangeHandler] as const;
};

export default useInputState;
