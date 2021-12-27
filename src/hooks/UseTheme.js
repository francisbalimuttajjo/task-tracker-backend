import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
const UseTheme = () => {
  const theme = useTheme();

  return useMediaQuery(theme.breakpoints.down("md"));
  //return useMediaQuery(theme.breakpoints.down('(min-width:1015px)'));
};

export default UseTheme;
