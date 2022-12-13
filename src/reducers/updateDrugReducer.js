export const updateDrugReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_D_REQUEST':
      return { ...state, loading: true };

    case 'UPDATE_D_SUCCESS':
      return {
        ...state,
        loading: false,
        success: true,
        message: 'the record is succesfully updated',
      };
    case 'UPDATE_D_FAIL': {
      return { ...state, loading: false, error: true, message: action.payload };
    }
    case 'RESET':
      return {
        ...state,
        loading: false,
        error: false,
        message: '',
        success: false,
      };

    case 'GET_D_FAIL':
      return { ...state, loading: false, error: true, message: action.payload };

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
