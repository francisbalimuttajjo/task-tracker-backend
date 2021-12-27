import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Typography, Button, Box, Grid } from "@mui/material";
import { useDispatch } from "react-redux";
import TextField from "../components/TextField";
import Footer from "../components/Footer";

import { updatePassword } from "../../redux/UserReducer";
import DashBoard from "../components/DashBoard";
import useTheme from "../../hooks/UseTheme";

const ChangePassword = () => {
  const dispatch = useDispatch();
  const isMobile = useTheme();

  const changePasswordHandler = (
    currentPassword,
    password,
    passwordConfirm
  ) => {
    dispatch(
      updatePassword({
        currentPassword,
        password,
        passwordConfirm,
      })
    );
  };
  //
  const validationSchema = yup.object({
    currentPassword: yup
      .string("Enter your password")
      .min(6, "Password should be of minimum 6 characters length")
      .trim()
      .required("current password is required"),

    password: yup
      .string("Enter your password")
      .min(6, "Password should be of minimum 6 characters length")
      .trim()
      .required("Password is required"),

    passwordConfirm: yup
      .string()
      .trim()
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  });
  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      password: "",
      passwordConfirm: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      changePasswordHandler(
        values.currentPassword,
        values.password,
        values.passwordConfirm
      );
    },
  });

  return (
    <Grid container spacing={4} sx={{ minHeight: "100vh" }}>
      <Grid item md={3}>
        {!isMobile && <DashBoard />}
      </Grid>
      <Grid item md={4}>
        <Box>
          <Typography
            variant="h6"
            sx={{
              marginLeft: "20%",
              marginTop: "10%",
              marginBottom: "5%",
              color: "blue",
            }}
            component="div"
          >
            Change Password
          </Typography>

          <form onSubmit={formik.handleSubmit}>
            <TextField
              name="currentPassword"
              onChange={formik.handleChange}
              error={
                formik.touched.currentPassword &&
                Boolean(formik.errors.currentPassword)
              }
              value={formik.values.currentPassword}
              type="password"
              helperText={
                formik.touched.currentPassword && formik.errors.currentPassword
              }
            />

            <TextField
              name="password"
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              value={formik.values.password}
              type="password"
              helperText={formik.touched.password && formik.errors.password}
            />
            <TextField
              name="passwordConfirm"
              onChange={formik.handleChange}
              error={
                formik.touched.passwordConfirm &&
                Boolean(formik.errors.passwordConfirm)
              }
              value={formik.values.passwordConfirm}
              type="password"
              helperText={
                formik.touched.passwordConfirm && formik.errors.passwordConfirm
              }
            />

            <Button
              sx={{ margin: isMobile ? 0 : "10px", marginLeft: isMobile ? 0 : "10px" }}
              variant="contained"
              color="primary"
              fullWidth
              type="submit"
            >
              change password
            </Button>
          </form>

          <Footer />
        </Box>
      </Grid>
    </Grid>
  );
};

export default ChangePassword;
