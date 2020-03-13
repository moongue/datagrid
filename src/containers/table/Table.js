import React, { useEffect } from 'react';
import './Table.scss';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Loader from '../../components/Loader/Loader';
import MultiSelect from '../../Select/Select';
import {
  changeLoader,
  changeSortSelect,
  inputListener,
  searchListener,
  sortTableRows
} from '../../store/actions/tableActions';

function Table(props) {
  window.addEventListener('keypress', e => {
    if (e.key === 'Enter') props.searchListener();
  });

  const sortedType = type => {
    if (props[type] === null) {
      return;
    }
    return props[type] ? 'up' : 'down';
  };

  useEffect(() => {
    props.changeLoader(false);
  });

  return (
    <>
      <div className="search">
        <input
          onChange={props.inputListener}
          value={props.searchValue}
          className="table-search"
          placeholder="Search..."
          type="text"
        />
        <button
          onClick={props.searchListener}
          type="button"
          className="btn-search"
        >
          Search
        </button>
      </div>
      <MultiSelect
        defaultValues={props.sortedSelectType}
        changeSortSelect={props.changeSortSelect}
      />
      <div className="table">
        <div className="table-row table__header">
          <button
            onClick={props.sortTableRows.bind(this, 'id')}
            type="button"
            className={sortedType('id')}
          >
            id
          </button>
          <button type="button" disabled>
            img
          </button>
          <button
            onClick={props.sortTableRows.bind(this, 'name')}
            type="button"
            className={sortedType('name')}
          >
            name
          </button>
          <button
            onClick={props.sortTableRows.bind(this, 'amount')}
            type="button"
            className={sortedType('amount')}
          >
            amount
          </button>
          <button
            onClick={props.sortTableRows.bind(this, 'transactionType')}
            type="button"
            className={sortedType('transactionType')}
          >
            transaction
          </button>
          <button
            onClick={props.sortTableRows.bind(this, 'locationName')}
            type="button"
            className={sortedType('locationName')}
          >
            city
          </button>
          <button
            onClick={props.sortTableRows.bind(this, 'isActive')}
            type="button"
            className={sortedType('isActive')}
          >
            status
          </button>
        </div>
        {props.loader ? (
          <Loader />
        ) : (
          props.dataTable.data.map(item => (
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
                  <p className="table-row__type table-row__type_online">
                    online
                  </p>
                ) : (
                  <p className="table-row__type table-row__type_offline">
                    offline
                  </p>
                )}
              </span>
            </div>
          ))
        )}
      </div>
    </>
  );
}

Table.propTypes = {
  dataTable: PropTypes.object.isRequired,
  sortTableRows: PropTypes.func.isRequired,
  inputListener: PropTypes.func.isRequired,
  searchValue: PropTypes.string.isRequired,
  searchListener: PropTypes.func.isRequired,
  changeLoader: PropTypes.func.isRequired,
  changeSortSelect: PropTypes.func.isRequired,
  loader: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    dataTable: state.table.dataTable,
    searchValue: state.table.searchValue,
    loader: state.table.loader,
    sortedSelectType: state.table.sortedSelectType,
    id: state.table.sortedTypes.id,
    name: state.table.sortedTypes.name,
    amount: state.table.sortedTypes.amount,
    locationName: state.table.sortedTypes.locationName,
    transactionType: state.table.sortedTypes.transactionType,
    isActive: state.table.sortedTypes.isActive,
    img: state.table.sortedTypes.img
  };
}

function mapDispatchToProps(dispatch) {
  return {
    sortTableRows: value => dispatch(sortTableRows(value)),
    inputListener: e => dispatch(inputListener(e)),
    searchListener: () => dispatch(searchListener()),
    changeLoader: value => dispatch(changeLoader(value)),
    changeSortSelect: el => dispatch(changeSortSelect(el))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Table);
