import React from "react";
import { useSelector } from "react-redux";
import { selectTasks } from "../taskSlice";
import TaskContainer from "./TaskContainer";
import { Link } from "react-router-dom";

function TaskList() {
  const tasks = useSelector(selectTasks);
  // we are already taking care of taskLoaded == true , then only show this component
  // An empty array, [], is considered a truthy value

  // const user = useSelector(selectUserInfo);
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   if (user) dispatch(fetchTasksByUserIdAsync(user._id));
  // }, [dispatch, user]);
  return (
    <>
      {tasks && tasks.length !== 0 ? (
        
        tasks.map((task, index) => <TaskContainer index={index} key={index} task={task} />)
      ) : (
        <div  className="mt-5">
          <h1>Your task list is empty!</h1>
          <h3>
            Please create <Link to="/newTask">New Tasks</Link> or try removing
            filters
          </h3>
        </div>
      )}
    </>
  );
}

export default TaskList;
