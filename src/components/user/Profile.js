import React from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import { Grid, Avatar, Typography, Container } from "@mui/material";
import LinearProgressWithLabel from "../components/LinearProgressWithLabel";
import DashBoard from "../components/DashBoard";
import Notification from "../components/Notification";
import useTheme from "../../hooks/UseTheme";

const ImageUploader = () => {
  const user = useSelector((state) => state.users.user);
  const [file, setFile] = React.useState("");
  const [photo, setPhoto] = React.useState("");
  const [successMessage, setSuccessMessage] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [progress, setProgress] = React.useState(0);

  const submitForm = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("photo", file);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/users/update",
        formData,
        {
          onUploadProgress: (ProgressEvent) => {
            let progress = Math.round(
              (ProgressEvent.loaded / ProgressEvent.total) * 100
            );
            setProgress(progress);
          },
        }
      );
      if (res.data.status === "success") {
        setError(null);
        setPhoto(res.data.data.photo);

        setSuccessMessage("upload successfull");
        window.setTimeout(() => {
          // navigate("/");
          window.location.reload();
        }, 5000);
      }
    } catch (err) {
      setError("something is wrong, please try again");
    }
  };

  return (
    <Container>
      {!error && successMessage && (
        <Notification severity="success" message={successMessage} />
      )}
      {error && !successMessage && (
        <Notification severity="error" message={error} />
      )}
      <Typography
        variant="h6"
        component="div"
        sx={{ marginTop: 10, marginBottom: 5, color: "blue" }}
      >{` Hi ${user.firstName} , upload a new  profile  picture`}</Typography>
      <div>
        <form onSubmit={submitForm}>
          <input
            style={{
              padding: 10,
              cursor: "pointer",
              borderRadius: 3,
            }}
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
          />

          <input
            type="submit"
            value="Upload picture"
            style={{
              color: "blue",
              padding: 10,
              marginLeft: 10,
              textTransform: "capitalize",
              cursor: "pointer",
              width: 120,
              borderRadius: 3,
            }}
          />
        </form>
        {progress > 0 && <LinearProgressWithLabel value={progress} />}
        {successMessage && (
          <Avatar
            sx={{
              height: 200,
              width: 200,
              margin: "auto",
            }}
            alt={user.firstName}
            src={`http://localhost:5000/img/users/${photo}`}
          />
        )}
      </div>
    </Container>
  );
};
const Profile = () => {
  const isMobile = useTheme();
  return (
    <Box sx={{ minHeight: "100vh" }}>
      <Grid container spacing={4} 
      // ml={1}
      >
        <Grid item md={3}>
          {!isMobile && <DashBoard />}
        </Grid>
        <Grid item xs={12} md={6}>
          <ImageUploader />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;
