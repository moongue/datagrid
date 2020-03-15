import React, { useEffect } from 'react';
import './Table.scss';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FixedSizeList } from 'react-window';
import Loader from '../../components/Loader/Loader';
import MultiSelect from '../../components/MultiSelect/MultiSelect';
import Select from '../../components/Select/Select';
import ToggleInput from '../../components/Toggle/Toggle';
import {
  changeLoader,
  changeSortSelect,
  inputListener,
  searchListener,
  sortTableRows,
  changeSortStatus,
  changeVirtualizeTable,
  checkRow, deleteRows
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

  const Row = ({ index, style }) => (
    <div
      key={props.dataTable.data[index].id}
      style={style}
      className={`${'table-row'} ${index % 2 !== 0 ? 'even' : ''} ${
        props.dataTable.data[index].active ? 'check-active' : ''
      }`}
      onClick={() => props.checkRow(index, props.dataTable.data[index].id)}
    >
      <span className="table-row__id">{props.dataTable.data[index].id}</span>
      <span className="table-row__img">
        <img src={props.dataTable.data[index].img} alt="avatar" />
      </span>
      <span className="table-row__name">
        {props.dataTable.data[index].name}
      </span>
      <span className="table-row__amount">
        {props.dataTable.data[index].amount}$
      </span>
      <span className="table-row__transaction">
        {props.dataTable.data[index].transactionType}
      </span>
      <span className="table-row__location">
        {props.dataTable.data[index].locationName}
      </span>
      <span className="table-row__type">
        {props.dataTable.data[index].isActive ? (
          <p className="table-row__type table-row__type_online">online</p>
        ) : (
          <p className="table-row__type table-row__type_offline">offline</p>
        )}
      </span>
    </div>
  );

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
      <div className="row">
        <MultiSelect
          defaultValues={props.sortedTransactionType}
          changeSortSelect={props.changeSortSelect}
        />
        <Select
          defaultValue={props.sortedStatusType}
          changeSortSelect={props.changeSortStatus}
        />
      </div>
      <div className="stroke">
        <ToggleInput
          defaultValue={props.virtualizeTable}
          listener={props.changeVirtualizeTable}
        />
        <p style={{ margin: '0 0 0 50px' }}>Select items: {props.checkedRows.length}</p>
        <button
          className="btn"
          type="button"
          disabled={!props.checkedRows.length}
          onClick={props.deleteRows}
        >
          Delete
        </button>
      </div>
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
        ) : props.virtualizeTable ? (
          <FixedSizeList
            height={664}
            itemSize={64}
            itemCount={props.dataTable.data.length}
            className="table"
          >
            {Row}
          </FixedSizeList>
        ) : (
          <div className="default-table">
            {props.dataTable.data.map((item, i) => (
              <Row index={i} key={i} />
            ))}
          </div>
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
  sortedStatusType: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
    .isRequired,
  searchListener: PropTypes.func.isRequired,
  changeLoader: PropTypes.func.isRequired,
  changeSortSelect: PropTypes.func.isRequired,
  sortedTransactionType: PropTypes.array.isRequired,
  changeVirtualizeTable: PropTypes.func.isRequired,
  changeSortStatus: PropTypes.func.isRequired,
  checkedRows: PropTypes.array.isRequired,
  virtualizeTable: PropTypes.bool.isRequired,
  checkRow: PropTypes.func.isRequired,
  deleteRows: PropTypes.func.isRequired,
  loader: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    dataTable: state.table.dataTable,
    checkedRows: state.table.checkedRows,
    searchValue: state.table.searchValue,
    loader: state.table.loader,
    sortedTransactionType: state.table.sortedTransactionType,
    sortedStatusType: state.table.sortedStatusType,
    virtualizeTable: state.table.virtualizeTable,
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
    changeSortSelect: el => dispatch(changeSortSelect(el)),
    changeSortStatus: value => dispatch(changeSortStatus(value)),
    changeVirtualizeTable: () => dispatch(changeVirtualizeTable()),
    checkRow: (index, id) => dispatch(checkRow(index, id)),
    deleteRows: () => dispatch(deleteRows())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Table);
