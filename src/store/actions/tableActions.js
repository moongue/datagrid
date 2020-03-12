import {
  INPUT_SEARCH_VALUE,
  SEARCH_ROWS,
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

export function inputListener({ target }) {
  return {
    type: INPUT_SEARCH_VALUE,
    payload: target.value
  };
}

export function sortTableRows(value) {
  return (dispatch, getState) => {
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
  };
}

export function searchListener() {
  return (dispatch, getStore) => {
    const { table } = getStore();
    const newFilterTable = defaultData.data.filter(item => {
      return (
        item.name.toLowerCase().indexOf(table.searchValue.toLowerCase()) !== -1
      );
    });
    dispatch(filteredTable(newFilterTable));
  };
}
