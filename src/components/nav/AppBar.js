import React from "react";
import AppBarBase from "@mui/material/AppBar";
import { Outlet } from "react-router-dom";
import { Typography, Box, Toolbar,Skeleton} from "@mui/material";
import Nav from "./LoggedInNavBar";
import NavFull from "./NavFull";
import Notification from "../components/Notification";
import useTheme from "../../hooks/UseTheme";
import { clearMessage } from "../../redux/TaskReducer";
import { clearMessageUser } from "../../redux/UserReducer";
import { useSelector, useDispatch } from "react-redux";

const NavItem = () => {
  return (
    <Box>
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ fontSize: 13, flexGlow: 1 }}
        >
          Task-Tracker
        </Typography>
      </Toolbar>
    </Box>
  );
};

export default function AppBar() {
  const isMobile = useTheme();
  const dispatch = useDispatch();
  const { isLoggedIn, loading } = useSelector((state) => state.users);
  const loadingTasks = useSelector((state) => state.tasks.loading);
  const errorUser = useSelector((state) => state.users.error);
  const messageUser = useSelector((state) => state.users.message);
  const { message, error } = useSelector((state) => state.tasks);
  // console.log("mesage app", message);
  // console.log("mesage err", error);
  // console.log("user err", errorUser);
  // console.log("mesage user", messageUser);
  // console.log(loading);

  React.useEffect(() => {
    if (message) {
      setTimeout(() => dispatch(clearMessage()), 3000);
    }
  }, [dispatch, message]);

  React.useEffect(() => {
    if (error) {
      setTimeout(() => dispatch(clearMessage()), 3000);
    }
  }, [dispatch, error]);

  React.useEffect(() => {
    if (messageUser) {
      setTimeout(() => dispatch(clearMessageUser()), 3000);
    }
  }, [dispatch, messageUser]);

  React.useEffect(() => {
    if (errorUser) {
      setTimeout(() => dispatch(clearMessageUser()), 3000);
    }
  }, [dispatch, errorUser]);

  return (
    <React.Fragment>
      <AppBarBase
        position="sticky"
        sx={{
          width: "100%",
        }}
      >
        <Toolbar>
          {isMobile && isLoggedIn && <Nav />}
          {isMobile && !isLoggedIn && <NavItem />}
          {!isMobile && !isLoggedIn && <NavFull />}
          {!isMobile && isLoggedIn && <NavFull />}
        </Toolbar>
        {message && <Notification width='40%' severity="success" message={message} />}
        {messageUser && (
          <Notification severity="success" width='40%' message={messageUser} />
        )}
        {error && <Notification severity="error" width='40%' message={error} />}
        {errorUser && <Notification severity="error" width='40%' message={errorUser} />}
      </AppBarBase>
           
        {
        (loadingTasks || loading) && 
          <Box 
           sx={{ width: '80%', marginLeft:'10%' }}
          >
             <Skeleton animation="wave" />
             <Skeleton animation="wave" />
             <Skeleton animation="wave" />
          </Box>     
        }
              {!loadingTasks && !loading && <Outlet />}
    </React.Fragment>
  );
}
