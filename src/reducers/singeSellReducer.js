export const singleSellReducer = (state, action) => {
  switch (action.type) {
    case 'GET_D_REQUEST':
      return { ...state, loading: true };

    case 'GET_D_SUCCESS':
      return {
        ...state,
        loading: false,
        drug: action.payload,
      };
    case 'GET_D_FAIL': {
      return { ...state, loading: false, error: true, message: action.payload };
    }

    case 'SEND_D_REQUEST':
      return { ...state, loading: true };

    case 'SEND_D_SUCCESS':
      return {
        ...state,
        loading: false,
      };
    case 'SEND_D_FAIL': {
      return {
        ...state,
        loading: false,
        errorForm: true,
        message: action.payload,
      };
    }
    case 'RESET': {
      return { ...state, loading: false, errorForm: false, message: '' };
    }

    default:
      return state;
  }
};
export const initialState = {
  loading: false,
  error: false,
  errorForm: false,
  message: '',
  drugs: {},
};
