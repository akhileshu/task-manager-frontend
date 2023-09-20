import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  createTask,
  deleteTask,
  fetchTasksByUserId,
  updateTask,
} from "./taskAPI";

const initialState = {
  tasks: [], // Array to store multiple tasks
  status: "idle", // Represents the async operation status ('idle', 'loading', 'succeeded', 'failed').
  tasksLoaded: false,
};

// Async Thunk for adding an item to the tasks
export const createTaskAsync = createAsyncThunk(
  "tasks/createTask",
  async (task) => {
    try {
      const response = await createTask(task); // Calls the API to add an item to the tasks.
      return response.data; // Returns the data of the added item from the API response.
    } catch (error) {
      return error.message;
    }
  }
);

// Async Thunk for fetching tasks  by user ID
export const fetchTasksByUserIdAsync = createAsyncThunk(
  "tasks/fetchTasksByUserId",
  async (obj) => {
    try {
      // console.log(obj);
      const response = await fetchTasksByUserId(obj); // Calls the API to fetch tasks  by user ID.
      return response.data; // Returns the tasks  from the API response.
    } catch (error) {
      return error.message;
    }
  }
);

// Async Thunk for updating an item in the tasks
export const updateTaskAsync = createAsyncThunk(
  "tasks/updateTask",
  async (update) => {
    try {
      const response = await updateTask(update); // Calls the API to update an item in the tasks.
      return response.data; // Returns the updated item data from the API response.
    } catch (error) {
      return error.message;
    }
  }
);

// Async Thunk for deleting an item from the tasks
export const deleteTaskAsync = createAsyncThunk(
  "tasks/deleteTask",
  async (id) => {
    try {
      await deleteTask(id); // Calls the API to delete an item from the tasks.
      return id; // Returns the ID of the deleted item as it is not returned from the API response.
    } catch (error) {
      return error.message;
    }
  }
);
// export const resettasksAsync = createAsyncThunk("tasks/resettasks", async () => {
//   const response = await resettasks(); // Calls the API to delete an item from the tasks.
//   return response.status; // Returns the ID of the deleted item as it is not returned from the API response.
// });

// Creates a Redux slice for tasks state management
export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTaskAsync.pending, (state) => {
        state.status = "loading"; // Sets the status to 'loading' when adding an item to the tasks.
      })
      .addCase(createTaskAsync.fulfilled, (state, action) => {
        state.status = "idle"; // Sets the status back to 'idle' when adding an item to the tasks is successful.
        state.tasks.push(action.payload); // Adds the added item to the tasks items list.
        alert("Task created successfully");

      })
      .addCase(fetchTasksByUserIdAsync.pending, (state) => {
        state.status = "loading"; // Sets the status to 'loading' when fetching tasks items.
      })
      .addCase(fetchTasksByUserIdAsync.fulfilled, (state, action) => {
        state.status = "idle"; // Sets the status back to 'idle' when fetching tasks items is successful.

        state.tasks = action.payload.docs; // Updates the tasks items with the fetched items from the API response.

        state.tasksLoaded = true;
      })
      .addCase(fetchTasksByUserIdAsync.rejected, (state) => {
        state.status = "idle";
        state.tasksLoaded = true;
      })
      .addCase(updateTaskAsync.pending, (state) => {
        state.status = "loading"; // Sets the status to 'loading' when updating an item in the tasks.
      })
      .addCase(updateTaskAsync.fulfilled, (state, action) => {
        state.status = "idle"; // Sets the status back to 'idle' when updating an item in the tasks is successful.
        state.tasks = state.tasks.map((item) =>
          item._id === action.payload._id ? action.payload : item
        ); // Updates the tasks items with the updated item from the API response.
      })
      .addCase(deleteTaskAsync.pending, (state) => {
        state.status = "loading"; // Sets the status to 'loading' when deleting an item from the tasks.
      })
      .addCase(deleteTaskAsync.fulfilled, (state, action) => {
        state.status = "idle"; // Sets the status back to 'idle' when deleting an item from the tasks is successful.
        state.tasks = state.tasks.filter((item) => item._id !== action.payload); // Removes the deleted item from the tasks items list.
      });
    
  },
});

export const { increment } = taskSlice.actions;

// Selector to access the task items from the state
export const selectTasks = (state) => state.task.tasks;
export const selectTasksLoaded = (state) => state.task.tasksLoaded;
export const selectTasksStatus = (state) => state.task.status;

export default taskSlice.reducer;
