import React from 'react';
import './Table.scss';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function Table({ dataTable: { data } }) {
  return (
    <>
      <div className="search">
        <input className="table-search" placeholder="Search..." type="text" />
        <button type="button" className="btn-search">
          Search
        </button>
      </div>
      <div className="table">
        <div className="table-row table__header">
          <button type="button">id</button>
          <button type="button" disabled>
            img
          </button>
          <button type="button">name</button>
          <button type="button">amount</button>
          <button type="button">transaction</button>
          <button type="button">city</button>
          <button type="button">status</button>
        </div>
        {data.map(item => (
          <div key={item.id} className="table-row">
            <span className="table-row__id">{item.id}</span>
            <span className="table-row__img">
              <img src={item.img} alt="avatar" />
            </span>
            <span className="table-row__name">{item.name}</span>
            <span className="table-row__amount">{item.amount}$</span>
            <span className="table-row__transaction">
              {item.transactionType}
            </span>
            <span className="table-row__location">{item.locationName}</span>
            <span className="table-row__type">
              {item.isActive ? (
                <p className="table-row__type table-row__type_online">online</p>
              ) : (
                <p className="table-row__type table-row__type_offline">
                  offline
                </p>
              )}
            </span>
          </div>
        ))}
      </div>
    </>
  );
}

Table.propTypes = {
  dataTable: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    dataTable: state.table.dataTable
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Table);
