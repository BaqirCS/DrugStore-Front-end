export const accountReducer = (state, action) => {
  switch (action.type) {
    case 'GET_D_REQUEST':
      return {
        ...state,
        loading: true,
        error: false,
      };

    case 'GET_D_SUCCESS':
      return {
        ...state,
        loading: false,
        dailyAcc: action.payload,
      };
    case 'GET_D_FAIL':
      return {
        ...state,
        error: action.payload,
        message: action.payload,
      };
    case 'GET_M_REQUEST':
      return {
        ...state,
        loading: true,
        error: false,
      };

    case 'GET_M_SUCCESS':
      return {
        ...state,
        loading: false,
        monthlyAcc: action.payload,
      };
    case 'GET_M_FAIL':
      return {
        ...state,
        error: action.payload,
        message:
          'Getting Monthly Financials got Error, please contact with system administrator',
      };
    case 'GET_T_REQUEST':
      return {
        ...state,
        loading: true,
        error: false,
      };

    case 'GET_T_SUCCESS':
      return {
        ...state,
        loading: false,
        totalAcc: action.payload,
      };
    case 'GET_T_FAIL':
      return {
        ...state,
        error: action.payload,
        message:
          'Getting Total Financial got Error, please contact with system administrator',
      };

    default:
      return state;
  }
};

export const initialState = {
  dailyAcc: [],
  monthlyAcc: [],
  totalAcc: {},
  error: true,
  message: 'hellow from message box',
  loading: true,
};
