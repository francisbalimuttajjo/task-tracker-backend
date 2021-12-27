import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Typography, Button, Container } from "@mui/material";
import Footer from "../components/Footer";
import { forgotPassword } from "../../redux/UserReducer";
import TextField from "../components/TextField";

const Login = () => {
  const dispatch = useDispatch();

  
  const forgotPassswordHandler = (email) => {
    dispatch(
      forgotPassword({
        email,
      })
    );
   
  };

  const validationSchema = yup.object({
    email: yup
      .string("Enter your email")
      .email("Enter a valid email")
      .required("Email is required"),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      forgotPassswordHandler(values.email);
    },
  });

  return (
    <>
      <Container maxWidth="sm" sx={{ marginBottom: "10%", minHeight: "700px" }}>
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
         Forgot Password 
        </Typography>
       
        <form onSubmit={formik.handleSubmit}>
          <TextField
            name="email"
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            value={formik.values.email}
            helperText={formik.touched.email && formik.errors.email}
          />

          <Button
            sx={{ margin: "10px" }}
            variant="contained"
            color="primary"
            fullWidth
            type="submit"
          >
            submit
          </Button>
        </form>

        <Typography
          variant="h6"
          sx={{
            marginLeft: "20%",
            marginTop: "2%",
            marginBottom: "5%",
            color: "blue",
            fontSize: 12,
          }}
          component="div"
        >
          {" "}
          <Link to="/"> Log into your Account</Link>{" "}
        </Typography>
        <Footer />
      </Container>
    </>
  );
};
export default Login;
