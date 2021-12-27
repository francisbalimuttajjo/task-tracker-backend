import useInput from "../../hooks/Step";
import useComment from "../../hooks/Comment";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import Notification from "./Notification";
import { addTask } from "../../redux/TaskReducer";
import AddCircle from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import {
  IconButton,
  Box,
  Button,
  TextField,
  Container,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";

const NewTask = () => {
  const dispatch = useDispatch();
  
  

  //selecting inputs
  const titleRef = useRef();
  const selectRef = useRef();
  const categoryRef = useRef();
  const descriptionRef = useRef();

  //setting notifications
  const [priority, setPriority] = useState("");
  const [notification, setNotification] = useState(null);

  //managing steps and comments inputs
  const [steps, handleChange, addInput, handleRemove] = useInput();
  const [comments, manageChange, manageInput, manageRemove] = useComment();

  const addNewTask = () => {
    //checking if no input is  empty for steps and comments
    function check(steps) {
      return steps.every((step) => step.step !== "");
    }
    function checkComment(comments) {
      return comments.every((comment) => comment.comment !== "");
    }

    if (
      !titleRef.current.value ||
      !categoryRef.current.value ||
      !descriptionRef.current.value ||
      !check(steps) ||
      !checkComment(comments) ||
      !selectRef.current.value
    ) {
      setNotification("please,fill all fields");
      setTimeout(() => setNotification(null), 4000);
      return;
    }
    dispatch(
      addTask({
        title: titleRef.current.value,
        category: categoryRef.current.value,
        description: descriptionRef.current.value,
        comments,
        steps,
        priority: selectRef.current.value,
      })
    );
   
  };

  return (
    <Container maxWidth="sx">
      {notification && <Notification  severity="error" message={notification} />}

      <Typography
        variant="h6"
        component="div"
        sx={{
          marginLeft: "20%",
          marginTop: "5%",
          marginBottom: "5%",
          color: "blue",
        }}
      >
        Add Project
      </Typography>
      <TextField
        size="small"
        sx={{ width: "100%", margin: "10px" }}
        label="title"
        inputRef={titleRef}
        required
        variant="standard"
        type="text"
        placeholder="enter title"
      />
      <TextField
        size="small"
        sx={{ width: "100%", margin: "10px" }}
        label="category"
        required
        inputRef={categoryRef}
        variant="standard"
        type="text"
        placeholder="enter category"
      />

      <Select
        variant="standard"
        sx={{ m: 1, minWidth: "100%" }}
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        label="priority"
        displayEmpty
        inputRef={selectRef}
      >
        <MenuItem value="">
          <em style={{ color: "red" }}>Choose Priority</em>
        </MenuItem>
        <MenuItem value={"high"}>High</MenuItem>
        <MenuItem value={"medium"}>Medium</MenuItem>
        <MenuItem value={"low"}>Low</MenuItem>
      </Select>

      <TextField
        size="small"
        required
        sx={{ width: "100%", margin: "10px" }}
        label="description"
        inputRef={descriptionRef}
        variant="standard"
        type="text"
        placeholder="enter description"
      />
      {steps.map((x, i) => {
        return (
          <Box component="div" sx={{ display: "flex" }} key={i}>
            <TextField
              size="small"
              sx={{ width: "90%", margin: "5px" }}
              type="text"
              label="step"
              required
              variant="standard"
              placeholder="enter step"
              onChange={(e) => handleChange(e, i)}
            />
            {steps.length !== 1 && (
              <IconButton onClick={() => handleRemove(i)}>
                <RemoveCircleIcon color="error" />
              </IconButton>
            )}
            {steps.length - 1 === i && (
              <IconButton onClick={addInput}>
                {" "}
                <AddCircle color="primary" />
              </IconButton>
            )}
          </Box>
        );
      })}
      {comments.map((x, i) => {
        return (
          <Box component="div" sx={{ display: "flex" }} key={i}>
            <TextField
              size="small"
              sx={{ width: "90%", margin: "5px" }}
              type="text"
              label="comment"
              required
              variant="standard"
              placeholder="enter comment"
              onChange={(e) => manageChange(e, i)}
            />
            {comments.length !== 1 && (
              <IconButton onClick={() => manageRemove(i)}>
                <RemoveCircleIcon color="error" />
              </IconButton>
            )}
            {comments.length - 1 === i && (
              <IconButton sx={{ display: "inline" }} onClick={manageInput}>
                {" "}
                <AddCircle color="primary" />
              </IconButton>
            )}
          </Box>
        );
      })}
      <div>
        <Button
          sx={{ margin: "10px" }}
          variant="contained"
          color="primary"
          fullWidth
          onClick={addNewTask}
        >
          add Project{" "}
        </Button>
      </div>
    </Container>
  );
};

export default NewTask;
