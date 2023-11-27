import React from "react";
import { Tooltip, IconButton } from "@mui/material";
import PlusIcon from "@untitled-ui/icons-react/build/esm/Plus";

type Props = {
  onClick: () => void;
};

const RemoveButton: React.FC<Props> = ({ onClick }) => {
  return (
    <Tooltip title="+Add">
      <IconButton
        sx={{ width: "40px", height: "40px", ml: 3 }}
        onClick={onClick}
      >
        <PlusIcon />
      </IconButton>
    </Tooltip>
  );
};

export default RemoveButton;
