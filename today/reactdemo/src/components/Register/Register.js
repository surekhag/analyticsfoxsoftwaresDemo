import React, { useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "../../material-ui/Grid/GridContainer";
import GridItem from "../../material-ui/Grid/GridItem";
import Card from "../../material-ui/Card/Card";
import CardHeader from "../../material-ui//Card/CardHeader";
import CardBody from "../../material-ui/Card/CardBody";
import CardFooter from "../../material-ui/Card/CardFooter";
import Button from "../../material-ui/CustomButtons/Button";
import { creatNewValidations, userInputList } from "./formData";
import { Link, Redirect } from "react-router-dom";

import InputFields from "../../material-ui/FromComponents/InputFields";
import { useToasts } from "react-toast-notifications";
import { Formik, Form } from "formik";
import styles from "../../material-ui/styles/dashboardStyle";
import { useSelector, useDispatch } from "react-redux";
import {
  updateUser,
  addNewUser,
  setCurrentUserData,
} from "../../actions/userActions";

const useStyles = makeStyles(styles);
const Register = (props) => {
  console.log("data", props.location.state);

  let { projectToUpdate } = props.location.state || {};
  const classes = useStyles();
  const { cardTitleWhite } = classes;
  const { addToast } = useToasts();
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const allUsers = useSelector((state) => state.loginReducer.users);
  const userForm = useRef(null);
  const [redirect, setRedirect] = useState(false);
  const submitFormValues = (values) => {
    const foundUser = allUsers.find(
      (element) => element.username === values.username
    );
    if (foundUser && !projectToUpdate) {
      addToast("Username Alredy Exist!", {
        appearance: "error",
        autoDismiss: true,
      });
    } else if (!foundUser && !projectToUpdate) {
      dispatch(addNewUser(values));
      setUser(values);
    } else if (foundUser && projectToUpdate) {
      const objIndex = allUsers.findIndex(
        (obj) => obj.username == values.username
      );
      if (allUsers[objIndex].username !== values.username) {
        console.log(
          "val change ",
          allUsers[objIndex].username,
          values.username
        );
      }
      allUsers[objIndex] = values;
      setCurrentUserData(values);
      dispatch(updateUser(allUsers[objIndex]));
      setUser(values); //back to edit;
    }
  };

  let initialValues;
  const {
    firstName,
    lastName,
    username,
    password,
    email,
    contact_number,
  } = projectToUpdate ? projectToUpdate : {};

  initialValues = {
    firstName,
    lastName,
    username,
    password,
    email,
    contact_number,
  };

  const handleCancelActivity = () => {
    console.log(user, projectToUpdate);
    if (projectToUpdate) {
      setUser(projectToUpdate);
    } else {
      // return <Redirect to="/login" />;  This is not working here
      setRedirect(true);
    }
  };

  const dataValidation = creatNewValidations;
  return (
    <>
      {redirect ? <Redirect to="/login" /> : null}
      {user ? (
        <Redirect
          to={{
            pathname: "/home",
            state: { data: user },
          }}
        />
      ) : (
        <GridContainer>
          <Formik
            initialValues={initialValues}
            onSubmit={(values, { setSubmitting }) => {
              submitFormValues(values);
              setSubmitting(false);
            }}
            validationSchema={dataValidation}
          >
            {({ isSubmitting, values, handleChange }) => (
              <GridItem xs={12} sm={12} md={12}>
                <Card>
                  <Form ref={userForm}>
                    <CardHeader color="primary">
                      <h4 className={cardTitleWhite}>
                        {projectToUpdate ? "UPDATE USER" : "ADD USER"}
                      </h4>
                    </CardHeader>

                    <CardBody>
                      <GridContainer>
                        <InputFields
                          inputList={userInputList}
                          values={values}
                          handleChange={handleChange}
                        />
                      </GridContainer>
                    </CardBody>

                    <CardFooter>
                      {projectToUpdate ? (
                        <>
                          <GridItem xs={12} sm={12} md={6}>
                            <Button
                              id="update"
                              type="submit"
                              color="primary"
                              disabled={isSubmitting}
                            >
                              UPDATE USER
                            </Button>
                            <Button
                              color="primary"
                              disabled={isSubmitting}
                              onClick={() => handleCancelActivity()}
                            >
                              BACK TO HOME
                            </Button>
                          </GridItem>
                        </>
                      ) : (
                        <>
                          <GridItem xs={12} sm={12} md={6}>
                            <Button
                              id="add"
                              type="submit"
                              color="primary"
                              disabled={isSubmitting}
                            >
                              ADD USER
                            </Button>
                            <Button
                              color="primary"
                              disabled={isSubmitting}
                              onClick={() => handleCancelActivity()}
                            >
                              BACK TO LOGIN
                            </Button>

                            {/* <Link to="/login">Login</Link> */}
                          </GridItem>
                        </>
                      )}
                    </CardFooter>
                  </Form>
                </Card>
              </GridItem>
            )}
          </Formik>
        </GridContainer>
      )}
    </>
  );
};
export default Register;
