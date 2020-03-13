import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import './Select.scss';

const options = [
  { value: 'online', label: 'Online' },
  { value: 'offline', label: 'Offline' }
];

export default function MultiSelect(props) {
  return (
    <Select
      value={props.defaultValue}
      options={options}
      onChange={props.changeSortSelect}
      placeholder="Status"
      className="basic-select"
    />
  );
}

MultiSelect.propTypes = {
  defaultValue: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
    .isRequired,
  changeSortSelect: PropTypes.func.isRequired
};
