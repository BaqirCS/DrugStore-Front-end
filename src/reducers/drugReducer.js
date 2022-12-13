export const drugReducer = (state, action) => {
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

    case 'DELETE_D_SUCCESS':
      const newArray = state.drugs.filter(
        (item) => item._id !== action.payload._id
      );
      return {
        ...state,
        drugs: newArray,
      };
    case 'DELETE_D_FAIL':
      return {
        ...state,
        error: true,
        message: action.payload,
      };

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
