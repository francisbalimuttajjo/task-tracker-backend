import React from "react";
import Toolbar from "@mui/material/Toolbar";
import { Typography,  Button, Avatar, Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import SearchBar from "../search/Search";
import { logOut } from "../../redux/UserReducer";
import { clearState } from "../../redux/TaskReducer";

const NavFull = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.users.isLoggedIn);
  const user = useSelector((state) => state.users.user);

  const logOutHandler = () => {
    dispatch(logOut());
    dispatch(clearState());
  };

  return (
    <>
      <Toolbar>
        <Box>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Task-Tracker
          </Typography>
        </Box>

        <Box
          sx={{
            marginLeft: "500px",
            display: "flex",
          }}
        >
          {isLoggedIn && <SearchBar width={200} />}
          {isLoggedIn && (
            <Button
              sx={{
                marginLeft: "10px",
                color: "white",
                textTransform: "capitalize",
              }}
              onClick={logOutHandler}
            >
              LogOut
            </Button>
          )}
        </Box>
        {isLoggedIn &&  (
          <Avatar
            alt={user.firstName}
            src={`http://localhost:5000/img/users/${user.photo}`}
            sx={{ marginLeft: "50px" }}
          />
        )}
      
      </Toolbar>
    </>
  );
};

export default NavFull;
