export const addDeficiencyReducer = (state, action) => {
  switch (action.type) {
    case 'SEND_D_REQUEST':
      return { ...state, loading: true };

    case 'SEND_D_SUCCESS':
      return {
        ...state,
        loading: false,
        success: true,
        message: 'your request for new drug has saved in system successfully',
      };
    case 'SEND_D_FAIL': {
      return { ...state, loading: false, error: true, message: action.payload };
    }
    case 'RESET':
      return { ...state, loading: false, error: false, success: false };

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
