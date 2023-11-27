import type { FC } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { useFormik } from "formik";
import Link from "next/link";
import { useDispatch } from "../../../store";
import { useRouter } from "next/router";
import { paths } from "../../../paths";
import { createDiversity } from "../../../thunks/diversity";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Stack,
  TextField,
  Unstable_Grid2 as Grid,
} from "@mui/material";

export const DiversityCreateForm: FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      name: "",
      alias_name: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(1, "Please enter a diversity more than 1 character")
        .max(50, "Must be 50 characters or less")
        .required("Diversity is required"),
    }),
    onSubmit: async (values, helpers): Promise<void> => {
      try {
        await dispatch(createDiversity(values)).unwrap();
        helpers.setStatus({ success: true });
        helpers.setSubmitting(false);
        toast.success("Diversity created");
        await router.push(paths.dictionary.diversity.index);
      } catch (err) {
        // @ts-ignore
        toast.error(err.message[0]);
        helpers.setStatus({ success: false });
        helpers.setSubmitting(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Card>
        <CardHeader sx={{ mb: 4 }} title="Create Diversity" />
        <CardContent sx={{ pt: 0 }}>
          <Grid container spacing={3}>
            <Grid xs={12} md={4}>
              <TextField
                error={!!(formik.touched.name && formik.errors.name)}
                fullWidth
                helperText={formik.touched.name && formik.errors.name}
                label="Diversity"
                name="name"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.name}
              />
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
            Create
          </Button>
          <Link href={paths.dictionary.diversity.index}>
            <Button color="inherit" disabled={formik.isSubmitting}>
              Cancel
            </Button>
          </Link>
        </Stack>
      </Card>
    </form>
  );
};
