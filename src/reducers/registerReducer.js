export const registerReducer = (state, action) => {
  switch (action.type) {
    case 'REGISTER_ERROR':
      return { ...state, loading: false, error: true, message: action.payload };
    case 'REGISTER_REQUEST':
      return { ...state, loading: true };
    case 'REGISTER_SUCCESS':
      return {
        ...state,
        loading: false,
        success: true,
        message: action.payload,
      };
    case 'RESET':
      return { ...state, loading: false, error: false, success: false };
    default:
      return state;
  }
};
export const initialState = {
  error: false,
  loading: false,
  success: false,
  message: 'here it is some thoing wrongsfsadf',
};
