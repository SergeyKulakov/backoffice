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
import { paths } from "../../paths";
import { useDispatch } from "../../store";
import { userList } from "../../thunks/userList";
import { useRouter } from "next/router";

export type UserRole = "Admin" | "Superviser" | "Researcher" | "User";

interface Option {
  label: UserRole;
  value: number;
}

const categoryOptions: Option[] = [
  {
    label: "Admin",
    value: 0,
  },
  {
    label: "Superviser",
    value: 1,
  },
  {
    label: "Researcher",
    value: 2,
  },
  {
    label: "User",
    value: 3,
  },
];

export const UserCreateForm: FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
      role: 0,
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .matches(/^[A-Za-z ]*$/, "Please enter valid first name")
        .min(1, "Please enter a first name more than 1 character")
        .max(50, "Must be 50 characters or less")
        .required("First name is required"),
      lastName: Yup.string()
        .matches(/^[A-Za-z ]*$/, "Please enter valid last name")
        .min(1, "Please enter a last name more than 1 character")
        .max(50, "Must be 50 characters or less")
        .required("Last name is required"),
      email: Yup.string()
        .email("Must be a valid email")
        .matches(
          /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
          "Invalid email format"
        )
        .max(255)
        .required("Email is required"),
    }),
    onSubmit: async (values, helpers): Promise<void> => {
      try {
        const roleValue = Number(values.role);
        const emailValue = values.email.toLowerCase();
        const newData = { ...values, role: roleValue, email: emailValue };
        await dispatch(userList(newData)).unwrap();
        helpers.setStatus({ success: true });
        helpers.setSubmitting(false);
        toast.success("User create");
        await router.push(paths.users.index);
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
        <CardHeader title="Create User" />
        <CardContent sx={{ pt: 0 }}>
          <Grid container spacing={3}>
            <Grid xs={12} md={6}>
              <TextField
                error={!!(formik.touched.firstName && formik.errors.firstName)}
                fullWidth
                helperText={formik.touched.firstName && formik.errors.firstName}
                label="First Name"
                name="firstName"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.firstName}
              />
            </Grid>
            <Grid xs={12} md={6}>
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
            <Grid xs={12} md={6}>
              <TextField
                error={!!(formik.touched.email && formik.errors.email)}
                fullWidth
                helperText={formik.touched.email && formik.errors.email}
                label="Email address"
                name="email"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.email}
              />
            </Grid>
            <Grid xs={12} md={6}>
              <TextField
                label="User Role"
                name="role"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                select
                SelectProps={{ native: true }}
                fullWidth
              >
                {categoryOptions.map((option) => (
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
            Create
          </Button>
          <Link href={paths.users.index}>
            <Button color="inherit" disabled={formik.isSubmitting}>
              Cancel
            </Button>
          </Link>
        </Stack>
      </Card>
    </form>
  );
};
