import { TABLE_SORT, TABLE_SORT_CURRENT } from './actionTypes';

function changeSort(data) {
  return {
    type: TABLE_SORT,
    payload: {
      data
    }
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
    const newSortTable = table.dataTable.data.sort(
      (a, b) => b[value] - a[value]
    );
    Promise.all([
      dispatch(changeSort(newSortTable)),
      dispatch(currentSort(true, value))
    ]).then(() => {
      if (getState().table[value]) {
        console.log(e);
      }
    });
  };
}
