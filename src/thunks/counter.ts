import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Auth from "@aws-amplify/auth";
import { baseUrl } from "../config";

export const getCountReseacrher = createAsyncThunk(
  "getCountSellside",
  async (_, { rejectWithValue }) => {
    const session = await Auth.currentSession();
    const tokenId = session.getIdToken().getJwtToken();

    try {
      const response = await axios.get(`${baseUrl}/profile/count/researcher`, {
        headers: {
          Authorization: `Bearer ${tokenId}`,
        },
      });
      return response.data;
    } catch (err) {
      // @ts-ignore
      return rejectWithValue(err.response.data);
    }
  }
);

export const getCountSupervisor = createAsyncThunk(
  "getCountSupervisor",
  async (_, { rejectWithValue }) => {
    const session = await Auth.currentSession();
    const tokenId = session.getIdToken().getJwtToken();

    try {
      const response = await axios.get(`${baseUrl}/profile/count/supervisor`, {
        headers: {
          Authorization: `Bearer ${tokenId}`,
        },
      });
      return response.data;
    } catch (err) {
      // @ts-ignore
      return rejectWithValue(err.response.data);
    }
  }
);
