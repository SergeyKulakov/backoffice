import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Auth from "@aws-amplify/auth";
import { baseUrl } from "../config";
import { SuggestedDataPost } from "../types/suggested-strategy";

export const createStrategy = createAsyncThunk(
  "createStrategy",
  async (data: SuggestedDataPost, { rejectWithValue }) => {
    const session = await Auth.currentSession();
    const tokenId = session.getIdToken().getJwtToken();
    try {
      await axios.post(`${baseUrl}/suggested-strategy/create`, data, {
        headers: {
          Authorization: `Bearer ${tokenId}`,
        },
      });
    } catch (err) {
      // @ts-ignores
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateStrategy = createAsyncThunk(
  "updateStrategy",
  async (data: SuggestedDataPost, { rejectWithValue }) => {
    const session = await Auth.currentSession();
    const tokenId = session.getIdToken().getJwtToken();
    try {
      await axios.put(`${baseUrl}/suggested-strategy/${data._id}`, data, {
        headers: {
          Authorization: `Bearer ${tokenId}`,
        },
      });
    } catch (err) {
      // @ts-ignores
      return rejectWithValue(err.response.data);
    }
  }
);

export const removeStrategy = createAsyncThunk(
  "removeStrategy",
  async (id: string, { rejectWithValue }) => {
    const session = await Auth.currentSession();
    const tokenId = session.getIdToken().getJwtToken();
    try {
      await axios.delete(`${baseUrl}/suggested-strategy/${id}`, {
        headers: {
          Authorization: `Bearer ${tokenId}`,
        },
      });
    } catch (err) {
      // @ts-ignores
      return rejectWithValue(err.response.data);
    }
  }
);

export const getOneStrategy = createAsyncThunk(
  "getOneStrategy",
  async (id: string, { rejectWithValue }) => {
    const session = await Auth.currentSession();
    const tokenId = session.getIdToken().getJwtToken();
    try {
      const response = await axios.get(`${baseUrl}/suggested-strategy/${id}`, {
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

export const getAllStrategy = createAsyncThunk(
  "getAllStrategy",
  async (_, { rejectWithValue }) => {
    const session = await Auth.currentSession();
    const tokenId = session.getIdToken().getJwtToken();

    try {
      const response = await axios.get(`${baseUrl}/suggested-strategy`, {
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
