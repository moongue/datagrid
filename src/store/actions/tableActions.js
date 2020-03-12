import { TABLE_SORT, TABLE_SORT_CLEAR, TABLE_SORT_CURRENT } from './actionTypes';

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

export function sortTableRows(value, { target }) {
  return (dispatch, getState) => {
    const { table } = getState();
    let newSortTable;

    if (value === 'id' || value === 'amount' || value === 'isActive') {
      newSortTable = table.dataTable.data.sort((a, b) => b[value] - a[value]);
    } else {
      newSortTable = table.dataTable.data.sort((a, b) => {
        if (a[value] < b[value]) return -1;
        if (a[value] > b[value]) return 1;
        return 0;
      });
    }

    dispatch(changeSort(newSortTable));
    dispatch(clearStateSort());
    dispatch(currentSort(true, value));
  };
}
