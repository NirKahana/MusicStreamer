import React, { useState, useRef } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { InputAdornment, IconButton } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";

import { useAuth } from "../../contexts/AuthContext";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  page: {
    display: "flex",
    justifyContent: "center",
    background: `linear-gradient(30deg, #f2f2f2, #9198e5 75%)`,
    paddingTop: "5em",
    width: "100vw",
    height: "100vh",
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#484bb8",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const history = useHistory();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [passwordError, setPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const [loading, setLoading] = useState(false);
  const hidePassword = () => setShowPassword(false);
  const revealPassword = () => setShowPassword(true);
  const hidePasswordConfirm = () => setShowPasswordConfirm(false);
  const revealPasswordConfirm = () => setShowPasswordConfirm(true);

  const { signup } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      setLoading(false);
      return setPasswordError(true);
    }
      const email = emailRef.current.value;
      const result = await signup(emailRef.current.value, passwordRef.current.value);
      if(!result.code) {
        history.push("/");
        await axios.post('/users', {email});
      } else {
          swal("Failed To Sign Up", result.message, "error");
          setLoading(false);
      }
  };

  const clearErrors = () => {
    setPasswordError(false);
  };
  const onKeyPressed = (e) => {
    if(e.key === "Enter") {
      e.preventDefault();
      e.target.click();
    }
  }

  return (
    <>
      <div className={classes.page} onClick={clearErrors} onKeyPress={onKeyPressed}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    inputRef={emailRef}
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    inputRef={passwordRef}
                    error={passwordError}
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    id="password"
                    autoComplete="current-password"
                    InputProps={{
                      // <-- This is where the toggle button is added.
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onMouseUp={hidePassword}
                            onMouseDown={revealPassword}
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    inputRef={passwordConfirmRef}
                    error={passwordError}
                    variant="outlined"
                    required
                    fullWidth
                    name="passwordConfirm"
                    label="Confirm Password"
                    type={showPasswordConfirm ? "text" : "password"}
                    id="passwordConfirm"
                    autoComplete="current-password"
                    helperText={passwordError ? "Passwords Do Not Match" : null}
                    InputProps={{
                      // <-- This is where the toggle button is added.
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onMouseUp={hidePasswordConfirm}
                            onMouseDown={revealPasswordConfirm}
                          >
                            {showPasswordConfirm ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={loading}
              >
                Sign Up
              </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link href="/signin" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
          <Box mt={5}>
            <Copyright />
          </Box>
        </Container>
      </div>
    </>
  );
}
