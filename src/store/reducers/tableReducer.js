import data from '../../api/dataTable';
import { TABLE_SORT, TABLE_SORT_CURRENT } from '../actions/actionTypes';

const initialState = {
  dataTable: data,
  id: null,
  name: null,
  amount: null,
  transactionType: null,
  isActive: null,
  img: null
};

export default function tableReducer(state = initialState, action) {
  switch (action.type) {
    case TABLE_SORT:
      return {
        ...state,
        dataTable: action.payload
      };
    case TABLE_SORT_CURRENT:
      return {
        ...state,
        [action.key]: action.payload
      };
    default:
      return state;
  }
}
