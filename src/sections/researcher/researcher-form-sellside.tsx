import React, { FC, useState } from "react";
import toast from "react-hot-toast";
import styled from "@emotion/styled";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "../../store";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Stack,
  Divider as MuiDivider,
  Checkbox,
  Typography,
  Box,
  TextField,
  FormControlLabel,
  Unstable_Grid2 as Grid,
  SvgIcon,
} from "@mui/material";
const Divider = styled(MuiDivider)(spacing);
import { spacing } from "@mui/system";
import { DatePicker } from "@mui/x-date-pickers";
import { paths } from "../../paths";
import { GenderOption, MockOption, Values } from "../../types/researcher";
import { dataEducation } from "../../mocks/researcher";
import PlusIcon from "@untitled-ui/icons-react/build/esm/Plus";
import { EducationList } from "./education-list";

const label = { inputProps: { "aria-label": "Checkbox" } };

const genderOptions: GenderOption[] = [
  {
    label: "Male",
    value: 0,
  },
  {
    label: "Female",
    value: 1,
  },
];

const mockOptions: MockOption[] = [
  {
    label: "Mock Text",
    value: 0,
  },
];

const initialValues: Values = {
  type: 0,
  firstName: "John",
  lastName: "Locke",
  gender: "male",
  joined: Date.now(),
};

export const ResearcherFormSellside: FC = () => {
  const router = useRouter();
  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({}),
    onSubmit: async (values, helpers): Promise<void> => {
      try {
        toast.success("Success");
        await router.push(paths.csv.upload);
      } catch (err) {
        console.log(err);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Card>
        <CardHeader
          titleTypographyProps={{ variant: "h2" }}
          title="Researcher Validation queue"
        />
        <CardContent sx={{ pt: 0 }}>
          <Grid container spacing={3} rowGap={3}>
            <Grid xs={4}>
              <Grid xs={12} my={5}>
                <Box
                  component="img"
                  sx={{
                    width: "150px",
                    height: "150px",
                  }}
                  alt="Profile image."
                  src="https://via.placeholder.com/150x150"
                />
              </Grid>
              <Grid xs={12} display="flex">
                <Checkbox {...label} sx={{ mr: 3 }} />
                <TextField
                  error={
                    !!(formik.touched.firstName && formik.errors.firstName)
                  }
                  fullWidth
                  helperText={
                    formik.touched.firstName && formik.errors.firstName
                  }
                  label="First Name"
                  name="firstName"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.firstName}
                />
              </Grid>
              <Grid xs={12} display="flex">
                <Checkbox {...label} sx={{ mr: 3 }} />
                <TextField
                  error={!!(formik.touched.lastName && formik.errors.lastName)}
                  fullWidth
                  helperText={formik.touched.lastName && formik.errors.lastName}
                  label="Last Name"
                  name="lastName"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.lastName}
                />
              </Grid>
              <Grid xs={12} display="flex">
                <Checkbox {...label} sx={{ mr: 3 }} />
                <TextField
                  label="Suggested teams primary"
                  name="team_primary"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  select
                  SelectProps={{ native: true }}
                  fullWidth
                >
                  {mockOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid xs={12} display="flex">
                <Checkbox {...label} sx={{ mr: 3 }} />
                <TextField
                  label="Select Gender"
                  name="gender"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  select
                  SelectProps={{ native: true }}
                  fullWidth
                >
                  {genderOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid xs={12} my={3} display="flex" justifyContent="end">
                <Button
                  startIcon={
                    <SvgIcon>
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                >
                  Add secondary team
                </Button>
              </Grid>
              <Grid xs={12} display="flex">
                <Checkbox {...label} sx={{ mr: 3 }} />
                <DatePicker
                  inputFormat="dd/MM/yyyy"
                  label="When started 1st sellside role"
                  onChange={() => {}}
                  renderInput={(inputProps) => (
                    <TextField {...inputProps} fullWidth />
                  )}
                  value={new Date()}
                />
              </Grid>
              <Grid xs={12} display="flex">
                <Checkbox {...label} sx={{ mr: 3 }} />
                <DatePicker
                  inputFormat="dd/MM/yyyy"
                  label="When joined current employer"
                  onChange={() => {}}
                  renderInput={(inputProps) => (
                    <TextField {...inputProps} fullWidth />
                  )}
                  value={new Date()}
                />
              </Grid>
              <Grid xs={12} display="flex" justifyContent="end">
                <FormControlLabel
                  control={<Checkbox />}
                  label="Same as above role"
                />
              </Grid>
            </Grid>
            <Grid xs={8} />
          </Grid>
          <Typography variant="h4" mt={15} mb={6}>
            Education
          </Typography>
          {/* <EducationList data={dataEducation} /> */}
        </CardContent>
        <Stack
          direction={{
            xs: "column",
            sm: "row",
          }}
          flexWrap="wrap"
          spacing={3}
          sx={{ p: 3 }}
        >
          <Button
            disabled={formik.isSubmitting}
            type="submit"
            variant="contained"
          >
            Update
          </Button>
          <Button variant="outlined">Dismiss a profile</Button>
          <Link href={paths.csv.upload}>
            <Button color="inherit" disabled={formik.isSubmitting}>
              Cancel
            </Button>
          </Link>
        </Stack>
      </Card>
    </form>
  );
};
