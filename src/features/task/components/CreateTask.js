import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createTaskAsync } from "../taskSlice";

import { Button } from "react-bootstrap";
import TaskAddEditForm from "../../../components/TaskAddEditForm";

export default function CreateTask() {
  const dispatch = useDispatch();

  const [showAddTaskForm, setShowAddTaskForm] = useState(false);

  function handleAdd(newTask) {

    dispatch(
      createTaskAsync(newTask)
    );
   

    setShowAddTaskForm(false);
  }

  return (
    <div>
      <h2>Create a New Task</h2>
      {!showAddTaskForm ? (
        <Button
          onClick={(e) => {
            setShowAddTaskForm(true);
          }}
          type="button"
          className="rounded-md my-5 "
        >
          Add New Task
        </Button>
      ) : null}

      {showAddTaskForm ? (
        // place inside a <Container/> for responsive layout
        <TaskAddEditForm
          handleAdd={handleAdd}
          setShowAddTaskForm={setShowAddTaskForm}
        />
      ) : null}
    </div>
  );
}
