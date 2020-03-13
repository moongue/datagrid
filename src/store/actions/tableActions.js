import {
  FILTER_STATUS,
  INPUT_SEARCH_VALUE,
  SEARCH_ROWS,
  SORT_SELECT,
  TABLE_LOADER,
  TABLE_SORT,
  TABLE_SORT_CLEAR,
  TABLE_SORT_CURRENT
} from './actionTypes';

import defaultData from '../../api/dataTable';

function changeSort(data) {
  return {
    type: TABLE_SORT,
    payload: {
      data
    }
  };
}

function clearStateSort() {
  return {
    type: TABLE_SORT_CLEAR
  };
}

function currentSort(value, sortType) {
  return {
    type: TABLE_SORT_CURRENT,
    key: sortType,
    payload: value
  };
}

function filteredTable(data) {
  return {
    type: SEARCH_ROWS,
    payload: {
      data
    }
  };
}

export function changeLoader(value) {
  return {
    type: TABLE_LOADER,
    payload: value
  };
}

export function inputListener({ target }) {
  return {
    type: INPUT_SEARCH_VALUE,
    payload: target.value
  };
}

function selectListener(value) {
  return {
    type: SORT_SELECT,
    payload: value
  };
}

function changeSortedStatusType(value) {
  return {
    type: FILTER_STATUS,
    payload: value
  };
}

function clearSearchValue() {
  return {
    type: INPUT_SEARCH_VALUE,
    payload: ''
  };
}

export function sortTableRows(value) {
  return (dispatch, getState) => {
    dispatch(changeLoader(true));
    const { table } = getState();
    let newSortTable;
    if (table.sortedTypes[value]) {
      newSortTable = table.dataTable.data.reverse();
      dispatch(currentSort(false, value));
    } else {
      if (value === 'id' || value === 'amount' || value === 'isActive') {
        newSortTable = table.dataTable.data.sort((a, b) => b[value] - a[value]);
      } else {
        newSortTable = table.dataTable.data.sort((a, b) => {
          if (a[value] < b[value]) return -1;
          if (a[value] > b[value]) return 1;
          return 0;
        });
      }
      dispatch(clearStateSort());
      dispatch(currentSort(true, value));
    }
    dispatch(changeSort(newSortTable));
    dispatch(changeLoader(false));
  };
}

export function searchListener() {
  return (dispatch, getStore) => {
    dispatch(changeLoader(true));
    dispatch(selectListener([]));
    dispatch(changeSortedStatusType([]));
    const { table } = getStore();
    defaultData.data.forEach(item =>
      Object.defineProperty(item, 'img', { enumerable: false })
    );
    const newFilterTable = defaultData.data.filter(item => {
      if (
        'online'.indexOf(table.searchValue.toLowerCase()) !== -1 &&
        item.isActive
      )
        return true;

      if (
        'offline'.indexOf(table.searchValue.toLowerCase()) !== -1 &&
        !item.isActive
      )
        return true;

      return Object.values(item).some(el => {
        return (
          `${el}`.toLowerCase().indexOf(table.searchValue.toLowerCase()) !== -1
        );
      });
    });
    dispatch(filteredTable(newFilterTable));
    dispatch(changeLoader(false));
  };
}

export function changeSortSelect(el) {
  return (dispatch, getState) => {
    dispatch(selectListener(el));
    dispatch(clearSearchValue());
    dispatch(changeSortedStatusType([]));
    const {
      table: { sortedTransactionType }
    } = getState();
    if (sortedTransactionType === null)
      return dispatch(filteredTable(defaultData.data));
    const valuesSelect = [];
    sortedTransactionType.forEach(item => valuesSelect.push(item.value));
    const newDate = defaultData.data.filter(item => {
      return valuesSelect.some(
        selectName => item.transactionType.indexOf(selectName) !== -1
      );
    });
    dispatch(filteredTable(newDate));
  };
}

export function changeSortStatus(value) {
  return (dispatch, getState) => {
    dispatch(changeSortedStatusType(value));
    dispatch(selectListener([]));
    dispatch(clearSearchValue());
    const { table } = getState();
    const newSortedData = defaultData.data.filter(item => {
      if (table.sortedStatusType.value === 'online') {
        return item.isActive;
      }
      return !item.isActive;
    });
    dispatch(changeSort(newSortedData));
  };
}
