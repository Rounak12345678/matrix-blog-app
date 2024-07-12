import React from "react";
import Grid from "@mui/material/Grid";
import { Box, Button, Container, TextField } from "@mui/material";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useDispatch } from "react-redux";

import { loginUser } from "../../Redux-toolkit/Crud/authSlice";

import { useNavigate } from "react-router-dom";

const signUpSchema = yup.object().shape({
  email: yup.string().trim().required("email is required"),
  password: yup.string().trim().required("password is required"),
});



const SignIn = () => {
  const { handleSubmit, control } = useForm({
    resolver: yupResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  
  //login functionality---------------->

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const formSubmit = (data) => {
    dispatch(loginUser(data))
      .unwrap()
      .then((res) => navigate("/blogs"))
      .catch((err) => console.log(err?.msg, "error"));
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
                  type="password"
                  placeholder="Enter Password"
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
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default SignIn;
