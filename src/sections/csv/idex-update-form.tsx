import type { FC } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { useFormik } from "formik";
import Link from "next/link";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Stack,
  TextField,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { MuiFileInput } from "mui-file-input";
import { paths } from "../../paths";
import { useDispatch } from "../../store";
import { useRouter } from "next/router";
import { IndexOption } from "../../types/csv";

const sideOptions: IndexOption[] = [
  {
    label: "Language",
    value: 0,
  },
  {
    label: "Location",
    value: 1,
  },
  {
    label: "Degree/Education type",
    value: 2,
  },
  {
    label: "University",
    value: 3,
  },
  {
    label: "Sellside Companies",
    value: 4,
  },
  {
    label: "Buyside Companies",
    value: 5,
  },
];

interface Values {
  type: number;
  file: File | null;
}

const initialValues: Values = {
  type: 0,
  file: null,
};

export const IndexUpdateForm: FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      file: Yup.mixed()
        .required("A file is required")
        .test("fileSize", "File size is too large", (value: any) => {
          return value && value?.size <= 5000000;
        })
        .test("fileFormat", "Only .csv files are allowed", (value: any) => {
          return value && ["text/csv"].includes(value!.type);
        }),
    }),
    onSubmit: async (values, helpers): Promise<void> => {
      try {
        // TODO  - post data
        toast.success("File update");
        await router.push(paths.csv.upload);
      } catch (err) {
        // @ts-ignore
        toast.error(err.message[0]);
        console.error("Registration failed:", err);
        helpers.setStatus({ success: false });
        helpers.setSubmitting(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Card>
        <CardHeader sx={{ mb: 3 }} title="Index Update CSV" />
        <CardContent sx={{ pt: 0 }}>
          <Grid container spacing={3}>
            <Grid xs={12} md={4}>
              <MuiFileInput
                label="CSV Upload"
                name="file"
                value={formik.values.file}
                onChange={(newValue) => {
                  formik.setFieldValue("file", newValue);
                }}
                error={!!(formik.touched.file && formik.errors.file)}
                fullWidth
                helperText={formik.touched.file && formik.errors.file}
              />
            </Grid>
            <Grid xs={12} md={4}>
              <TextField
                label="Index type"
                name="type"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                select
                SelectProps={{ native: true }}
                fullWidth
              >
                {sideOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
          </Grid>
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
