import {
  ListItem,
  ListItemText,
  Divider,
  Typography,
  Container,
} from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import DeleteIcon from "@mui/icons-material/Delete";
const Comment = ({ task, deleteComment }) => {
  if (!task.comments.length) {
    return (
      <Typography
        variant="body2"
        sx={{ marginLeft: "10px", color: "red" }}
        component="div"
      >
        no comment{" "}
      </Typography>
    );
  }

  return (
    <Container>
      <Typography variant="body2" sx={{ color: "red" }} component="div">
     
        Comments:
      </Typography>

      {task.comments.map((comment, index) => (
        <div key={index}>
          <ListItem>
            <ListItemText primary={comment.comment} />
            <ListItemButton onClick={() => deleteComment(task._id, index)}>
              <ListItemIcon>
                <DeleteIcon fontSize="small" sx={{ color: "grey" }} />
              </ListItemIcon>
            </ListItemButton>
           
          </ListItem>
          <Divider />
        </div>

        
      ))}
    </Container>
  );
};
export default Comment;
