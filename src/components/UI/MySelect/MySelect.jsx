import React from 'react';

const MySelect = ({options, defaultValue, value, onChange}) => {
  return (
    <select
      value={value}
      onChange={onChange}
    >
      <option disabled value="">{defaultValue}</option>
      {options.map(option =>
        <option value={option.value} key={option.value}>
          {option.title}
        </option>
      )}
    </select>
  );
};

export default MySelect;