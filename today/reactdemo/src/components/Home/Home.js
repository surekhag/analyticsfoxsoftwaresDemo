import React, { useState } from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "../../material-ui/Grid/GridItem";
import GridContainer from "../../material-ui/Grid/GridContainer";
import Register from "../Register/Register";
import Button from "@material-ui/core/Button";
import Card from "../../material-ui/Card/Card";
import CardHeader from "../../material-ui/Card/CardHeader";
// import { formatDate } from "../../helpers/formatDates";
import CardBody from "../../material-ui/Card/CardBody";
import Table from "../../material-ui/Table/Table";
// import withAuth from "../../HOC/withAuth";
// import { UserContext } from "../../context-provider/user-context";
import styles from "../../material-ui/styles/dashboardStyle";
import { Link, Redirect } from "react-router-dom";
// import Button from "@material-ui/core/Button";
const useStyles = makeStyles(styles);
const stylesForButton = {
  width: "30%",
  borderRadius: "5",
  margin: "auto",
};

const Home = (props) => {
  // console.log(props.location.state.data);
  const classes = useStyles();
  const data = props.location.state.data;
  const [user, setUser] = useState(null);
  const {
    username,
    password,
    firstName,
    lastName,
    email,
    contact_number,
  } = data;
  // console.log(username, password, firstName, lastName, email, contact_number);

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
    console.log("setUser", data);
    setUser(data);
  };

  return (
    <>
      {user ? (
        <Redirect
          to={{
            pathname: "/register",
            state: { projectToUpdate: user },
          }}
        />
      ) : (
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>User Profile</h4>
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
            <Button
              onClick={editUser}
              fullWidth
              variant="contained"
              color="primary"
            >
              Edit Employee
            </Button>
          </div>
        </GridItem>
      )}
    </>
  );
};

export default Home;
