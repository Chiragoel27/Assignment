const initialState = {
  primaryColor: 'white',
};

const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_PRIMARY_COLOR':
      return {
        ...state,
        primaryColor: action.payload,
      };
    default:
      return state;
  }
};

export default themeReducer;
