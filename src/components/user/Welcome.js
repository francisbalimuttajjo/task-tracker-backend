import Footer from "../components/Footer";
import { Typography, Container, Box } from "@mui/material";

const Welcome = () => {
  return (
    <Container sx={{ margin: "auto", minHeight: "100vh" }}>
      <Box
        sx={{
          width: 400,
          height: 200,
          marginTop: "100px",
          marginLeft: "18%",
        }}
      >
        <Typography variant="h4" component="div">
          welcome to task-Tracker
        </Typography>
        <Typography variant="body2" component="div" sx={{ marginLeft: "40px" }}>
          An activation link has been sent to your email
        </Typography>

        <Footer />
      </Box>
    </Container>
  );
};

export default Welcome;
