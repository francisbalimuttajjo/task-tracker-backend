import useTheme from "../hooks/UseTheme";
import DashBoard from "../components/components/DashBoard";
import Footer from "../components/components/Footer";
import NewTask from "../components/components/AddTask";
import { Box, Grid } from "@mui/material";

const AddTask = () => {
  const isMobile = useTheme();
  return (
    <Box>
      <Grid container spacing={3}
   
       >
        <Grid item md={2}>
          {!isMobile && <DashBoard />}
        </Grid>
        <Grid item xs={12} md={4}>
          <NewTask />
        </Grid>
      </Grid>
      <Footer />
    </Box>
  );
};

export default AddTask;
