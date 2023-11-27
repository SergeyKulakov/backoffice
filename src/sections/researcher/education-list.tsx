import React, { FC, useState, useEffect } from "react";
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
import { Education } from "../../types/researcher";

const label = { inputProps: { "aria-label": "Checkbox" } };

interface IProps {
  data: Education[];
  formikUpdate?: any;
}

export const EducationList: FC<IProps> = ({ data, formikUpdate }) => {
  const [isHide, setIsHide] = useState<boolean[]>(data.map(() => false));
  const [updatedData, setUpdatedData] = useState<Education[]>(data);

  const handleButtonClick = (index: number) => {
    setIsHide((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };

  useEffect(() => {
    const updated = data.map((item, index) => ({
      ...item,
      isHidden: isHide[index],
    }));

    formikUpdate && formikUpdate.setFieldValue("info.education", updated);
  }, [isHide]);

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
      formikUpdate && formikUpdate.setFieldValue("info.education", newState);
      return newState;
    });
  };

  useEffect(() => {
    setUpdatedData(data);
  }, [data]);

  return (
    <>
      {data.map((item, index: number) => (
        <Grid
          container
          key={index}
          spacing={3}
          rowGap={3}
          sx={{
            backgroundColor: isHide[index] ? "#ebebeb" : "#fff",
            py: 5,
            mb: 5,
          }}
          borderRadius={2}
          position="relative"
        >
          <Box mt={2} position="absolute" right={20}>
            <Button
              onClick={() => handleButtonClick(index)}
              color="primary"
              variant="contained"
              sx={{ width: 100, height: 35 }}
            >
              {isHide[index] ? "Show" : "Hide"}
            </Button>
          </Box>
          <Grid
            xs={12}
            display="flex"
            alignItems="center"
            sx={{ ml: "15px", my: -2, maxWidth: "45vw" }}
          >
            <Checkbox
              {...label}
              sx={{ mr: 3, height: 40 }}
              onChange={() => handleCheckbox(index, "university")}
            />
            <Typography variant="h5" sx={{ color: "#5a5a5a" }} display="flex">
              University:
              <Typography variant="h5" sx={{ ml: 5 }} fontWeight={600}>
                {item.university.value}
              </Typography>
            </Typography>
          </Grid>
          {item.degreeType && (
            <Grid
              xs={12}
              display="flex"
              alignItems="center"
              sx={{ ml: "45px", my: -2 }}
            >
              <Checkbox
                {...label}
                sx={{ mr: 3, height: 40 }}
                onChange={() => handleCheckbox(index, "degreeType")}
              />
              <Typography variant="h5" sx={{ color: "#5a5a5a" }} display="flex">
                Degree Type:
                <Typography variant="h5" sx={{ ml: 5 }} fontWeight={600}>
                  {item.degreeType.value}
                </Typography>
              </Typography>
            </Grid>
          )}
          {item.subject && (
            <Grid
              xs={12}
              display="flex"
              alignItems="center"
              sx={{ ml: "45px", my: -2 }}
            >
              <Checkbox
                {...label}
                sx={{ mr: 3, height: 40 }}
                onChange={() => handleCheckbox(index, "subject")}
              />
              <Typography variant="h5" sx={{ color: "#5a5a5a" }} display="flex">
                Subject:
                <Typography variant="h5" sx={{ ml: 5 }} fontWeight={600}>
                  {item.subject.value}
                </Typography>
              </Typography>
            </Grid>
          )}
          {item.startDate.value.year && (
            <Grid
              xs={12}
              display="flex"
              alignItems="center"
              sx={{ ml: "98px" }}
            >
              <Typography variant="h5" sx={{ color: "#5a5a5a" }} display="flex">
                Start Date:
                <Typography variant="h5" sx={{ ml: 5 }} fontWeight={600}>
                  {item.startDate.value.month &&
                    item.startDate.value.month + "/"}
                  {item.startDate.value.year}
                </Typography>
              </Typography>
            </Grid>
          )}
          {item.endDate.value.year && (
            <Grid
              xs={12}
              display="flex"
              alignItems="center"
              sx={{ ml: "98px" }}
            >
              <Typography variant="h5" sx={{ color: "#5a5a5a" }} display="flex">
                End Date:
                <Typography variant="h5" sx={{ ml: 5 }} fontWeight={600}>
                  {item.endDate.value.month && item.endDate.value.month + "/"}
                  {item.endDate.value.year}
                </Typography>
              </Typography>
            </Grid>
          )}
        </Grid>
      ))}
    </>
  );
};
