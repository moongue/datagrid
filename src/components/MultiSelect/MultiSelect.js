import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import './MultiSelect.scss';

const options = [
  { value: 'deposit', label: 'Deposit' },
  { value: 'invoice', label: 'Invoice' },
  { value: 'payment', label: 'Payment' },
  { value: 'withdrawal', label: 'Withdrawal' }
];

export default function MultiSelect(props) {
  return (
    <Select
      value={props.defaultValues}
      options={options}
      onChange={props.changeSortSelect}
      placeholder="Transactions..."
      isMulti
      className="basic-multi-select"
    />
  );
}

MultiSelect.propTypes = {
  changeSortSelect: PropTypes.func.isRequired,
  defaultValues: PropTypes.array.isRequired
};
