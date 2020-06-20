import {
  CURRENT_USER,
  ADD_NEW_USER,
  UPDATE_USER,
} from "../actions/actionTypes";
const initialState = {
  users: [
    {
      firstName: "surekha",
      lastName: "Gadkari",
      username: "surekhag",
      password: "12345678",
      contact_number: "7894561230",
      email: "mails.surekhag@gmail.com",
    },
  ],
  error: "null",
  currentUser: null,
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case CURRENT_USER:
      return {
        ...state,
        currentUser: action.userInfo,
      };
    case ADD_NEW_USER:
      return {
        ...state,
        currentUser: action.userInfo,
        users: [...state.users, action.userInfo],
      };
    case UPDATE_USER:
      return {
        ...state,
        users: action.userInfo,
      };

    default:
      return state;
  }
};

export default loginReducer;
