import React, { FC, useState } from "react";
import styled from "@emotion/styled";
import {
  Divider as MuiDivider,
  Checkbox,
  Typography,
  FormControlLabel,
  FormGroup,
  Box,
  Unstable_Grid2 as Grid,
} from "@mui/material";

const Divider = styled(MuiDivider)(spacing);
import { spacing } from "@mui/system";
import { NotificationData } from "../../types/supervisor";

const label = { inputProps: { "aria-label": "Checkbox" } };

interface IProps {
  data: NotificationData[];
}

export const NotificationList: FC<IProps> = ({ data }) => {
  return (
    <Grid container spacing={3} rowGap={3} mb={5}>
      {data.map((item) => (
        <Grid key={item.id} xs={12}>
          <Typography variant="h3" fontSize={22} mb={4}>
            {item.title}
          </Typography>
          {item.blockInfo.map((el) => (
            <Box key={el.id} mb={5}>
              <Box display="flex" alignItems="center" mb={2}>
                <Typography fontSize={15} variant="h6">
                  {el.name} -
                </Typography>
                <Typography
                  fontSize={15}
                  variant="h6"
                  sx={{ ml: 1 }}
                  color="#908989"
                >
                  {el.description}
                </Typography>
              </Box>
              <FormGroup>
                {el.checkbox &&
                  el.checkbox.map((el) => (
                    <FormControlLabel
                      key={el.id}
                      control={
                        <Checkbox {...label} sx={{ mr: 3, height: "40px" }} />
                      }
                      label={el.name}
                    />
                  ))}
              </FormGroup>
            </Box>
          ))}
        </Grid>
      ))}
      <Divider mb={6} />
    </Grid>
  );
};
