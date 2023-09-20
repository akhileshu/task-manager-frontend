import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import TaskAddEditForm from "../../../components/TaskAddEditForm";
import TransitionBs from "../../../components/Transition";
import "../../../cssFiles/taskContainer.css";
import {
  formatDateAndTime
} from "../../../utils";
import { selectError, setError } from "../../auth/authSlice";
import { deleteTaskAsync, updateTaskAsync } from "../taskSlice";

function TaskContainer({ task, index }) {
  const [showEditForm, setShowEditForm] = useState(false);
  const [errorIndex, setErrorIndex] = useState(false);
  const { title, description, status, creationDate, lastUpdate, dueDate, _id } =
    task;

  // Extract and format dates and times
  const { date: createdDate, time: createdTime } =
    formatDateAndTime(creationDate);
  const { date: lastDate, time: lastTime } = formatDateAndTime(dueDate);
  const { date: updatedDate, time: updatedTime } =
    formatDateAndTime(lastUpdate);

  // State to control whether to show date and time details
  const error = useSelector(selectError);

  const dispatch = useDispatch();

  //   edit functionality

  function handleEdit(updatedTask) {
    const { title: t, description: d, status: s, dueDate: dd } = updatedTask;
    const { title, description, status, dueDate } = task;

    if (
      t === title &&
      d === description &&
      s === status &&
      formatDateAndTime(dd).time === formatDateAndTime(dueDate).time &&
      formatDateAndTime(dd).date === formatDateAndTime(dueDate).date
    ) {
      dispatch(
        setError("can't update task because you did'nt make any changes")
      );
      setErrorIndex(index);
    } else {
      // const dateString = updatedTask.dueDate;
      dispatch(
        updateTaskAsync({
          ...updatedTask,
          _id,
        })
      );
     
    }

    setShowEditForm(false);
  }

  return (
    <>
      <Container>
        {showEditForm ? (
          <TaskAddEditForm
            task={task}
            handleEdit={handleEdit}
            setShowEditForm={setShowEditForm}
          />
        ) : null}
        <div className="task-container">
          {error && errorIndex === index && <p className="errorMsg">{error}</p>}

          <div>
            <TransitionBs>
              <div className="details">
                <p>
                  Created on <strong>Date: </strong>
                  {createdDate} <strong>Time: </strong>
                  {createdTime}
                </p>
                <p>
                  Due on <strong>Date: </strong>
                  {lastDate} <strong>Time: </strong>
                  {lastTime}
                </p>
                {lastUpdate && (
                  <p>
                    Last Updated on <strong>Date: </strong>
                    {updatedDate} <strong>Time: </strong>
                    {updatedTime}
                  </p>
                )}
              </div>
            </TransitionBs>{" "}
            <Button
              variant="secondary"
              onClick={() => {
                setShowEditForm(true);
              }}
            >
              Edit
            </Button>{" "}
            <Button
              variant="danger"
              onClick={() => {
                const confirm = window.confirm("delete Permenantly ?");
                if (confirm) dispatch(deleteTaskAsync(_id));
              }}
            >
              Delete
            </Button>
          </div>

          <h2 className="mt-3">{title}</h2>
          <p>{description}</p>

          <p>
            <strong>Status:</strong> {status}
          </p>
        </div>
      </Container>
    </>
  );
}

export default TaskContainer;
