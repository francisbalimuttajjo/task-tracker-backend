import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.withCredentials = true;

//confirming acs after registration
export const confirmAccount = createAsyncThunk(
  "users/accountconfirmation",
  async ({ token }) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/v1/users/activate-account/${token}`
      );

      return response.data;
    } catch (err) {
      return err.response.data;
    }
  }
);

//resting password after forgeting it
export const resetPassword = createAsyncThunk(
  "users/resetPassword",
  async ({ password, passwordConfirm, token }) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/v1/users/passwordReset/${token}`,

        {
          password,
          passwordConfirm,
        },

        {
          withCredentials: true,
        }
      );

      return response.data;
    } catch (err) {
      return err.response.data;
    }
  }
);

//asking for password reset
export const forgotPassword = createAsyncThunk(
  "users/forgotPPassword",
  async ({ email }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/users/forgotPassword",

        {
          email,
        }
      );

      return response.data;
    } catch (err) {
      return err.response.data;
    }
  }
);

//logging in
export const LoginUser = createAsyncThunk(
  "users/login",
  async ({ email, password }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/users/login",
        // "http://127.0.0.1:5000/api/v1/users/login",
        {
          email,
          password,
        },

        {
          withCredentials: true,
        }
      );
     

      return response.data;
    } catch (err) {
      return err.response.data;
    }
  }
);
//registering
export const register = createAsyncThunk(
  "users/register",
  async ({ firstName, lastName, email, password, passwordConfirm }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/users/register",
        { firstName, lastName, email, password, passwordConfirm }
      );

      return response.data;
    } catch (err) {
      return err.response.data;
    }
  }
);
//maintaining the login status
export const checkLoggin = createAsyncThunk("users/authenticate", async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/v1/users/auth");
    //  console.log(response.data)
    return response.data;
  } catch (err) {
    return err.response.data;
    // return null;
  }
});
//logging out
export const logOut = createAsyncThunk("users/logOut", async () => {
  try {
    const response = await axios.get(
      "http://localhost:5000/api/v1/users/logout"
    );

    return response.data;
  } catch (err) {
    return err.response.data;
  }
});

//updating password while logged in
export const updatePassword = createAsyncThunk(
  "users/changePassword",
  async ({ currentPassword, password, passwordConfirm }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/users/changePassword",
        { currentPassword, password, passwordConfirm }
      );

      return response.data;
    } catch (err) {
      return err.response.data;
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState: {
    user: {},
    isLoggedIn: false,
    loading: false,
    isRegistered: false,
    error: false,

    message: null,
  },
  reducers: {
    clearMessageUser: (state, action) => {
      state.message = null;
      state.error = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(updatePassword.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = "something went wrong, try again";
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        state.loading = false;

        if (action.payload.status === "success") {
          state.error = undefined;
          state.message = action.payload.data;
          state.isLoggedIn = false;
        } else {
          state.error = action.payload.message;
        }
      });
    builder
      .addCase(confirmAccount.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(confirmAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = "something went wrong, try again";
      })
      .addCase(confirmAccount.fulfilled, (state, action) => {
        state.loading = false;

        if (action.payload.status === "success") {
          state.isLoggedIn = true;
          state.error = undefined;
        } else {
          state.error = action.payload.message;
        }
      });
    builder
      .addCase(resetPassword.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = "something went wrong, try again";
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;

        if (action.payload.status === "success") {
          state.isLoggedIn = true;
          state.error = undefined;
          state.message = "password changed";
        } else {
          state.error = action.payload.message;
        }
      });
    builder
      .addCase(forgotPassword.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = "something went wrong, try again";
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading = false;

        if (action.payload.status === "success") {
          state.isLoggedIn = false;
          state.error = undefined;
          state.message = "activation link sent to your email";
        } else {
          state.error = action.payload.message;
        }
      });
    builder
      .addCase(logOut.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(logOut.rejected, (state, action) => {
        state.loading = false;
        state.error = "something went wrong, try again";
      })
      .addCase(logOut.fulfilled, (state, action) => {
        state.loading = false;

        if (action.payload.status === "success") {
          state.isLoggedIn = false;
          state.user = undefined;
        } else {
          state.isLoggedIn = true;
        }
      });
    builder
      .addCase(checkLoggin.pending, (state, action) => {
        // state.loading = true;
      })
      .addCase(checkLoggin.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(checkLoggin.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        if (action.payload.status === "success") {
          state.isLoggedIn = true;
          state.user = action.payload.data;
        } else {
          state.error = null;
          state.isLoggedIn = false;
        }
      });
    builder
      .addCase(LoginUser.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(LoginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = "something went wrong, try again";
      })
      .addCase(LoginUser.fulfilled, (state, action) => {
        state.loading = false;

        if (action.payload.status === "success") {
          state.isLoggedIn = true;
          state.error = false;
          state.user = action.payload.data.user;
        } else {
          state.error = action.payload.message;
          state.isLoggedIn = false;
        }
      });
    //
    builder
      .addCase(register.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = "something went wrong, try again";
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.error = undefined;

        if (action.payload.status === "success") {
          state.isRegistered = true;
        } else {
          state.error = action.payload.message;
        }
      });
  },
});

export const { clearMessageUser } = userSlice.actions;

export default userSlice.reducer;
