import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Auth from "@aws-amplify/auth";
import { baseUrl } from "../config";
import { CountriesDataPost } from "../types/countries";

export const createCountries = createAsyncThunk(
  "createCountries",
  async (data: CountriesDataPost, { rejectWithValue }) => {
    const session = await Auth.currentSession();
    const tokenId = session.getIdToken().getJwtToken();
    try {
      await axios.post(`${baseUrl}/country/create`, data, {
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

export const updateCountries = createAsyncThunk(
  "updateCountries",
  async (data: CountriesDataPost, { rejectWithValue }) => {
    const session = await Auth.currentSession();
    const tokenId = session.getIdToken().getJwtToken();
    try {
      await axios.put(`${baseUrl}/country/${data._id}`, data, {
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

export const removeCountries = createAsyncThunk(
  "removeCountries",
  async (id: string, { rejectWithValue }) => {
    const session = await Auth.currentSession();
    const tokenId = session.getIdToken().getJwtToken();
    try {
      await axios.delete(`${baseUrl}/country/${id}`, {
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

export const getOneCountry = createAsyncThunk(
  "getOneCountry",
  async (id: string, { rejectWithValue }) => {
    const session = await Auth.currentSession();
    const tokenId = session.getIdToken().getJwtToken();
    try {
      const response = await axios.get(`${baseUrl}/country/${id}`, {
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

export const getAllDCountries = createAsyncThunk(
  "country",
  async (_, { rejectWithValue }) => {
    const session = await Auth.currentSession();
    const tokenId = session.getIdToken().getJwtToken();

    try {
      const response = await axios.get(`${baseUrl}/country`, {
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

export const getUnverifiedCountries = createAsyncThunk(
  "getUnverifiedCountries",
  async (rejectWithValue) => {
    const session = await Auth.currentSession();
    const tokenId = session.getIdToken().getJwtToken();
    try {
      const response = await axios.get(
        `${baseUrl}/move/unverified?type=country`,
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

export const getUnverifiedCities = createAsyncThunk(
  "getUnverifiedCities",
  async (rejectWithValue) => {
    const session = await Auth.currentSession();
    const tokenId = session.getIdToken().getJwtToken();
    try {
      const response = await axios.get(`${baseUrl}/move/unverified?type=city`, {
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
