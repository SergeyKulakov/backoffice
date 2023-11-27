import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Auth from "@aws-amplify/auth";
import { baseUrl } from "../config";
import { CompanyDataPost } from "../types/companies";

export const createNewCompany = createAsyncThunk(
  "createNewCompany",
  async (data: CompanyDataPost, { rejectWithValue }) => {
    const session = await Auth.currentSession();
    const tokenId = session.getIdToken().getJwtToken();
    try {
      await axios.post(`${baseUrl}/company/create`, data, {
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

export const getAllCompanies = createAsyncThunk(
  "company",
  //@ts-ignore
  async ({ limit }, { rejectWithValue }) => {
    const session = await Auth.currentSession();
    const tokenId = session.getIdToken().getJwtToken();

    try {
      const response = await axios.get(`${baseUrl}/company`, {
        headers: {
          Authorization: `Bearer ${tokenId}`,
        },
        params: {
          limit,
        },
      });
      return response.data;
    } catch (err) {
      // @ts-ignore
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateCompaniesTypes = createAsyncThunk(
  "updateCompaniesTypes",
  async (data: CompanyDataPost, { rejectWithValue }) => {
    const session = await Auth.currentSession();
    const tokenId = session.getIdToken().getJwtToken();
    try {
      await axios.put(`${baseUrl}/company/${data._id}`, data, {
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

export const getOneCompany = createAsyncThunk(
  "getOneCompany",
  async (id: string, { rejectWithValue }) => {
    const session = await Auth.currentSession();
    const tokenId = session.getIdToken().getJwtToken();
    try {
      const response = await axios.get(`${baseUrl}/company/${id}`, {
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

export const removeCompany = createAsyncThunk(
  "removeCompany",
  async (id: string, { rejectWithValue }) => {
    const session = await Auth.currentSession();
    const tokenId = session.getIdToken().getJwtToken();
    try {
      await axios.delete(`${baseUrl}/company/${id}`, {
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

export const getUnverifiedCompanies = createAsyncThunk(
  "getUnverifiedCompanies",
  async (rejectWithValue) => {
    const session = await Auth.currentSession();
    const tokenId = session.getIdToken().getJwtToken();
    try {
      const response = await axios.get(
        `${baseUrl}/move/unverified?type=company`,
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
