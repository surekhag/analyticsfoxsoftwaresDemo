import React, { useState } from "react";
import { connect } from "react-redux";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
// import {signinToSite} from '../../actions/loginActions';
import { useToasts } from "react-toast-notifications";
import { setCurrentUserData } from "../../actions/userActions";
// import Home from "../Home/Home";
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  alignLink: {
    textAlign: "center",
  },
}));

const SignIn = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const allUsers = useSelector((state) => state.loginReducer.users);
  const { addToast } = useToasts();

  const handleSubmitForm = (e) => {
    e.preventDefault();

    if (!username || !password) {
      addToast("Please enter Invalid Username/Password", {
        appearance: "error",
        autoDismiss: true,
      });
    }
    if (username && password) {
      const foundUser = allUsers.find(
        (element) =>
          element.username === username && element.password === password
      );

      if (foundUser) {
        addToast("Logged in successfully!", {
          appearance: "success",
          autoDismiss: true,
        });
        setCurrentUser(foundUser);
        dispatch(setCurrentUserData(foundUser));
      } else {
        addToast("User does not exist!", {
          appearance: "error",
          autoDismiss: true,
        });
      }
    }
  };

  return (
    <>
      {currentUser ? (
        <Redirect
          to={{
            pathname: "/home",
            state: { data: currentUser },
          }}
        />
      ) : (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>

            <form
              className={classes.form}
              noValidate
              onSubmit={handleSubmitForm}
            >
              <TextField
                variant="outlined"
                margin="normal"
                required={true}
                fullWidth
                id="username"
                label="User Name"
                name="username"
                autoComplete="username"
                autoFocus
                onChange={(event) => {
                  setusername(event.target.value);
                }}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required={true}
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(event) => {
                  setpassword(event.target.value);
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign In
              </Button>
              <div className={classes.alignLink}>
                <Link to="/register">Register USer</Link>
              </div>
            </form>
          </div>
          <Box mt={8}>
            <Copyright />
          </Box>
        </Container>
      )}
    </>
  );
};
export default SignIn;
