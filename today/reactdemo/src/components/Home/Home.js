// import React from "react";
// const Home = (props) => {
//   console.log(props.location.state);
//   return (
//     <>
//       <h1>Home</h1>
//     </>
//   );
// };
// export default Home;

import React, { useContext } from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "../../material-ui/Grid/GridItem";
import GridContainer from "../../material-ui/Grid/GridContainer";

import Button from "@material-ui/core/Button";
import Card from "../../material-ui/Card/Card";
import CardHeader from "../../material-ui/Card/CardHeader";
// import { formatDate } from "../../helpers/formatDates";
import CardBody from "../../material-ui/Card/CardBody";
import Table from "../../material-ui/Table/Table";
// import withAuth from "../../HOC/withAuth";
// import { UserContext } from "../../context-provider/user-context";
import styles from "../../material-ui/styles/dashboardStyle";
const useStyles = makeStyles(styles);

const Home = (props) => {
  // console.log(props.location.state.data);
  const classes = useStyles();
  const data = props.location.state.data;

  const {
    username,
    password,
    firstName,
    lastName,
    email,
    contact_number,
  } = data;
  console.log(username, password, firstName, lastName, email, contact_number);

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

  return (
    <GridContainer>
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
      </GridItem>
    </GridContainer>
  );
};

export default Home;
