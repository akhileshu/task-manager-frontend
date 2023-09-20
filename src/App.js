import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import { useDispatch, useSelector } from "react-redux";

import {
  clearError,
  isAuthinticatedAsync,
  selectError,
  selectUserChecked,
  selectUserInfo,
} from "./features/auth/authSlice";
import Tasks from "./pages/Tasks";
import Home from "./pages/Home";
import { fetchTasksByUserIdAsync } from "./features/task/taskSlice";
import NewTask from "./pages/NewTask";
import Loader from "./components/Loader";
import NotFoundPage from "./components/NotFoundPage";
import Profile from "./pages/Profile";
import ContactPage from "./pages/developer/ContactPage";
import DeveloperPage from "./pages/developer/DeveloperPage";
import AboutApp from "./pages/developer/AboutApp";


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/tasks",
      element: <Tasks />,
    },
    {
      path: "/newTask",
      element: <NewTask />,
    },
    {
      path: "/profile",
      element: <Profile />,
    },
    {
      path: "/developer",
      element: <DeveloperPage />,
    },
    {
      path: "/contactUs",
      element: <ContactPage />,
    },
    {
      path: "/about",
      element: <AboutApp />,
    },
    
    {
      path: "/*",
      element: <NotFoundPage />,
    },
  ]);
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const user = useSelector(selectUserInfo);
  const error = useSelector(selectError);

  // now user contains only token and id can be retrived in backend through req.user

  // Use useEffect to fetch cart items if the user is logged in.
  useEffect(() => {
    if (user) {
      // this will ensure taskLoaded ==true
      dispatch(fetchTasksByUserIdAsync({ _id: user._id }));
    }
  }, [dispatch, user]);
  const userChecked = useSelector(selectUserChecked); //bool in case we reload we first fetch user and then start app

  useEffect(() => {
    dispatch(isAuthinticatedAsync()); //also sets the userInfo and userChecked
  }, [dispatch]);

  useEffect(() => {
    // Initialize a variable to store the timeout ID
    let timeoutId;

    if (error) {
      timeoutId = setTimeout(() => {
        dispatch(clearError());
      }, 4000);
    }

    // Cleanup function
    return () => {
      // Clear the timeout if the component unmounts or if error changes
      clearTimeout(timeoutId);
    };
  }, [dispatch, error]);

  // Clear the error state after a timeout

  // ! here we can load app only after userChecked  for loader/spinner on every page

  return (
    <div className="App">
      {userChecked ? <RouterProvider router={router} /> : <Loader />}
    </div>
  );
}

export default App;
