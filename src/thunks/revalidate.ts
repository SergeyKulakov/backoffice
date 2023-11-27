import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Auth from "@aws-amplify/auth";
import { baseUrl } from "../config";

export const revalidateProfiles = createAsyncThunk(
  "revalidateProfiles",
  async (rejectWithValue) => {
    const session = await Auth.currentSession();
    const tokenId = session.getIdToken().getJwtToken();
    try {
      await axios.patch(
        `${baseUrl}/profile/revalidate`,
        {},
        {
          headers: {
            Authorization: `Bearer ${tokenId}`,
          },
        }
      );
    } catch (err) {
      // @ts-ignore
      return rejectWithValue(err.response.data);
    }
  }
);
