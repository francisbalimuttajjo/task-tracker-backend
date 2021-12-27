import { Card, IconButton, Typography, Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CommentBankIcon from "@mui/icons-material/CommentBank";
import { useNavigate } from "react-router-dom";
import { deleteTask } from "../../redux/TaskReducer";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useDispatch } from "react-redux";

export default function CardItem({ task }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deleteTaskHandler = (id) => {
    dispatch(deleteTask(id));
  };

  function handleDelete(id) {
    if (window.confirm("Do you really want to delete this project?")) {
      deleteTaskHandler(id);
    } else {
      return;
    }
  }
  return (
    <Card
      sx={{
        width: "80%",
        marginBottom: 2,
        padding: 3,
        height: "120px",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontSize: "18px",
          marginTop: "2px",
          marginLeft: "28%",
          textTransform:'uppercase',
          color: "red",
        }}
      >
        {task.title}
      </Typography>
      <Box
        component="div"
        sx={{
          opacity: 0.6,
          marginLeft: "30%",
        }}
      >
        <Typography variant="h6" sx={{ fontSize: 14 }}>
          {task.category} | {task.priority}
        </Typography>
      </Box>
      <Box>
        <Typography
          variant="h6"
          sx={{
            fontSize: 14,
          }}
        >
          {task.description}
        </Typography>
      </Box>
      <Box
        component="div"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: " space-around",
          margin: "10px",
        }}
      >
        <Box
          component="div"
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <CommentBankIcon
            sx={{ marginLeft: "0px" }}
            size="small"
            color="primary"
          />
          <Typography variant="h6" sx={{ fontSize: 10 }}>
            ({task.comments.length})
          </Typography>

          <IconButton
            sx={{ margin: "10px" }}
            aria-label="delete"
            onClick={() => handleDelete(task._id)}
          >
            <DeleteIcon fontSize="small" sx={{ color: "grey" }} />
          </IconButton>
          <IconButton onClick={() => navigate(`/projects/${task._id}`)}>
            <ArrowForwardIosIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>
    </Card>
  );
}
