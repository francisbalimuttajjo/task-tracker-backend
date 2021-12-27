import React from "react";
import { ToggleButton, Divider } from "@mui/material";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
////////////////////////////////////////////
export default function Pagination({
  itemsPerPage,
  totalItems,
  paginate,
  prev,
  next,
}) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const [alignment, setAlignment] = React.useState(1);

  const handleChange = (event, newAlignment,newAmount) => {
    setAlignment(newAlignment);
   
    // paginate();
  };

  return (
    <>
      <Divider />

      <ToggleButtonGroup
        color="secondary"
        size="medium"
        value={alignment}
        exclusive
        onChange={handleChange}
      >
        <ToggleButton
          sx={{
            color: "white",
            borderRadius: "20%",
            backgroundColor: "blue",
            margin: 1,
            height: "4px",
          }}
          value="prev"
          onClick={prev}
        >
          <ArrowBackIcon fontSize="small" />
        </ToggleButton>
        {pageNumbers.map((number) => (
          <ToggleButton
            sx={{
              color: "white",
              borderRadius: "50%",
              backgroundColor: "blue",
              margin: 1,
              height: "4px",
            }}
            value={number}
            key={number}
            onClick={() => paginate(number)}
          >
            {number}
          </ToggleButton>
        ))}
        <ToggleButton
          sx={{
            color: "white",
            borderRadius: "50%",
            backgroundColor: "blue",
            margin: 1,
            height: "4px",
          }}
          value="next"
          onClick={next}
        >
          
          <ArrowForwardIcon fontSize="small" />
        </ToggleButton>
      </ToggleButtonGroup>
    </>
  );
}
