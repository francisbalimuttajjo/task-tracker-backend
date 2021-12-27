
import { Typography, Box } from "@mui/material";
const Footer = () => {
  return (
    <Box sx={{margin:'10px'}} >
      <Typography variant="body1" sx={{ marginLeft: "40%", color: "red" }}>
        &copy; {new Date().getFullYear()} Task-Tracker  
      </Typography>
    </Box>
  );
};

export default Footer;
