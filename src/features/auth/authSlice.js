import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  createUser,
  isAuthinticated,
  loginUser,
  logout,
  updateUser,
} from "./authAPI";

const initialState = {
  userInfo: null,
  status: "idle", // Represents the async operation status ('idle', 'loading', 'succeeded', 'failed').
  error: null,
  userChecked: false,
};

// Async Thunk for creating a new user
export const createUserAsync = createAsyncThunk(
  "user/createUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await createUser(userData); // Calls the API to create a new user.
      return response.data; // Returns the user data from the API response.
    } catch (error) {
      return rejectWithValue(error.message); //calls in .rejected
    }
  }
);
export const updateUserAsync = createAsyncThunk(
  "user/updateUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await updateUser(userData);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async Thunk for checking user credentials
export const loginUserAsync = createAsyncThunk(
  "user/loginUser",
  async (loginInfo, { rejectWithValue }) => {
    try {
      const response = await loginUser(loginInfo); // Calls the API to check user credentials.
      return response.data; // Returns the user data from the API response.
    } catch (error) {
      // console.log(error)
      return rejectWithValue(error?.message); // here error is object containing message:'Unauthorized' or any other message
    }
  }
);
export const isAuthinticatedAsync = createAsyncThunk(
  "user/isAuthinticated",
  async () => {
    try {
      const response = await isAuthinticated(); // Calls the API to check user credentials.
      // console.log(response)
      return response.data; // Returns the user data from the API response.
    } catch (error) {
      // console.log(error.message)
      return error.message; // here error is object containing message:'Unauthorized' or any other message
    }
  }
);
export const logoutUserAsync = createAsyncThunk("user/logoutUser", async () => {
  try {
    const response = await logout(); // Calls the API to check user credentials.
    // console.log({ response });
    return response.data; // Returns the user data from the API response.
  } catch (error) {
    return error?.message; // here error is object containing message:'Unauthorized' or any other message
  }
});

// Creates a Redux slice for user state management
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearError: (state) => {
      state.status = "idle";
      state.error = null;
    },
    // here ,for also  showing general errors that are not related to api call we are using the error state
    setError: (state, action) => {
      state.status = "idle";
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userInfo = action.payload.user;
      })
      .addCase(createUserAsync.rejected, (state, action) => {
        state.status = "idle";
        // alert(`error : ${action.payload}`)
        state.error = action.payload + " from createUserAsync.rejected"; //for better identification
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userInfo = action.payload.user;
      })
      .addCase(updateUserAsync.rejected, (state, action) => {
        state.status = "idle";
        alert(`error : ${action.payload}`);
        state.error = action.payload;
      })
      .addCase(loginUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userInfo = action.payload.user;
        state.error = null;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.status = "idle"; // Sets the status back to 'idle' when the user credentials check is rejected.

        state.error = action.payload; // Updates the error state with the error information from the rejected action.
      })
      .addCase(logoutUserAsync.fulfilled, (state, action) => {
        state.userInfo = null;
        state.error = null;
        alert(action?.payload?.message);
      })
      .addCase(isAuthinticatedAsync.fulfilled, (state, action) => {
        state.userInfo = action.payload.user;
        state.userChecked = true;
      })
      .addCase(isAuthinticatedAsync.rejected, (state, action) => {
        state.userChecked = true; //update so that our app can start
      });
  },
});

// Selectors to access specific parts of the user state
export const selectUserInfo = (state) => state.auth.userInfo;
export const selectUserChecked = (state) => state.auth.userChecked;
export const selectError = (state) => state.auth.error;

export const { clearError, setError } = userSlice.actions;

export default userSlice.reducer;
