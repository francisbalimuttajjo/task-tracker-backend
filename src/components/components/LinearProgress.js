import * as React from "react";
import Typography from "@mui/material/Typography";

import Box from "@mui/material/Box";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const LinearProgressBar = ({ bgColor, progress }) => {
  const ParentDiv = {
    height: "10px",
    width: "90%",
    backgroundColor: "#f0f2f5",
    borderRadius: 40,
    margin: 10,
  };

  const childDiv = {
    height: "100%",
    width: `${progress}%`,
    backgroundColor: bgColor,
    borderRadius: 40,
    textAlign: "right",
  };
  return (
    <div style={ParentDiv}>
      <div style={childDiv}></div>
    </div>
  );
};

export default function ProgressBar(props) {
  return (
    <Box sx={{ display: "flex", marginTop: "30px" }}>
      <Box
        sx={{
          flexGrow: 1,
          marginRight: "10px",
          marginTop: "-10px",
        }}
      >
        <LinearProgressBar
          progress={props.value}
          bgColor={props.value < 50 ? "red" : "#1a90ff"}
        />
      </Box>
      <Box sx={{ minWidth: 35, marginLeft: "10px" }}>
        {props.value >= 100 ? (
          <CheckCircleIcon
            fontSize="small"
            color="success"
            sx={{ marginTop: "-10px" }}
          />
        ) : (
          <Typography
            variant="body2"
            sx={{ marginTop: "-7px" }}
            color={props.value < 50 ? "red" : "#1a90ff"}
          >{`${Math.round(props.value)}%`}</Typography>
        )}
      </Box>
    </Box>
  );
}
