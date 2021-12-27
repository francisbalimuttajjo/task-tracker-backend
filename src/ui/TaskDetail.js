import React from "react";
import Step from "../components/components/Step";
import { IconButton, Card, Box, Grid, Typography, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SaveIcon from "@mui/icons-material/Save";
import Comment from "../components/components/Comment";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ProgressBar from "../components/components/LinearProgress";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { handleClick, removeStep, removeComment } from "../redux/TaskReducer";
import Footer from "../components/components/Footer";
import DashBoard from "../components/components/DashBoard";
import AppBar from "../components/nav/AppBar";

import useTheme from "../hooks/UseTheme";
import { deleteTask, updateTask } from "../redux/TaskReducer";

const Task = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isMobile = useTheme();
  const id = useParams().id;
  const [changed, setChange] = React.useState(false);
  const tasks = useSelector((state) => state.tasks.tasks);
  const task = tasks.find((task) => task._id === id);

  if (!task)
    return (
      <Box component='div' sx={{margin:'30%'}}>
        <Typography variant="h6" component="div" sx={{color:'red'}}>
          Project not found
        </Typography>
        <Button variant='outlined' onClick={()=>navigate('/projects')}>Back</Button>
        <IconButton onClick={() => navigate(`/projects`)}>
          <ArrowBackIcon
            // sx={{ flexGrow: 1 }}
            color="primary"
            fontSize="large"
          />
        </IconButton>
      </Box>
    );

  const number = task.steps.filter((task) => task.completed === true);
  const value = ((number.length / task.steps.length) * 100).toFixed(0);

  const deleteStep = (id, index) => {
    dispatch(
      removeStep({
        id,
        index,
      })
    );
    setChange(true);
  };

  const updateTaskHandler = (id) => {
    const updatedTask = tasks.filter((task) => task._id === id);

    dispatch(
      updateTask({
        id,
        comments: updatedTask[0].comments,
        steps: updatedTask[0].steps,
      })
    );
  };
  const deleteComment = (id, index) => {
    dispatch(
      removeComment({
        id,
        index,
      })
    );
    setChange(true);
  };

  const handleChange = (id, index) => {
    dispatch(
      handleClick({
        id,
        index,
      })
    );
    setChange(true);
  };

  //deleting project from list
  const deleteProject = (e) => {
    if (window.confirm("Do you really want to delete this project ?")) {
      dispatch(deleteTask(e));
      navigate("/projects");
    } else {
      return;
    }
  };

  return (
    <Card sx={{ marginTop: !isMobile ? "50px" : "0px" }}>
      <Box>
        {" "}
        <IconButton onClick={() => navigate(`/projects`)}>
          <ArrowBackIcon
            sx={{ flexGrow: 1 }}
            color="primary"
            fontSize="medium"
          />
        </IconButton>
        <Button
          sx={{ marginLeft: "210px", marginTop: "5px" }}
          size="small"
          onClick={() => setChange(!changed)}
         
          startIcon={<EditIcon />}
        >
          edit
        </Button>
      </Box>
      <Typography
        variant="h5"
        sx={{ marginLeft: "30%", color: "blue", textTransform:'uppercase' }}
        component="div"
      >
        {task.title}
      </Typography>
      <Typography
        variant="body2"
        sx={{ marginLeft: "35%", color: "red" }}
        component="div"
      >
        {task.category}
      </Typography>

      <Typography variant="body1" sx={{ marginLeft: "10%" }} component="div">
        {task.description}
      </Typography>

      <Step
        task={task}
        handleChange={handleChange}
        deleteStep={deleteStep}
        changed={changed}
      />

      <Comment deleteComment={deleteComment} task={task} />
      {!isNaN(value) && <ProgressBar value={value} />}

      {!changed && (
        <Button
          variant="outlined"
          size="small"
          sx={{ margin: "10px" }}
          startIcon={<DeleteForeverIcon sx={{ color: "red" }} />}
          onClick={() => deleteProject(task._id)}
        >
          Delete Task
        </Button>
      )}
      {changed && (
        <Button
          variant="outlined"
          size="small"
          sx={{ marginLeft: "100px", marginBottom: "10px" }}
          startIcon={<SaveIcon sx={{ color: "green" }} />}
          onClick={() => updateTaskHandler(task._id)}
        >
          save changes
        </Button>
      )}
    </Card>
  );
};

const TaskDetail = () => {
  const isMobile = useTheme();

  return (
    <Box>
      <AppBar />

      <Grid container spacing={2}>
        <Grid item md={2}>
          {!isMobile && <DashBoard />}
        </Grid>
        <Grid item xs={12} md={4} ml={ isMobile ? 0 : 4}>
          <Task />
        </Grid>
       
      </Grid>
      <Footer />
    </Box>
  );
};

export default TaskDetail;
