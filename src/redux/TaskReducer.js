import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

import { current } from "immer";
//updating tasks
export const updateTask = createAsyncThunk(
  "items/updateTask",

  async ({ id, comments, steps }) => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/api/v1/tasks/${id}`,
        { comments, steps }
      );

      return response.data;
    } catch (err) {
      return err.response.data;
    }
  }
);

//deleting tasks
export const deleteTask = createAsyncThunk(
  "items/deleteTask",

  async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/v1/tasks/${id}`
      );
      return response.data;
    } catch (err) {
      return err.response.data;
    }
  }
);
//adding new task
export const addTask = createAsyncThunk(
  "items/addTask",

  async ({ title, category, description, comments, steps, priority }) => {
    try {
      const response = await axios.post("http://localhost:5000/api/v1/tasks", {
        title,
        category,
        description,
        comments,
        steps,
        priority,
      });
     
      return response.data;
    } catch (err) {
      
      return err.response.data;
    }
  }
);
//getting tasks for a single user
export const getTasks = createAsyncThunk(
  "items/getTasks",

  async (thunkAPI) => {
    try {
      const response = await axios.get("http://localhost:5000/api/v1/myTasks");

      return response.data;
    } catch (err) {
      return err.response.data;
    }
  }
);
const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    loading: false,
    error: null,
    message: null,
  },
  extraReducers(builder) {
    builder
      .addCase(updateTask.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.loading = false;
        state.error = "something went wrong";
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.status === "success") {
          state.error = null;
          state.message = "changes saved";
        } else {
          state.error = action.payload.message;
        }
      });
    builder
      .addCase(deleteTask.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.loading = false;
        state.error = "something went wrong";
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.status === "success") {
          state.error = null;
          state.message = "project deleted";
          const newTasks = state.tasks.filter(
            (task) => task._id !== action.payload.data.id
          );
          state.tasks = newTasks;
        } else {
          state.error = action.payload.message;
        }
      });
    builder
      .addCase(addTask.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTask.rejected, (state, action) => {
        state.loading = false;
        state.error = "something went wrong";
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.status === "success") {
          state.error = null;
          state.message = "project added";
          const newTask = action.payload.data;
          const newTaskList = [...state.tasks, newTask];
          state.tasks = newTaskList;
        } else {
          state.error = action.payload.message;
        }
      });
    builder
      .addCase(getTasks.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = "something went wrong try again";
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.status === "success" && action.payload.data.no > 0) {
          state.tasks = action.payload.data.tasks;
          state.error = null;
        } else if (
          action.payload.status === "success" &&
          action.payload.data.no < 1
        ) {
          state.tasks = [];
          state.error = null;
        } else {
          // state.error = action.payload.message;
        }
      });
  },
  reducers: {
    //clearing  state for tasks on logout
    clearState: (state, action) => {
      state.tasks = [];
    },
    clearMessage: (state, action) => {
      state.message = null;
      state.error = null;
    },

    handleClick: (state, action) => {
      //getting index of task in array
      const index = state.tasks.findIndex(
        (task) => task._id === action.payload.id
      );

      //getting the task using index
      const task = current(state.tasks)[index];
      let step = task.steps[action.payload.index];
      //saving changes to state
      state.tasks[index].steps[action.payload.index] = {
        step: step.step,
        completed: !step.completed,
      };
    },

    removeStep: (state, action) => {
      const index = state.tasks.findIndex(
        (task) => task._id === action.payload.id
      );

      const task = current(state.tasks)[index];
      //deleting selected step
      state.tasks[index].steps = task.steps
        .slice(0, action.payload.index)
        .concat(
          task.steps.slice(action.payload.index + 1, task.comments.length)
        );
    },

    removeComment: (state, action) => {
      const index = state.tasks.findIndex(
        (task) => task._id === action.payload.id
      );
      const task = current(state.tasks)[index];
      //deleting current comment
      state.tasks[index].comments = task.comments
        .slice(0, action.payload.index)
        .concat(
          task.comments.slice(action.payload.index + 1, task.comments.length)
        );
    },
  },
});

export const {
  clearState,
  handleClick,
  clearMessage,
  removeComment,
  removeStep,
} = taskSlice.actions;

export default taskSlice.reducer;
