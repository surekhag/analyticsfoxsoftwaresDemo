import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridItem from "../../material-ui/Grid/GridItem";
import GridContainer from "../../material-ui/Grid/GridContainer";
import Button from "../../material-ui/CustomButtons/Button";
import Card from "../../material-ui/Card/Card";
import CardHeader from "../../material-ui/Card/CardHeader";
import CardBody from "../../material-ui/Card/CardBody";
import Table from "../../material-ui/Table/Table";
import styles from "../../material-ui/styles/dashboardStyle";
import { Redirect } from "react-router-dom";
import { setCurrentUserData } from "../../actions/userActions";
import { useDispatch } from "react-redux";

const useStyles = makeStyles(styles);
const stylesForButton = {
  width: "30%",
  borderRadius: "5",
  margin: "auto",
  display: "flex",
  justifyContent: "center",
};
const titleText = {
  textAlign: "center",
};

const Home = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const data = props.location.state.data;
  const [redirect, setRedirect] = useState(false);
  const [user, setUser] = useState(null);
  const {
    username,
    password,
    firstName,
    lastName,
    email,
    contact_number,
  } = data;

  let employeeDataArray = [];
  const headerArray = [];

  employeeDataArray = [
    [
      <span className={classes.boldText}>Name</span>,
      `${firstName} ${lastName}`,
    ],
    [<span className={classes.boldText}>User Name</span>, username],
    [<span className={classes.boldText}>Email</span>, email],
    [<span className={classes.boldText}>contact Number</span>, contact_number],
  ];
  const editUser = () => {
    setUser(data);
  };
  const logout = () => {
    dispatch(setCurrentUserData(null));
    setRedirect(true);
  };
  return (
    <>
      {redirect ? <Redirect to="/login" /> : null}
      {user ? (
        <Redirect
          to={{
            pathname: "/register",
            state: { userToUpdate: user },
          }}
        />
      ) : (
        <GridItem xs={12} sm={12} md={12}>
          <h1 style={titleText}>Welcome to Home</h1>
          <Card>
            <CardHeader color="primary">
              <h4 style={titleText} className={classes.cardTitleWhite}>
                User Profile
              </h4>
            </CardHeader>
            <CardBody>
              <GridContainer>
                {employeeDataArray && (
                  <Table
                    tableHeaderColor="gray"
                    tableHead={headerArray}
                    tableData={employeeDataArray}
                  />
                )}
              </GridContainer>
            </CardBody>
          </Card>

          <div style={stylesForButton}>
            <Button onClick={editUser} variant="contained" color="primary">
              Edit USER
            </Button>
            <Button onClick={logout} variant="contained" color="primary">
              LOGOUT
            </Button>
          </div>
        </GridItem>
      )}
    </>
  );
};

export default Home;
