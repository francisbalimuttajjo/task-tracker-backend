import React from "react";
import { Typography, Button } from "@mui/material";
import Container from "@mui/material/Container";
import Footer from "../components/Footer";
import { useFormik } from "formik";
import * as yup from "yup";
import { register } from "../../redux/UserReducer";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import TextField from "../components/TextField";

const Register = () => {
 

  const dispatch = useDispatch();

  
  

 

  const registerHandler = (
    firstName,
    lastName,
    email,
    password,
    passwordConfirm
  ) => {
    dispatch(
      register({
        firstName,
        lastName,
        email,
        password,
        passwordConfirm,
      })
    );

   
  };
  //
  const validationSchema = yup.object({
    firstName: yup
      .string("Enter firstName")
      .trim()
      .required("firstName is required"),
    lastName: yup
      .string("Enter your lastName")
      .trim()
      .required("lastName is required"),
    email: yup
      .string("Enter your email")
      .email("Enter a valid email")
      .trim()
      .required("Email is required"),
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
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      passwordConfirm: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      registerHandler(
        values.firstName,
        values.lastName,
        values.email,
        values.password,
        values.passwordConfirm
      );
    },
  });

  return (
    <>
      <Container maxWidth="sm" sx={{  minHeight: "100vh" }}>
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
          Register
        </Typography>

       
        
        <form onSubmit={formik.handleSubmit}>
          <TextField
            name="firstName"
            onChange={formik.handleChange}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            value={formik.values.firstName}
            helperText={formik.touched.firstName && formik.errors.firstName}
          />
          <TextField
            name="lastName"
            onChange={formik.handleChange}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            value={formik.values.lastName}
            helperText={formik.touched.lastName && formik.errors.lastName}
          />
          <TextField
            name="email"
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            value={formik.values.email}
            helperText={formik.touched.email && formik.errors.email}
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
            register
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
          have an account?
          <Link to="/"> Login</Link>
        </Typography>
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
          <Link to="/forgotPassword"> forgot your password? </Link>{" "}
        </Typography>
        <Footer />
      </Container>
    </>
  );
};

export default Register;
