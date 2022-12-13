export const sellPageReducer = (state, action) => {
  switch (action.type) {
    case 'GET_D_REQUEST':
      return { ...state, loading: true };

    case 'GET_D_SUCCESS':
      return {
        ...state,
        loading: false,
        drugs: action.payload,
      };
    case 'GET_D_FAIL': {
      return { ...state, loading: false, error: true, message: action.payload };
    }
    case 'GET_S_FAIL': {
      return { ...state, loading: false, error: true, message: action.payload };
    }
    case 'RESET': {
      return { ...state, loading: false, error: false, message: '' };
    }

    default:
      return state;
  }
};
export const initialState = {
  loading: false,
  error: false,
  message: '',
  drugs: [],
};
