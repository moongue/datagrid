import data from '../../api/dataTable';
import {
  FILTER_STATUS,
  INPUT_SEARCH_VALUE,
  SEARCH_ROWS,
  SORT_SELECT,
  TABLE_LOADER,
  TABLE_SORT,
  TABLE_SORT_CLEAR,
  TABLE_SORT_CURRENT
} from '../actions/actionTypes';

const initialState = {
  dataTable: data,
  searchValue: '',
  loader: true,
  sortedTypes: {
    id: null,
    name: null,
    amount: null,
    locationName: null,
    transactionType: null,
    isActive: null,
    img: null
  },
  sortedTransactionType: [],
  sortedStatusType: []
};

export default function tableReducer(state = initialState, action) {
  switch (action.type) {
    case TABLE_SORT:
      return {
        ...state,
        dataTable: action.payload
      };
    case TABLE_SORT_CLEAR:
      return {
        ...state,
        sortedTypes: {
          id: null,
          name: null,
          amount: null,
          locationName: null,
          transactionType: null,
          isActive: null,
          img: null
        }
      };
    case TABLE_SORT_CURRENT:
      return {
        ...state,
        sortedTypes: {
          ...state.sortedTypes,
          [action.key]: action.payload
        }
      };
    case INPUT_SEARCH_VALUE:
      return {
        ...state,
        searchValue: action.payload
      };
    case SEARCH_ROWS:
      return {
        ...state,
        dataTable: action.payload
      };
    case TABLE_LOADER:
      return {
        ...state,
        loader: action.payload
      };
    case SORT_SELECT:
      return {
        ...state,
        sortedTransactionType: action.payload
      };
    case FILTER_STATUS:
      return {
        ...state,
        sortedStatusType: action.payload
      };
    default:
      return state;
  }
}
