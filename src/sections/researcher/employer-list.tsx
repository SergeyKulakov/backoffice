import React, { FC, useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Box,
  Typography,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { CurrentEmployment } from "../../types/researcher";

const label = { inputProps: { "aria-label": "Checkbox" } };

interface IProps {
  data: CurrentEmployment[];
  formikUpdate?: any;
}

export const EmployerList: FC<IProps> = ({ data, formikUpdate }) => {
  const [updatedData, setUpdatedData] = useState(data);

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

  const handleCheckbox = (index: number, key: string) => {
    setUpdatedData((prevState) => {
      const newState = [...prevState];
      newState[index] = {
        ...newState[index],
        [key]: {
          ...newState[index][key],
          isMarked: !newState[index][key].isMarked,
        },
      };
      formikUpdate &&
        formikUpdate.setFieldValue("info.currentEmployment", newState);
      return newState;
    });
  };
  const showButton = updatedData.length > 1;

  useEffect(() => {
    const filteredData = data.filter(
      (item) => item.endDate.value.year === null
    );
    setUpdatedData(filteredData);
  }, [data]);

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
            <Checkbox
              {...label}
              sx={{ mr: 3, height: 40 }}
              checked={item.companyName.isMarked}
              onChange={() => handleCheckbox(index, "companyName")}
            />
            <Typography variant="h5" sx={{ color: "#5a5a5a" }} display="flex">
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
            <Checkbox
              {...label}
              sx={{ mr: 3, height: 40 }}
              checked={item.title.isMarked}
              onChange={() => handleCheckbox(index, "title")}
            />
            <Typography variant="h5" sx={{ color: "#5a5a5a" }} display="flex">
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
              <Checkbox
                {...label}
                sx={{ mr: 3, height: 40 }}
                checked={item.location.isMarked}
                onChange={() => handleCheckbox(index, "location")}
              />
              <Typography variant="h5" sx={{ color: "#5a5a5a" }} display="flex">
                Location:
                <Typography variant="h5" sx={{ ml: 5 }} fontWeight={600}>
                  {item.location.value}
                </Typography>
              </Typography>
            </Grid>
          )}
          <Grid xs={12} display="flex" alignItems="center" sx={{ ml: "72px" }}>
            <Typography variant="h5" sx={{ color: "#5a5a5a" }} display="flex">
              Start Date:
              <Typography variant="h5" sx={{ ml: 5 }} fontWeight={600}>
                {item.startDate.value.month && item.startDate.value.month + "/"}
                {item.startDate.value.year}
              </Typography>
            </Typography>
          </Grid>
          <Grid xs={12} display="flex" alignItems="center" sx={{ ml: "72px" }}>
            <Typography variant="h5" sx={{ color: "#5a5a5a" }} display="flex">
              End Date:
              {item.endDate.value.year ? (
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
