import { Box } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ArrowBack from "@mui/icons-material/ArrowBack";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import { useDispatch } from "react-redux";
import { logOut } from "../../redux/UserReducer";
import { clearState } from "../../redux/TaskReducer";
import { useNavigate } from "react-router-dom";
import btns from "../../utils/fns";

const DashBoard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const buttons = btns();
  const logOutHandler = () => {
    dispatch(logOut());
    //clear recent state from browser
    dispatch(clearState())
  };
  return (
    <Box
      sx={{
        backgroundColor: "#f0f2f5",
        marginTop: "60px",
        minHeight:'100vh'
      }}
    >
      <List>
        {buttons.map((btn) => {
          return (
            <ListItem disablePadding key={btn.name}>
              <ListItemButton
                sx={{ width: 100 }}
                onClick={() => navigate(btn.url)}
              >
                <ListItemIcon>{btn.icon}</ListItemIcon>
                <ListItemText sx={{fontSize:12}} primary={btn.name} />
              </ListItemButton>
            </ListItem>
          );
        })}
        <ListItem disablePadding>
          <ListItemButton onClick={logOutHandler}>
            <ListItemIcon>
              <ArrowBack  color='error' fontSize="medium" />
            </ListItemIcon>
            <ListItemText  primary="signOut" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
};
export default DashBoard;
