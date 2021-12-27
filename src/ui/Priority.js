import { useSelector } from "react-redux";
import usePagination from "../hooks/UsePagination";
import CardItem from "../components/components/CardItem";
import {  Typography,Box, Pagination, Divider, Stack } from "@mui/material";

const Priority = () => {
  const tasks = useSelector((state) => state.tasks.tasks);
  
  const priorityTasks = tasks.filter((task) => task.priority === "high");

  const [display, noOfPages, page, handleChange] = usePagination(4, priorityTasks);

  return (
    <Box component="div">
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
        Priority Projects
        <Typography component="span" sx={{ opacity: 0.5 }}>
          {` (${priorityTasks.length})`}
        </Typography>
      </Typography>

      {display.map((task) => (
        <CardItem task={task} key={task._id} />
      ))}
      {priorityTasks.length > 4 && (
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
    </Box>
  );
};
export default Priority;
