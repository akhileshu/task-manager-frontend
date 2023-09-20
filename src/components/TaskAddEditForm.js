import { Button, Col, Container, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../features/auth/authSlice";
import { formatDateForInput } from "../utils";
import { useEffect } from "react";

function TaskAddEditForm({
  handleAdd,
  setShowAddTaskForm,
  task,
  setShowEditForm,
  handleEdit,
}) {
  const userInfo = useSelector(selectUserInfo);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  function handleEditForm() {
    // handles form, does not edit directly
    const { title, description, status, dueDate } = task;
    setValue("title", title);
    setValue("description", description);
    setValue("status", status);

    setValue("dueDate", formatDateForInput(dueDate));
  }
  useEffect(() => {
    // its for editing
    if (task) {
      handleEditForm();
    }
  });

  return (
    <Container>
      <Form
        noValidate
        onSubmit={handleSubmit((data) => {
          // we are storing in ist string

          if (task)
            handleEdit({
              ...data,
              userId: userInfo._id,
            });
          else
            handleAdd({
              ...data,
              userId: userInfo._id,
            });
          reset();
        })}
      >
        <Form.Group
          as={Row}
          className="mb-3"
          controlId="exampleForm.ControlInput1"
        >
          <Form.Label column sm="2">
            Title
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              {...register("title", {
                required: "title is required",
              })}
            />
          </Col>
          {errors.title && (
            <p className="text-red-500">{errors.title.message}</p>
          )}
        </Form.Group>
        <Form.Group
          as={Row}
          className="mb-3"
          controlId="exampleForm.ControlInput1"
        >
          <Form.Label column sm="2">
            Description
          </Form.Label>
          <Col sm="10">
            <Form.Control
              as="textarea"
              {...register("description", {
                required: "description is required",
              })}
            />
          </Col>
          {errors.description && (
            <p className="text-red-500">{errors.description.message}</p>
          )}
        </Form.Group>
        <Form.Group
          as={Row}
          className="mb-3"
          controlId="exampleForm.ControlInput1"
        >
          <Form.Label column sm="2">
            Due Date
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="datetime-local"
              {...register("dueDate", {
                required: "dueDate is required",
              })}
            />
          </Col>
          {errors.dueDate && (
            <p className="text-red-500">{errors.dueDate.message}</p>
          )}
        </Form.Group>
        <Form.Group
          as={Row}
          className="mb-3"
          controlId="exampleForm.ControlInput1"
        >
          <Form.Label column sm="2">
            Status
          </Form.Label>
          <Col sm="10">
            <Form.Control
              as="select"
              {...register("status", {
                required: "status is required",
              })}
            >
              <option value="todo">To-Do</option>
              <option value="inProgress">In Progress</option>
              <option value="completed">Completed</option>
            </Form.Control>
          </Col>
        </Form.Group>
        <div className="addCancelBtn">
          <Button
            variant="danger"
            onClick={(e) => {
              if (task) setShowEditForm(false);
              else setShowAddTaskForm(false);
              reset();
            }}
            type="button"
          >
            Cancel
          </Button>{" "}
          <Button type="submit">{task ? "Edit Task" : "Add Task"}</Button>
        </div>
      </Form>
    </Container>
  );
}

export default TaskAddEditForm;
