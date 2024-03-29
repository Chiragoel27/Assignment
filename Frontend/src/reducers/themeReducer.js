// reducers/themeReducer.js
const initialState = {
  primaryColor: 'white', // Default primary color
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
