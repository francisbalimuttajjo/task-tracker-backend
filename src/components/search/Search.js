import * as React from "react";
import {TextField} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SearchInput = (props) => {
  const navigate = useNavigate();
  const tasks = useSelector((state) => state.tasks.tasks);


  return (
    <>
      {tasks.length > 1 && (
        <Autocomplete
          sx={{ width: props.width }}
          id="projects"
         
          freeSolo
          getOptionLabel={(option) => option.title}
          options={tasks.map((option) => option)}
          groupBy={(option) => option.priority}
          onChange={(event, option) => {
            navigate(`/projects/${option._id}`);
          }}
          renderInput={(params) => (
            <TextField sx={{backgroundColor:'white',height:'50px'}}{...params} label="Search projects.." />
          )}
        />
      )}
    </>
  );
};
export default SearchInput;
