import type { FC } from "react";
import { Toaster as HotToaster } from "react-hot-toast";
import { useTheme } from "@mui/material/styles";

export const Toaster: FC = () => {
  const theme = useTheme();

  return (
    <HotToaster
      position="bottom-right"
      toastOptions={{
        duration: 6000,
        style: {
          backdropFilter: "blur(6px)",
        },
      }}
    />
  );
};
