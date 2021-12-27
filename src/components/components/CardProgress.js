import { Card, IconButton, Box, Typography } from "@mui/material";
import LinearProgress from "./LinearProgress";
import { useNavigate } from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function CardItem(props) {
  const number = props.task.steps.filter((task) => task.completed === true);
  const progress = ((number.length / props.task.steps.length) * 100).toFixed(0);
  const navigate = useNavigate();
  ///
  return (
    <Card
      sx={{
        width: "80%",
        marginBottom: "10px",
        minHeight: "70px",
      }}
    >
      <Box component="div" sx={{ display: "flex" }}>
        <Typography
          variant="h6"
          sx={{
            fontSize: "14px",
            marginTop: "10px",
            marginLeft: " 8px",
            textTransform:'uppercase',
            flexGrow: 1,
          }}
        >
          {props.task.title}
        </Typography>
        <IconButton
          sx={{ marginLeft: "40%", marginTop: "13px", height: "10px" }}
          onClick={() => navigate(`/projects/${props.task._id}`)}
        >
          <ArrowForwardIosIcon fontSize="small" />
        </IconButton>
      </Box>
      <Box
        component="div"
        sx={{
          opacity: 0.6,
          
          marginLeft: "25%",
        }}
      >
        <Typography variant="h5" sx={{ fontSize: "16px" }}>
          {props.task.category} | {props.task.priority}
        </Typography>
      </Box>
      {!isNaN(progress) && <LinearProgress value={progress} />}
    </Card>
  );
}
