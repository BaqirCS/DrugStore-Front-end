export const addDrugReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_D_REQUEST':
      return { ...state, loading: true };

    case 'ADD_D_SUCCESS':
      return {
        ...state,
        loading: false,
        success: true,
        message: 'A new drug has successfully added to system',
      };
    case 'ADD_D_FAIL': {
      return { ...state, loading: false, error: true, message: action.payload };
    }
    case 'RESET': {
      return {
        ...state,
        loading: false,
        error: false,
        message: '',
        success: false,
      };
    }

    default:
      return state;
  }
};
export const initialState = {
  loading: false,
  error: false,
  success: false,
  message: '',
};
