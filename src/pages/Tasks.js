import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserInfo } from "../features/auth/authSlice";
import { Navigate } from "react-router-dom";
import TaskList from "../features/task/components/TaskList";
import {
  fetchTasksByUserIdAsync,
  selectTasksLoaded,
  selectTasksStatus,
} from "../features/task/taskSlice";
import Loader from "../components/Loader";
import Navigation from "../components/Navigation";
import Select from "../components/Select";

function Tasks() {
  const userInfo = useSelector(selectUserInfo);
  const status = useSelector(selectTasksStatus);
  // console.log("hi", { status });

  const dispatch = useDispatch();
  const tasksLoaded = useSelector(selectTasksLoaded); //resembles user,tasks both loaded
  const [sortBy, setSortBy] = useState("");
  const [filterByStatus, setFilterByStatus] = useState("");

  // one issue is api calling after every mount
  useEffect(() => {
    if (userInfo) {
      const params = {};
      const parts = sortBy.split("/");
      params._sort = parts[0];
      params._order = parts[1];
      params.status = filterByStatus;
      params._id = userInfo._id;
      // console.log(params);
      dispatch(fetchTasksByUserIdAsync(params));
    }
  }, [sortBy, filterByStatus, dispatch, userInfo]);

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
    // console.log(sortBy)
  };

  const handleFilterChange = (event) => {
    setFilterByStatus(event.target.value);
    // console.log(filterByStatus)
  };

  return (
    <>
      {!userInfo && <Navigate to="/login" replace={true}></Navigate>}

      {tasksLoaded ? (
        <div >
          <Navigation />
          <Select
            sortBy={sortBy}
            handleSortChange={handleSortChange}
            filterByStatus={filterByStatus}
            handleFilterChange={handleFilterChange}
          />

          {status === "idle" ? <TaskList /> : <Loader />}
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default Tasks;
