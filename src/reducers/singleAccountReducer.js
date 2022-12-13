export const singleAccountReducer = (state, action) => {
  switch (action.type) {
    case 'SINGLE_ACCOUNT_REQUEST':
      return { ...state, loading: true };
    case 'SINGLE_ACCOUNT_SUCCESS':
      return {
        ...state,
        loading: false,
        singleAccounts: action.payload,
      };
    case 'SINGLE_ACCOUNT_ERROR':
      return { ...state, loading: false, error: true, message: action.payload };

    default:
      return state;
  }
};
export const initialState = {
  error: false,
  loading: false,
  message: '',
  singleAccounts: [
    {
      accounts: [],
      dayResult: {},
    },
  ],
};
