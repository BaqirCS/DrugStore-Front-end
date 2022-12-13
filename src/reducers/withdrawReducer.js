export const withdrawReducer = (state, action) => {
  switch (action.type) {
    case 'WITHDRAW_REQUEST':
      return { ...state, loading: true };

    case 'WITHDRAW_SUCCESS':
      return {
        ...state,
        loading: false,
        success: true,
        message: 'your withdraw transaction has successfully saved in system',
        allWithdraws: [...state.allWithdraws, action.payload],
      };
    case 'WITHDRAW_FAIL': {
      return {
        ...state,
        loading: false,
        error: true,
        message: action.payload,
      };
    }
    case 'RESET':
      return { ...state, loading: false, error: false, success: false };

    case 'GET_WITHDRAW_REQUEST':
      return {
        ...state,
        loadingAll: true,
      };
    case 'GET_WITHDRAW_SUCCESS':
      return {
        ...state,
        loadingAll: false,
        allWithdraws: action.payload,
      };
    case 'GET_WITHDRAW_FAIL':
      return {
        ...state,
        loadingAll: false,
        error: true,
        message: action.payload,
      };

    case 'UPDATE_WITHDRAW_REQUEST':
      return {
        ...state,
        loading: true,
      };
    case 'UPDATE_WITHDRAW_SUCCESS':
      const newArray = state.allWithdraws.map((item) => {
        return item._id === action.payload._id ? action.payload : item;
      });
      return {
        ...state,
        loading: false,
        success: true,
        message: 'the withdraw record has been successfully updated',
        allWithdraws: newArray,
      };

    default:
      return state;
  }
};
export const initialState = {
  loading: false,
  loadingAll: false,

  error: false,
  success: false,
  message: '',
  allWithdraws: [],
};
