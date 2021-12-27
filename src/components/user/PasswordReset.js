import React from "react";
import { Typography, Button } from "@mui/material";
import Container from "@mui/material/Container";
import Footer from "../components/Footer";
import { useFormik } from "formik";
import * as yup from "yup";
import { resetPassword } from "../../redux/UserReducer";
import {  useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import TextField from "../components/TextField";

const PasswordReset = () => {
   const dispatch = useDispatch();
  const paramsBody = useParams();
  
  

  const changePasswordHandler = (password, passwordConfirm) => {
    dispatch(
      resetPassword({
        password,
        passwordConfirm,
        token: paramsBody.token,
      })
    );

    
  };
  
  const validationSchema = yup.object({
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
      password: "",
      passwordConfirm: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      changePasswordHandler(values.password, values.passwordConfirm);
    },
  });

  return (
    <>
      <Container maxWidth="sm" sx={{ minHeight: "100vh" }}>
        <Typography
          variant="h4"
          sx={{
            marginLeft: "20%",
            marginTop: "10%",
            marginBottom: "5%",
            color: "blue",
          }}
          component="div"
        >
          Reset Password
        </Typography>

        
        

        <form onSubmit={formik.handleSubmit}>
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
              formik.touched.password && formik.errors.passwordConfirm
            }
          />

          <Button
            sx={{ margin: "10px" }}
            variant="contained"
            color="primary"
            fullWidth
            type="submit"
          >
            Submit
          </Button>
        </form>

        <Footer />
      </Container>
    </>
  );
};

export default PasswordReset;
