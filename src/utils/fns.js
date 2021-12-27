import AddBoxIcon from "@mui/icons-material/AddBox";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
const btns = [
    {
      name: "Projects",
      url: "/projects",
      icon: <FolderOpenIcon fontSize="medium" color='primary' />,
    },
    {
      name: "AddProject",
      url: "/projects/add",
      icon: <AddBoxIcon fontSize="medium" color='primary'  />,
    },
    {
      name: "Settings",
      url: "/changePassword",
      icon: <SettingsIcon fontSize="medium"  color='primary' />,
    },
    {
      name: "Account",
      url: "/profile",
      icon: <AccountCircleIcon  color='primary' fontSize="medium" />,
    },
  
   
  ];

   export default function displayButtons(){
       return btns
   }