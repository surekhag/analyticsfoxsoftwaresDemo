const initialState = {
  users: [
    {
      firstName: "surekha",
      lastName: "Gadkari",
      username: "surekha",
      password: "12345678",
      contact_number: "7894561230",
      email: "mails.surekhag@gmail.com",
    },
  ],
  error: "null",
};

const loginReducer = (state = initialState, action) => {
  console.log("in reducer ", state);
  switch (action.type) {
    // case SET_ERROR_STATE:
    //   return {
    //     ...state,
    //     error: action.errorData,
    //   };

    default:
      return state;
  }
};

export default loginReducer;
