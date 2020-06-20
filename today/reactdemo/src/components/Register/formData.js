import * as Yup from "yup";
const yupRequired = (text) => {
  return Yup.string().required(`${text} is required`);
};

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/; // for Mobile Numbers

export const creatNewValidations = Yup.object().shape({
  firstName: yupRequired("First Name")
    .min(2, "First Name must be at least 2 characters long!")
    .max(50, "Too Long!"),
  lastName: yupRequired("Last Name")
    .min(2, "Last Name must be at least 2 characters long!")
    .max(50, "Too Long!"),
  username: yupRequired("Username")
    .min(8, "Username must be at least 8 characters long!")
    .max(50, "Too Long!"),
  password: yupRequired("Password")
    .min(8, "Password must be at least 8 characters long!")
    .max(50, "Too Long!"),
  email: yupRequired("Email").email("Invalid email"),
  contact_number: yupRequired("Contact number is required.")
    .length(10, "Please enter a valid contact number.")
    .matches(phoneRegExp, "Please enter a valid contact number."),
});

export const userInputList = [
  { md: 6, name: "firstName", labelText: "First Name *" },
  { md: 6, name: "lastName", labelText: "Last Name *" },
  { md: 6, name: "username", labelText: "Username *" },
  { md: 6, name: "password", labelText: "Password *" },
  { md: 6, name: "email", labelText: "Email *" },
  { md: 6, name: "contact_number", labelText: "Contact Number *" },
];
