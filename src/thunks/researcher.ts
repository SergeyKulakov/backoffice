import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Auth from "@aws-amplify/auth";
import { baseUrl } from "../config";
import { UploadCsvData } from "../types/profile";

export const getResearcherSellside = createAsyncThunk(
  "getResearcherSellside",
  async (_, { rejectWithValue }) => {
    const session = await Auth.currentSession();
    const tokenId = session.getIdToken().getJwtToken();

    try {
      const response = await axios.get(
        `${baseUrl}/profile/researcher/sellside`,
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

export const getResearcherBuyside = createAsyncThunk(
  "getResearcherBuyside",
  async (_, { rejectWithValue }) => {
    const session = await Auth.currentSession();
    const tokenId = session.getIdToken().getJwtToken();

    try {
      const response = await axios.get(
        `${baseUrl}/profile/researcher/buyside`,
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

export const updateResearcher = createAsyncThunk(
  "updateResearcher",
  async (data: any, { rejectWithValue }) => {
    const session = await Auth.currentSession();
    const tokenId = session.getIdToken().getJwtToken();
    try {
      await axios.patch(`${baseUrl}/profile/researcher`, data, {
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

export const getResearcherList = createAsyncThunk(
  "getResearcherList",
  async (_, { rejectWithValue }) => {
    const session = await Auth.currentSession();
    const tokenId = session.getIdToken().getJwtToken();

    try {
      const response = await axios.get(`${baseUrl}/user/researchers`, {
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
