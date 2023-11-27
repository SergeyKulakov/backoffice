import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RegisterData } from "../types/user";
import Auth from "@aws-amplify/auth";
import { baseUrl } from "../config";

export const userList = createAsyncThunk(
  "auth/register",
  async (registerData: RegisterData, { rejectWithValue }) => {
    const session = await Auth.currentSession();
    const tokenId = session.getIdToken().getJwtToken();
    try {
      await axios.post(`${baseUrl}/auth/register`, registerData, {
        headers: {
          Authorization: `Bearer ${tokenId}`,
        },
      });
    } catch (err) {
      // @ts-ignore
      return rejectWithValue(err.response.data);
    }
  }
);

export const getAllUsers = createAsyncThunk(
  "users",
  async (_, { rejectWithValue }) => {
    const session = await Auth.currentSession();
    const tokenId = session.getIdToken().getJwtToken();

    try {
      const response = await axios.get(`${baseUrl}/user`, {
        headers: {
          Authorization: `Bearer ${tokenId}`,
        },
      });
      return response.data.data;
    } catch (err) {
      // @ts-ignore
      return rejectWithValue(err.response.data);
    }
  }
);

export const getUserInfo = createAsyncThunk(
  "userInfo",
  async (_, { rejectWithValue }) => {
    const session = await Auth.currentSession();
    const tokenId = session.getIdToken().getJwtToken();

    try {
      const response = await axios.get(`${baseUrl}/user/info`, {
        headers: {
          Authorization: `Bearer ${tokenId}`,
        },
      });
      return response.data.data;
    } catch (err) {
      // @ts-ignore
      return rejectWithValue(err.response.data);
    }
  }
);

export const getSearchProfile = createAsyncThunk(
  "searchProfile",
  async (query: string, { rejectWithValue }) => {
    const session = await Auth.currentSession();
    const tokenId = session.getIdToken().getJwtToken();
    try {
      const response = await axios.get(`${baseUrl}/profile?search=${query}`, {
        headers: {
          Authorization: `Bearer ${tokenId}`,
        },
      });
      return response.data;
    } catch (err) {
      // @ts-ignores
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateActiveProfile = createAsyncThunk(
  "updateActiveProfile",
  async (data: any, { rejectWithValue }) => {
    const session = await Auth.currentSession();
    const tokenId = session.getIdToken().getJwtToken();
    try {
      await axios.patch(`${baseUrl}/profile/summary/${data.id}`, data, {
        headers: {
          Authorization: `Bearer ${tokenId}`,
        },
      });
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);
