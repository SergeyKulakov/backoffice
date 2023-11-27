import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "../types/suggested-team";
import {
  getAllSuggestedTeam,
  getOneSuggestedTeam,
} from "../thunks/suggested-team";

const initialState: AuthState = {
  isFetching: false,
  isSuccess: false,
  isError: false,
  suggestedTeam: null,
  suggestedTeamItem: null,
  errorMessage: null,
};

export const slice = createSlice({
  name: "team",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllSuggestedTeam.pending, (state) => {
        state.isSuccess = false;
        state.errorMessage = null;
      })
      .addCase(getAllSuggestedTeam.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.suggestedTeam = action.payload;
      })
      .addCase(getAllSuggestedTeam.rejected, (state, action) => {
        state.isSuccess = false;
        state.errorMessage = action.error.message;
      })
      .addCase(getOneSuggestedTeam.pending, (state) => {
        state.isSuccess = false;
        state.errorMessage = null;
      })
      .addCase(getOneSuggestedTeam.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.suggestedTeamItem = action.payload;
      })
      .addCase(getOneSuggestedTeam.rejected, (state, action) => {
        state.isSuccess = false;
        state.errorMessage = action.error.message;
      });
  },
});

export const { reducer } = slice;
