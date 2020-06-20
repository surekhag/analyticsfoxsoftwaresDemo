import * as Yup from "yup";
const yupRequired = (text) => {
  return Yup.string().required(`${text} is required`);
};
const yupRequiredNumber = (text) => {
  return Yup.number().required(`${text} is required`);
};

export const creatNewValidations = Yup.object().shape({
  firstName: yupRequired("First Name")
    .min(2, "Too Short!")
    .max(50, "Too Long!"),
  lastName: yupRequired("Last Name").min(2, "Too Short!").max(50, "Too Long!"),
  username: yupRequired("Username").min(6, "Too Short!").max(50, "Too Long!"),
  password: yupRequired("Password").min(6, "Too Short!").max(50, "Too Long!"),
  email: yupRequired("Email").min(2, "Too Short!").max(50, "Too Long!"),
  contact_number: yupRequiredNumber("Contact Number"),
});
// export const projectAllocationInitialValues = {
//   firstName: undefined,
//   lastName: undefined,
//   contact_number: undefined,
//   username: undefined,
//   password: undefined,
//   email: undefined,
// };

export const userInputList = [
  { md: 6, name: "firstName", labelText: "First Name *" },
  { md: 6, name: "lastName", labelText: "Last Name *" },
  { md: 6, name: "username", labelText: "Username *" },
  { md: 6, name: "password", labelText: "Password *" },
  { md: 6, name: "email", labelText: "Email *" },
  { md: 6, name: "contact_number", labelText: "Contact Number *" },
];
