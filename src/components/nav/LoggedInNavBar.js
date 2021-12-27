import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Avatar, Box } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ArrowBack from "@mui/icons-material/ArrowBack";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { logOut } from "../../redux/UserReducer";
import { clearState } from "../../redux/TaskReducer";
import buttons from "../../utils/fns";
import SearchBar from "../search/Search";

const btns = buttons();
const Nav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.users.user);

  const [isOpen, setState] = React.useState(false);

  //logout
  const logOutHandler = () => {
 
    dispatch(logOut());
    dispatch(clearState());
  };

  const toggleDrawer = (open) => () => {
    setState(open);
  };

  function handleNavigate(url) {
    setState(false);
    navigate(url);
  }
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <IconButton
          color="inherit"
          aria-label="Open drawer"
          onClick={toggleDrawer(!isOpen)}
        >
          <MenuIcon />
        </IconButton>
      </Box>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        Task-Tracker
      </Typography>

      <Avatar
        alt={user.firstName}
        src={`http://localhost:5000/img/users/${user.photo}`}
      />
      <Drawer
        variant="temporary"
        anchor="left"
        open={isOpen}
        onClose={toggleDrawer(false)}
      >
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <SearchBar width={150} />
            </ListItemButton>
          </ListItem>
          {btns.map((btn) => {
            return (
              <ListItem disablePadding key={btn.name}>
                <ListItemButton onClick={() => handleNavigate(btn.url)}>
                  <ListItemIcon>{btn.icon}</ListItemIcon>
                  <ListItemText primary={btn.name} />
                </ListItemButton>
              </ListItem>
            );
          })}

          <ListItem disablePadding>
            <ListItemButton onClick={logOutHandler}>
              <ListItemIcon>
                <ArrowBack fontSize="medium" />
              </ListItemIcon>
              <ListItemText primary="signOut" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default Nav;
