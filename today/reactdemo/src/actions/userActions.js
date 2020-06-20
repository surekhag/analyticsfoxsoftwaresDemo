import { ADD_NEW_USER, UPDATE_USER, CURRENT_USER } from "./actionTypes";

export function addNewUser(userInfo) {
  console.log("current data", userInfo);
  return {
    type: ADD_NEW_USER,
    userInfo,
  };
}
export function setCurrentUserData(userInfo) {
  return {
    type: CURRENT_USER,
    userInfo,
  };
}
export function updateUser(userInfo, id) {
  return {
    type: UPDATE_USER,
    payload: { userInfo, id },
  };
}
