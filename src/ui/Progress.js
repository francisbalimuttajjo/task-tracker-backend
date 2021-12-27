import React from "react";
import { useSelector } from "react-redux";
import {
  Box,
  Typography,
  Pagination,
  Divider,
  Stack,
} from "@mui/material";
import usePagination from "../hooks/UsePagination";
import CardProgress from "../components/components/CardProgress";

const Progress = () => {
  const tasks = useSelector((state) => state.tasks.tasks);
  const [currentProjects, noOfPages, page, handleChange] = usePagination(
    6,
    tasks
  );

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
        Progress
      </Typography>
      {currentProjects.map((task) => (
        <CardProgress task={task} key={task._id} />
      ))}

      {tasks.length > 6 && (
        <Stack spacing={2 } mt={8}>
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
export default Progress;
