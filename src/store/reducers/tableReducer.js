import data from '../../api/dataTable';

const initialState = {
  dataTable: data
};

export default function tableReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

