// This is a custom Select component that is configured in the parent component where it is used
export const Select = (props) => {
  const {
    selectValue,
    onChange,
    selectId,
    selectLabel,
    selectOptions,
    className = '',
    disabled = false,
  } = props;

  if (!selectOptions || !selectOptions.length) return null;

  return (
    <div className={`my-4 ${className}`}>
      <label
        htmlFor={selectLabel}
        className='block mb-2 text-sm font-medium text-gray-900'
      >
        Select {selectLabel}
      </label>
      <select
        disabled={disabled}
        id={selectId}
        value={selectValue}
        onChange={onChange}
        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5'
      >
        {selectOptions.map((option) => {
          return (
            <option key={option.key} value={option.key}>
              {option.value}
            </option>
          );
        })}
      </select>
    </div>
  );
};
