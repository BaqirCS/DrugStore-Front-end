export const loginReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return { ...state, loading: true };

    case 'LOGIN_SUCCESS':
      return {
        ...state,
        loading: false,
        success: true,
        message: action.payload,
      };
    case 'LOGIN_ERROR': {
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
