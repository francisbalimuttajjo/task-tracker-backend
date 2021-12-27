import {

  Container,
  Divider,
  List,

  ListItem,
  ListItemText,
} from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
const Step = ({ task, handleChange, deleteStep,changed }) => {
  return (
    <Container>
     
      <List component="ul">
        {task.steps.map((step, index) => (
          <div key={index}>
            <ListItem>
              <input
                type="checkbox"
                onChange={() => handleChange(task._id, index)}
                checked={step.completed}
              />
              <ListItemText primary={step.step} />
              
              <ListItemButton>
                <ListItemIcon>
                 { changed && <EditIcon color="primary" fontSize="medium" />}
                </ListItemIcon>
              </ListItemButton>
              <ListItemButton onClick={() => deleteStep(task._id, index)}>
                <ListItemIcon>
                  <DeleteIcon fontSize="small" sx={{ color: "grey" }} />
                </ListItemIcon>
              </ListItemButton>
            </ListItem>

            <Divider />
          </div>
        ))}
      </List>

      
    </Container>
  );
};
export default Step;
