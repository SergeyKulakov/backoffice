import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Auth from "@aws-amplify/auth";
import { baseUrl } from "../config";
import { DegreeDataPost } from "../types/degree";

export const createDegreeTypes = createAsyncThunk(
  "createDegreeTypes",
  async (data: DegreeDataPost, { rejectWithValue }) => {
    const session = await Auth.currentSession();
    const tokenId = session.getIdToken().getJwtToken();
    try {
      await axios.post(`${baseUrl}/degree/create`, data, {
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

export const updateDegreeTypes = createAsyncThunk(
  "updateDegreeTypes",
  async (data: DegreeDataPost, { rejectWithValue }) => {
    const session = await Auth.currentSession();
    const tokenId = session.getIdToken().getJwtToken();
    try {
      await axios.put(`${baseUrl}/degree/${data._id}`, data, {
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

export const removeDegreeTypes = createAsyncThunk(
  "createDegreeTypes",
  async (id: string, { rejectWithValue }) => {
    const session = await Auth.currentSession();
    const tokenId = session.getIdToken().getJwtToken();
    try {
      await axios.delete(`${baseUrl}/degree/${id}`, {
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

export const getOneDegreeTypes = createAsyncThunk(
  "getOneDegreeTypes",
  async (id: string, { rejectWithValue }) => {
    const session = await Auth.currentSession();
    const tokenId = session.getIdToken().getJwtToken();
    try {
      const response = await axios.get(`${baseUrl}/degree/${id}`, {
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

export const getAllDegree = createAsyncThunk(
  "degree",
  async (_, { rejectWithValue }) => {
    const session = await Auth.currentSession();
    const tokenId = session.getIdToken().getJwtToken();

    try {
      const response = await axios.get(`${baseUrl}/degree`, {
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

export const getUnverifiedDegree = createAsyncThunk(
  "getUnverifiedDegree",
  async (rejectWithValue) => {
    const session = await Auth.currentSession();
    const tokenId = session.getIdToken().getJwtToken();
    try {
      const response = await axios.get(
        `${baseUrl}/move/unverified?type=degree`,
        {
          headers: {
            Authorization: `Bearer ${tokenId}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      // @ts-ignores
      return rejectWithValue(err.response.data);
    }
  }
);
