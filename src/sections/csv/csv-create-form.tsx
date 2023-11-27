import type { FC } from "react";
import toast from "react-hot-toast";
import { useEffect } from "react";
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
import { useDispatch, useSelector } from "../../store";
import { useRouter } from "next/router";
import { SideOption, ResearcherOption, ResearcherList } from "../../types/csv";
import { UploadCsvData } from "../../types/profile";
import { uploadCsv } from "../../thunks/profileList";
import { getResearcherList } from "../../thunks/researcher";
const sideOptions: SideOption[] = [
  {
    label: "Buyside",
    value: 0,
  },
  {
    label: "Sellside",
    value: 1,
  },
];

interface Values {
  type: number;
  researcher: string;
  file: File | null;
}
interface ResearcherData {
  data: [
    {
      email?: string;
      firstName?: string;
      lastName?: string;
      role?: number;
      isActive?: boolean;
      created_at?: string;
      updated_at?: string;
      id?: string;
    }
  ];
}

const initialValues: Values = {
  type: 0,
  researcher: "",
  file: null,
};

export const CsvCreateForm: FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getResearcherList());
  }, [dispatch]);
  const researchersList = useSelector(
    (state) => state.researcher.researcherLists
  );

  const researcherListData: any = researchersList?.data;
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
        const selectedResearcher = researcherListData.find(
          (option: { id: string }) => option.id === values.researcher
        );
        const researcherId = selectedResearcher ? selectedResearcher.id : "";

        const formData = new FormData();
        formData.append("type", values.type.toString());
        formData.append("researcher", researcherId);
        if (values.file) {
          formData.append("file", values.file);
        }
        await dispatch(uploadCsv(formData as UploadCsvData)).unwrap();
        toast.success("File upload");
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
        <CardHeader title="Create CSV" />
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
                label="Select Buyside/Sellside"
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
            <Grid xs={12} md={4}>
              <TextField
                label="Assign Researcher"
                name="researcher"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                select
                SelectProps={{ native: true }}
                fullWidth
                InputLabelProps={{ shrink: true }}
              >
                {researcherListData &&
                  researcherListData.map((option: any) => (
                    <option key={option.id} value={option.id}>
                      {option.firstName + " " + option.lastName}
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
            Upload
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
