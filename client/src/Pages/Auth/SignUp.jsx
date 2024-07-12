import React from "react";
import Grid from "@mui/material/Grid";
import { Box, Button, Container, TextField } from "@mui/material";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useDispatch } from "react-redux";
import { signup } from "../../Redux-toolkit/Crud/authSlice";
import { useNavigate } from "react-router-dom";

const signUpSchema = yup.object().shape({
  name: yup.string().trim().required("name is required"),
  email: yup.string().trim().required("email is required"),
  password: yup.string().trim().required("password is required"),
  confirmPassword: yup.string().trim().required("confirmPassword is required"),
});

const SignUp = () => {
  const { handleSubmit, control } = useForm({
    resolver: yupResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();



  //sign up functionality---------------->

  const formSubmit = (data) => {
    // const formData = new FormData();
    // Object.keys(user).forEach((item) => formData.append(item, user[item]));
    dispatch(signup(data))
      .unwrap() // Unwraps the action to get the actual result or error
      .then(() => {
        navigate("/blogs");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container fixed>
      <Box
        className="form_sec"
        component="form"
        sx={{ padding: "100px 0" }}
        onSubmit={handleSubmit(formSubmit)}
      >
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Controller
              name="name"
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { invalid, error },
              }) => (
                <TextField
                  placeholder="Enter Name"
                  fullWidth
                  onChange={onChange}
                  value={value}
                  helperText={error?.message}
                  error={invalid}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="email"
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { invalid, error },
              }) => (
                <TextField
                  placeholder="Enter Email"
                  fullWidth
                  onChange={onChange}
                  value={value}
                  helperText={error?.message}
                  error={invalid}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="password"
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { invalid, error },
              }) => (
                <TextField
                  placeholder="Enter Password"
                  fullWidth
                  type="password"
                  onChange={onChange}
                  value={value}
                  helperText={error?.message}
                  error={invalid}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="confirmPassword"
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { invalid, error },
              }) => (
                <TextField
                  placeholder="Enter Confirm Password"
                  fullWidth
                  type="password"
                  onChange={onChange}
                  value={value}
                  helperText={error?.message}
                  error={invalid}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default SignUp;
