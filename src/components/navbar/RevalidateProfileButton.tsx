import { Button, Stack } from "@mui/material";
import { AsyncThunkAction } from "@reduxjs/toolkit";
import React from "react";
import { useDispatch } from "../../store";
import { revalidateProfiles } from "../../thunks/revalidate";

const RevalidateProfileButton: React.FC = () => {
  const dispatch = useDispatch();
  const handleRevalidateProfile = async () => {
    await dispatch(revalidateProfiles());
  };

  return (
    <Stack
      spacing={3}
      sx={{
        p: 3,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button
        variant="contained"
        fullWidth={true}
        onClick={handleRevalidateProfile}
        sx={{ width: "150px" }}
      >
        Re-validate
      </Button>
    </Stack>
  );
};

export default RevalidateProfileButton;
