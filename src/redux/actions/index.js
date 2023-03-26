import fetchCoins from '../../services/WalletAPI';

export const REQUEST_CURRENCY = 'REQUEST_CURRENCY';
export const RECEIVE_CURRENCY = 'RECEIVE_CURRENCY';
export const SAVE_EXPENSES = 'SAVE_EXPENSES';
export const EDIT_EXPENSES = 'EDIT_EXPENSES';
export const REMOVE_EXPENSES = 'REMOVE_EXPENSES';
export const EDIT_OFF = 'EDIT_OFF';
export const EDIT_ON = 'EDIT_ON';

export const saveUserLogin = ({ email }) => ({
  type: 'SAVE_USER_LOGIN',
  payload: email,
});

export const saveExpenses = (payload) => ({
  type: SAVE_EXPENSES,
  payload,
});

export const requestCurrency = () => ({
  type: REQUEST_CURRENCY,
});
export const expensesRemove = (id) => ({
  type: REMOVE_EXPENSES,
  payload: id,
});

export const modeONEdit = (id) => ({
  type: EDIT_ON,
  payload: id,
});

export const editExpenses = (payload) => ({
  type: EDIT_EXPENSES,
  payload,
});

export const editOff = () => ({
  type: EDIT_OFF,
  payload: 0,
});

export const receiveCurrency = (listCurrency) => ({
  type: RECEIVE_CURRENCY,
  payload: listCurrency,
});

export const fetchCurrency = async (dispatch) => {
  try {
    dispatch(requestCurrency());
    const listCurrency = await fetchCoins();
    const listCoins = Object.keys(listCurrency);
    const USDT = listCoins.indexOf('USDT');
    listCoins.splice(USDT, 1);
    dispatch(receiveCurrency(listCoins));
  } catch (error) {
    return error;
  }
};

export const coinSearch = () => fetchCurrency;
