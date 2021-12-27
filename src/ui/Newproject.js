import React from "react";
import usePagination from "../hooks/UsePagination";
import CardItem from "../components/components/CardItem";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, Typography, Pagination, Divider, Stack } from "@mui/material";

const Newproject = () => {
  //navigation
  const navigate = useNavigate();
  //accessing state
  const tasks = useSelector((state) => state.tasks.tasks);

  const number = tasks
    .map((task) => task.steps.every((e) => !e.completed))
    .filter((e) => e === true);
 
//pagination
  const [display, noOfPages, page, handleChange] = usePagination(4, tasks);

  return (
    <div>
      {!tasks.length || tasks === undefined ? (
        <Typography variant="h6" component="div" sx={{ margin: "10px" }}>
          No Projects Currently
        </Typography>
      ) : (
        <>
          <Typography
            variant="h6"
            sx={{
              marginLeft: "10px",
              marginTop: "10px",
              marginBottom: "2px",
              opacity: 0.7,
            }}
            component="div"
          >
            Projects
            <Typography component="span" sx={{ opacity: 0.5 }}>
              {number.length === 0 ? "" : `   +(${number.length}) new `}
            </Typography>
          </Typography>

          {display.map((task) => (
            <CardItem task={task} key={task._id} />
          ))}
          {tasks.length > 4 && (
            <Stack spacing={2}>
              <Divider />
              <Pagination
                count={noOfPages}
                page={page}
                onChange={handleChange}
                defaultPage={3}
                color="primary"
                size="small"
                showFirstButton
                showLastButton
              />
            </Stack>
          )}
        </>
      )}

      <Button
        variant="contained"
        sx={{ width: "80%", marginLeft: 1, marginTop: 2 }}
        onClick={() => navigate("/projects/add")}
      >
        + New Project
      </Button>
    </div>
  );
};
export default Newproject;
