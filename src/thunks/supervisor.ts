import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Auth from "@aws-amplify/auth";
import { baseUrl } from "../config";

export const getSupervisorSellside = createAsyncThunk(
  "getSupervisorSellside",
  async (_, { rejectWithValue }) => {
    const session = await Auth.currentSession();
    const tokenId = session.getIdToken().getJwtToken();

    try {
      const response = await axios.get(
        `${baseUrl}/profile/supervisor/sellside`,
        {
          headers: {
            Authorization: `Bearer ${tokenId}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      // @ts-ignore
      return rejectWithValue(err.response.data);
    }
  }
);

export const getSupervisorBuyside = createAsyncThunk(
  "getSupervisorBuyside",
  async (_, { rejectWithValue }) => {
    const session = await Auth.currentSession();
    const tokenId = session.getIdToken().getJwtToken();

    try {
      const response = await axios.get(
        `${baseUrl}/profile/supervisor/buyside`,
        {
          headers: {
            Authorization: `Bearer ${tokenId}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      // @ts-ignore
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateSupervisor = createAsyncThunk(
  "updateSupervisor",
  async (data: any, { rejectWithValue }) => {
    const session = await Auth.currentSession();
    const tokenId = session.getIdToken().getJwtToken();
    try {
      await axios.patch(`${baseUrl}/profile/supervisor`, data, {
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

export const updateProfile = createAsyncThunk(
  "updateProfile",
  async (id: string, { rejectWithValue }) => {
    const session = await Auth.currentSession();
    const tokenId = session.getIdToken().getJwtToken();
    try {
      await axios.patch(`${baseUrl}/profile/archive/${id}`, null, {
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
