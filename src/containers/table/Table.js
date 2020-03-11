import React from 'react';
import './Table.scss';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { sortTableRows } from '../../store/actions/tableActions';

function Table(props) {
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
          <button
            onClick={props.sortTableRows.bind(this, 'id')}
            type="button"
          >
            id
          </button>
          <button type="button" disabled>
            img
          </button>
          <button
            onClick={props.sortTableRows.bind(this, 'name')}
            type="button"
          >
            name
          </button>
          <button
            onClick={props.sortTableRows.bind(this, 'amount')}
            type="button"
          >
            amount
          </button>
          <button
            onClick={props.sortTableRows.bind(this, 'transactionType')}
            type="button"
          >
            transaction
          </button>
          <button
            onClick={props.sortTableRows.bind(this, 'locationName')}
            type="button"
          >
            city
          </button>
          <button
            onClick={props.sortTableRows.bind(this, 'isActive')}
            type="button"
          >
            status
          </button>
        </div>
        {props.dataTable.data.map(item => (
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
  dataTable: PropTypes.object.isRequired,
  sortTableRows: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    dataTable: state.table.dataTable,
    id: state.table.id,
    name: state.table.name,
    amount: state.table.amount,
    transactionType: state.table.transactionType,
    isActive: state.table.isActive,
    img: state.table.img
  };
}

function mapDispatchToProps(dispatch) {
  return {
    sortTableRows: (value, e) => dispatch(sortTableRows(value, e))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Table);
