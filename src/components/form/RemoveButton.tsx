import React from "react";
import { Tooltip, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

type Props = {
  onClick: () => void;
};

const RemoveButton: React.FC<Props> = ({ onClick }) => {
  return (
    <Tooltip title="Remove">
      <IconButton
        sx={{ width: "40px", height: "40px", ml: 3 }}
        onClick={onClick}
      >
        <DeleteIcon />
      </IconButton>
    </Tooltip>
  );
};

export default RemoveButton;
