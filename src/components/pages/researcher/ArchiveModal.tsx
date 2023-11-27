import { FC } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
} from "@mui/material";

interface Props {
  open: boolean;
  onClose: () => void;
  handleArchiveProfile: (id: string) => Promise<void>;
  id: string;
}

export const ArchiveModal: FC<Props> = ({
  open,
  onClose,
  handleArchiveProfile,
  id,
}) => {
  const handleArchive = async () => {
    await handleArchiveProfile(id);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={"xs"}>
      <DialogTitle fontSize={22}>Archive Profile</DialogTitle>
      <DialogContent>
        <Typography fontSize={16} variant="body2">
          Are you sure you want to archive this profile?
        </Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "space-between" }}>
        <Button onClick={onClose}>Close</Button>
        <Button onClick={handleArchive} variant="outlined" color="error">
          Archive
        </Button>
      </DialogActions>
    </Dialog>
  );
};
