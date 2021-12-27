import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Typography, Button,Container} from "@mui/material";
import Footer from "../components/Footer";
import { LoginUser } from "../../redux/UserReducer";
import TextField from "../components/TextField";

const Login = () => {
  const dispatch = useDispatch();

  
   const loginHandler = (email, password) => {
    dispatch(
      LoginUser({
        email,
        password,
      })
    );
  };

  const validationSchema = yup.object({
    email: yup
      .string("Enter your email")
      .email("Enter a valid email")
      .required("Email is required"),
    password: yup
      .string("Enter your password")
      .min(6, "Password should be of minimum 6 characters length")
      .trim()
      .required("Password is required"),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      loginHandler(values.email, values.password);
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
          Login 
        </Typography>
       
        <form onSubmit={formik.handleSubmit}>
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
          <Button
            sx={{ margin: "10px" }}
            variant="contained"
            color="primary"
            fullWidth
            type="submit"
          >
            login
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
          Don't have an account? <Link to="/register"> Register</Link>{" "}
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
export default Login;
