import { useEffect } from "react";
import { Box } from "@mui/material";
import { Navigate, Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import AddTask from "./ui/AddTask";
import TaskDetail from "./ui/TaskDetail";
import Login from "./components/user/Login";
import AppBar from "./components/nav/AppBar";
import { checkLoggin } from "./redux/UserReducer";
import { getTasks } from "./redux/TaskReducer";
import TaskList from "./ui/TaskList";
import Profile from "./components/user/Profile";
import NotFound from "./components/components/NotFound";
import ForgotPassword from "./components/user/ForgotPassword";
import Welcome from "./components/user/Welcome";
import Activation from "./components/user/Activation";
import ChangePassword from "./components/user/ChangePassword";
import PasswordReset from "./components/user/PasswordReset";
import RegisterForm from "./components/user/RegisterForm";

export default function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.users.isLoggedIn);
  const loading = useSelector((state) => state.users.loading);
  const isRegistered = useSelector((state) => state.users.isRegistered);
  
  

  //getting state initially/ maintaining login state
  useEffect(() => {
    
    dispatch(checkLoggin());
  },[dispatch]);
  //putting tasks in state
  useEffect(() => {
    dispatch(getTasks());
  });

  return (
    <Box
      sx={{
        backgroundColor: " #f0f2f5",
       
        marginLeft:'0px'
      }}
    >
      <Routes>
        <Route path="/" element={<AppBar />}>
          <Route
            path=""
            element={
              <>
                {!isLoggedIn && !loading && <Login />}
                {isLoggedIn && <Navigate to="/projects" />}
              </>
            }
          />
          <Route
            path="/register"
            element={
              <>
                {!isRegistered && <RegisterForm />}
                {isRegistered && <Welcome />}
                {isLoggedIn && <Navigate to="/projects" />}
              </>
            }
          />
          <Route
            path="/projects/add"
            element={
              <>
                {!isLoggedIn && <Login />}
                {isLoggedIn && <AddTask />}{" "}
              </>
            }
          />
          <Route
            path="/forgotPassword"
            element={
              <>
                {!isLoggedIn && <ForgotPassword />}
                {isLoggedIn && <Navigate to="/projects" />}
              </>
            }
          />
          <Route
            path="api/v1/users/passwordReset/:token"
            element={
              <>
                {!isLoggedIn && <PasswordReset />}
                {isLoggedIn && <Navigate to="/projects" />}{" "}
              </>
            }
          />
          <Route
            path="/projects"
            element={
              <>
                {!isLoggedIn && <Login />}
                {isLoggedIn && <TaskList />}{" "}
              </>
            }
          />
          <Route
            path="/changePassword"
            element={
              <>
                {!isLoggedIn && <Login />}
                {isLoggedIn && <ChangePassword />}{" "}
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                {!isLoggedIn && <Login />}
                {isLoggedIn && <Profile />}{" "}
              </>
            }
          />
        </Route>

        <Route
          path="/projects/:id"
          element={
            <>
              {!isLoggedIn && <Login />}
              {isLoggedIn && <TaskDetail />}{" "}
            </>
          }
        />
        <Route
          path="/api/v1/users/activate-account/:token"
          element={
            <>
              {!isLoggedIn && (
                <Activation />
                
              )}
              {isLoggedIn && <Navigate to="/projects" />}{" "}
            </>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Box>
  );
}
