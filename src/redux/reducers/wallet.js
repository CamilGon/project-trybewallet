import { REQUEST_CURRENCY, RECEIVE_CURRENCY,
  SAVE_EXPENSES, REMOVE_EXPENSES,
  EDIT_EXPENSES, EDIT_ON, EDIT_OFF } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  idToEdit: 0,
  editor: false,
  isFetching: false,
};

function walletReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_CURRENCY:
    return { ...state,
      isFetching: true };
  case RECEIVE_CURRENCY:
    return { ...state,
      currencies: action.payload,
      isFetching: false,
    };
  case SAVE_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case REMOVE_EXPENSES: {
    const idExpense = state.expenses.map((el) => (el.id));
    const index = idExpense.indexOf(action.payload);
    const expense = [...state.expenses];
    expense.splice(index, 1);
    return {
      ...state,
      expenses: expense,
    };
  }
  case EDIT_ON:
    return {
      ...state,
      editor: true,
      idToEdit: action.payload,
    };
  case EDIT_OFF:
    return {
      ...state,
      editor: false,
      idToEdit: action.payload,
    };
  case EDIT_EXPENSES: {
    const idExpense = state.expenses.map((ele) => (ele.id));
    const index = idExpense.indexOf(action.payload.id);
    const expense = [...state.expenses];
    expense[index] = action.payload;
    return {
      ...state,
      expenses: expense,
    };
  }
  default:
    return state;
  }
}

export default walletReducer;
