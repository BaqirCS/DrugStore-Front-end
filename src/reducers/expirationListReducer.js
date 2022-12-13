export const expirationListReducer = (state, action) => {
  switch (action.type) {
    case 'GET_D_REQUEST':
      return { ...state, loading: true };

    case 'GET_D_SUCCESS':
      return {
        ...state,
        loading: false,
        list: action.payload,
      };
    case 'GET_D_FAIL': {
      return { ...state, loading: false, error: true, message: action.payload };
    }
    default:
      return state;
  }
};
export const initialState = {
  loading: false,
  error: false,
  message: '',
  list: [],
};
