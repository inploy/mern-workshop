const formReducer = (state, action) => {
  switch (action.type) {
    case "SET_DATA":
      return {
        ...state,
        ...action.payload,
      };
    case "HANDLE_INPUT":
      return {
        ...state,
        [action.field]: action.payload,
      };
    case "RESET":
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
export default formReducer;
