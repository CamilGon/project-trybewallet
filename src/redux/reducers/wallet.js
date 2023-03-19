// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

const INITIAL_STATE = {
  wallet: 0,
};
function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'SAVE_WALLET':
    return {
      ...state,
      wallet: action.payload,
    };
  default:
    return state;
  }
}

export default wallet;
