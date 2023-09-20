import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";

function Select({
  handleSortChange,
  sortBy,
  filterByStatus,
  handleFilterChange,
}) {
  return (
    <>
      <Container>
        <label>Sort By : </label>
        <Form.Select
          aria-label="Default select example"
          value={sortBy}
          onChange={handleSortChange}
        >
          <option value="/">Select</option>
          <option value="dueDate/asc">Due Date (Ascending)</option>
          <option value="dueDate/desc">Due Date (Descending)</option>
          <option value="creationDate/asc">Creation Date (Ascending)</option>
          <option value="creationDate/desc">Creation Date (Descending)</option>
        </Form.Select>
        <label>Filter By Status : </label>
        <Form.Select
          aria-label="Default select example"
          value={filterByStatus}
          onChange={handleFilterChange}
        >
          <option value="">All</option>
          <option value="todo">To-Do</option>
          <option value="inProgress">In Progress</option>
          <option value="completed">Completed</option>
        </Form.Select>
      </Container>
    </>
  );
}

export default Select;
