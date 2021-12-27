import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import AppBar from "../nav/AppBar";
import Footer from "./Footer";
import "../../css/NotFound.css";
const NotFound = () => {
  const navigate = useNavigate();
  return (
    <>
      <AppBar />
      <div class="face">
        <div className="band">
          <div className="red"></div>
          <div className="white"></div>
          <div className="blue"></div>
        </div>
        <div className="eyes"></div>
        <div className="dimples"></div>
        <div className="mouth"></div>
      </div>
      <Button
        sx={{ marginLeft: "43%",marginTop:'10px' }}
        onClick={() => navigate("/")}
        variant="contained"
      >
        {" "}
        Return Home
      </Button>
      <h1>Oops! Page is not Here!</h1>

      <Footer />
    </>
  );
};
export default NotFound;
