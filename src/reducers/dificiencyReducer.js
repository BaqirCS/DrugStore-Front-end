export const dificiencyReducer = (state, action) => {
  switch (action.type) {
    case 'GET_D_REQUEST':
      return {
        ...state,
        loading: true,
      };

    case 'GET_D_SUCCESS':
      return {
        ...state,
        loading: false,
        deficiencis: action.payload,
      };
    case 'GET_D_FAIL':
      return {
        ...state,
        error: true,
        message: action.payload,
      };
    case 'DELETE_D_REQUEST':
      return {
        ...state,
        loading: true,
      };

    case 'DELETE_D_SUCCESS':
      const newArray = state.deficiencis.filter(
        (item) => item._id !== action.payload._id
      );
      return {
        ...state,
        loading: false,
        deficiencis: newArray,
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
  deficiencis: [],
  error: false,
  message: '',
  loading: false,
};
