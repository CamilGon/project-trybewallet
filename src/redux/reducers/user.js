// Esse reducer será responsável por tratar as informações da pessoa usuária
const INITIAL_STATE = {
  email: '',
};
function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'SAVE_USER_LOGIN':
    return {
      ...state,
      email: action.payload,
    };
  default:
    return state;
  }
}

export default user;
