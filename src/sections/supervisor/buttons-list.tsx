import { FC } from "react";
import { Unstable_Grid2 as Grid, Button, SvgIcon } from "@mui/material";

import { ButtonsData } from "../../types/supervisor";
import PlusIcon from "@untitled-ui/icons-react/build/esm/Plus";

interface IProps {
  data: ButtonsData[];
}

export const ButtonsList: FC<IProps> = ({ data }) => {
  return (
    <>
      {data.map((buttonData) => (
        <Grid
          xs={12}
          my={3}
          display="flex"
          justifyContent="end"
          key={buttonData.id}
        >
          <Button
            startIcon={
              <SvgIcon>
                <PlusIcon />
              </SvgIcon>
            }
            variant="contained"
          >
            {buttonData.title}
          </Button>
        </Grid>
      ))}
    </>
  );
};
