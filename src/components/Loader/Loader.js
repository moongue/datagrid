import React from 'react';
import './Loader.scss';

export default function Loader() {
  return (
    <div className="loader-wrap">
      <div className="lds-grid">
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
}
