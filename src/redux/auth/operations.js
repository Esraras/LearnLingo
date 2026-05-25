import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
} from "firebase/auth";
import { auth, provider as googleProvider } from "../../../firebase.js";
import { setCredentials, logout as logoutAction } from "./slice.js";

export const register = createAsyncThunk(
  "auth/register",
  async ({ email, password, displayName }, thunkAPI) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;
      const token = await user.getIdToken();
      const userData = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || displayName || null,
      };
      thunkAPI.dispatch(setCredentials({ user: userData, token }));
      return { user: userData, token };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || String(error));
    }
  },
);

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;
      const token = await user.getIdToken();
      const userData = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
      };
      thunkAPI.dispatch(setCredentials({ user: userData, token }));
      return { user: userData, token };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || String(error));
    }
  },
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await signOut(auth);
    thunkAPI.dispatch(logoutAction());
    return {};
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message || String(error));
  }
});

export const googleLogin = createAsyncThunk(
  "auth/googleLogin",
  async (_, thunkAPI) => {
    try {
      const result = await signInWithPopup(auth, googleProvider); // signInWithRedirect can be used as an alternative
      const user = result.user;
      const token = await user.getIdToken();
      const userData = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
      };
      thunkAPI.dispatch(setCredentials({ user: userData, token }));
      return { user: userData, token };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || String(error));
    }
  }
);

export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        return thunkAPI.rejectWithValue("No authenticated user");
      }
      const token = await user.getIdToken(true);
      const userData = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
      };
      thunkAPI.dispatch(setCredentials({ user: userData, token }));
      return userData;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || String(error));
    }
  },
);
