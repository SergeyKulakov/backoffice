import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Auth from "@aws-amplify/auth";
import { UploadCsvData } from "../types/profile";
import { baseUrl } from "../config";

export const uploadCsv = createAsyncThunk(
  "uploadCsv",
  async (data: UploadCsvData, { rejectWithValue }) => {
    const session = await Auth.currentSession();
    const tokenId = session.getIdToken().getJwtToken();
    try {
      await axios.put(`${baseUrl}/profile`, data, {
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
