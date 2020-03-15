import React from 'react';
import Toggle from 'react-toggle';
import 'react-toggle/style.css';

export default function ToggleInput(props) {
  return (
    <label style={{ display: 'flex', alignItems: 'center', marginTop: 20 }}>
      <Toggle onChange={props.listener} defaultChecked={props.defaultValue} />
      <span style={{ marginLeft: 10 }}>Virtualize list</span>
    </label>
  );
};
