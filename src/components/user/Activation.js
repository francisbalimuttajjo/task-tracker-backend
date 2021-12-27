import {  useDispatch } from "react-redux";
import { useEffect } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import { useParams } from "react-router-dom";
import AppBar from "../nav/AppBar";
import Footer from "../components/Footer";
import { confirmAccount } from "../../redux/UserReducer";

const Activation = () => {
  const token = useParams().token;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(confirmAccount({ token }));
  }, [dispatch, token]);
  


  
  return (
    <Box>
      <AppBar />
      <Box sx={{ marginTop: 20, minHeight: "100vh" }}>
        <CircularProgress sx={{ marginLeft: "45%", marginBottom: "20px" }} />
        <Typography
          variant="h6"
          component="div"
          sx={{ color: "blue", marginLeft: "40%", marginBottom: "20px" }}
        >
          please wait ........
        </Typography>
        <Footer />
      </Box>
    </Box>
  );
};
export default Activation;
