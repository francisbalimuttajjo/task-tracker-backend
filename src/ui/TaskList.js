import React from "react";
import Box from "@mui/material/Box";
import { Grid, Typography } from "@mui/material";
import NewProject from "./Newproject";
import Progress from "./Progress";
import Footer from "../components/components/Footer";
import DashBoard from "../components/components/DashBoard";
import Priority from "./Priority";
import useTheme from "../hooks/UseTheme";
import { useSelector } from "react-redux";

export default function TaskList() {
  const tasks = useSelector((state) => state.tasks.tasks);
 

  const isMobile = useTheme();
  return (
    <Box>
      {tasks.length < 1 && (
        <Grid container spacing={2} ml={1}>
          <Grid item md={2}>
            {!isMobile && <DashBoard />}
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography
              variant="h6"
              sx={{ margin: "20px", color: "red" }}
              component="div"
            >
              You have no Projects Currently
            </Typography>
          </Grid>
        </Grid>
      )}
      {tasks.length >= 1 && (
        <Grid container spacing={1} ml={1}>
          <Grid item md={2}>
            {!isMobile && <DashBoard />}
          </Grid>
          <Grid item xs={12} md={3}>
            <NewProject />
          </Grid>
          <Grid item xs={12} md={3}>
            <Priority />
          </Grid>
          <Grid item xs={12} md={3}>
            <Progress />
          </Grid>
        </Grid>
      )}

      <Footer />
    </Box>
  );
}
