import React, { FC, useState } from "react";
import styled from "@emotion/styled";
import {
  Button,
  Divider as MuiDivider,
  Checkbox,
  Box,
  Typography,
  Unstable_Grid2 as Grid,
} from "@mui/material";
const Divider = styled(MuiDivider)(spacing);
import { spacing } from "@mui/system";
import { Сareer } from "../../types/supervisor";

interface IProps {
  data: Сareer[];
  formikUpdate?: any;
  profileType?: string;
}

export const CarrierList: FC<IProps> = ({
  data,
  formikUpdate,
  profileType,
}) => {
  const [updatedData, setUpdatedData] = useState(
    data.filter((item) => item.endDate.value.year === null)
  );

  const showButton = profileType !== "SELLSIDE" && updatedData.length > 1;

  const handleButtonClick = (index: number) => {
    const newData = updatedData.map((item, i) => {
      if (i === index) {
        return {
          ...item,
          isPrimarySelected: true,
        };
      } else if (item.isPrimarySelected) {
        return {
          ...item,
          isPrimarySelected: false,
        };
      }
      return item;
    });
    formikUpdate &&
      formikUpdate.setFieldValue("info.currentEmployment", newData);
    setUpdatedData(newData);
  };

  return (
    <>
      {updatedData.map((item, index: number) => (
        <Grid
          key={index}
          container
          spacing={3}
          rowGap={3}
          borderRadius={2}
          position="relative"
          sx={{
            backgroundColor: item.isPrimarySelected ? "#ebebeb" : "#fff",
            py: 5,
            mb: 5,
          }}
        >
          <Box mt={2} position="absolute" right={20}>
            {showButton && (
              <Button
                onClick={() => handleButtonClick(index)}
                color="primary"
                variant="contained"
              >
                {!item.isPrimarySelected ? "Select" : "Unselect"} primary
              </Button>
            )}
          </Box>
          <Grid
            xs={12}
            display="flex"
            alignItems="center"
            mt={-2}
            maxWidth="45vw"
          >
            <Typography
              variant="h5"
              sx={{
                color: "#5a5a5a",
                padding: "2px",
                borderRadius: "5px",
              }}
              display="flex"
            >
              Company:
              <Typography variant="h5" sx={{ ml: 5 }} fontWeight={600}>
                {item.companyName.value}
              </Typography>
            </Typography>
          </Grid>
          <Grid
            xs={12}
            display="flex"
            alignItems="center"
            sx={{ ml: "20px", my: -2 }}
          >
            <Typography
              variant="h5"
              sx={{
                color: "#5a5a5a",
                padding: "2px",
                borderRadius: "5px",
              }}
              display="flex"
            >
              Job Title:
              <Typography variant="h5" sx={{ ml: 5 }} fontWeight={600}>
                {item.title.value}
              </Typography>
            </Typography>
          </Grid>
          {item.location && (
            <Grid
              xs={12}
              display="flex"
              alignItems="center"
              sx={{ ml: "20px", my: -2 }}
            >
              <Typography
                variant="h5"
                sx={{
                  color: "#5a5a5a",
                  padding: "2px",
                  borderRadius: "5px",
                }}
                display="flex"
              >
                Location:
                <Typography variant="h5" sx={{ ml: 5 }} fontWeight={600}>
                  {item.location.value}
                </Typography>
              </Typography>
            </Grid>
          )}
          <Grid xs={12} display="flex" alignItems="center" sx={{ ml: "20px" }}>
            <Typography variant="h5" sx={{ color: "#5a5a5a" }} display="flex">
              Start Date:
              <Typography variant="h5" sx={{ ml: 5 }} fontWeight={600}>
                {item.startDate.value.month && item.startDate.value.month + "/"}
                {item.startDate.value.year}
              </Typography>
            </Typography>
          </Grid>
          <Grid xs={12} display="flex" alignItems="center" sx={{ ml: "20px" }}>
            <Typography variant="h5" sx={{ color: "#5a5a5a" }} display="flex">
              End Date:
              {item.endDate.value.month ? (
                <Typography variant="h5" sx={{ ml: 5 }} fontWeight={600}>
                  {item.startDate.value.month && item.endDate.value.month + "/"}
                  {item.endDate.value.year}
                </Typography>
              ) : (
                <Typography variant="h5" sx={{ ml: 5 }} fontWeight={600}>
                  Present
                </Typography>
              )}
            </Typography>
          </Grid>
        </Grid>
      ))}
    </>
  );
};
