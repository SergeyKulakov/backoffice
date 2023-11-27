import type { FC } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { useFormik } from "formik";
import Link from "next/link";
import { useDispatch } from "../../../store";
import { useRouter } from "next/router";
import { paths } from "../../../paths";
import { createCompanyType } from "../../../thunks/companyTypes";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import useAddItemOnEnter from "../../../hooks/useAddItemOnEnter";

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Stack,
  MenuList,
  MenuItem,
  Paper,
  TextField,
  Unstable_Grid2 as Grid,
  InputAdornment,
  ListItemText,
  ListItemIcon,
  IconButton,
} from "@mui/material";

export const CompanyTypeCreateForm: FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  function addToAlias(formik: any) {
    const newArray = formik.values.subtypes.concat(formik.values.alias_name);
    formik.setFieldValue("subtypes", newArray);
    formik.setFieldValue("alias_name", "");
  }

  function removeAlias(formik: any, index: number) {
    const newValues = [...formik.values.subtypes];
    newValues.splice(index, 1);
    formik.setFieldValue("subtypes", newValues);
  }

  const handleKeyDown = useAddItemOnEnter(() => addToAlias(formik));

  const formik = useFormik({
    initialValues: {
      name: "",
      subtypes: [],
      alias_name: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(1, "Please enter a comaony name more than 1 character")
        .max(50, "Must be 50 characters or less")
        .required("Company name is required"),
    }),
    onSubmit: async (values, helpers): Promise<void> => {
      try {
        await dispatch(createCompanyType(values)).unwrap();
        helpers.setStatus({ success: true });
        helpers.setSubmitting(false);
        toast.success("Company type created");
        await router.push(paths.dictionary.companyType.index);
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
        <CardHeader sx={{ mb: 4 }} title="Create Company Type" />
        <CardContent sx={{ pt: 0 }}>
          <Grid container spacing={3}>
            <Grid xs={12} md={6}>
              <TextField
                error={!!(formik.touched.name && formik.errors.name)}
                fullWidth
                helperText={formik.touched.name && formik.errors.name}
                label="Company name"
                name="name"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.name}
              />
            </Grid>
            <Grid xs={12} md={6}>
              <TextField
                error={
                  !!(formik.touched.alias_name && formik.errors.alias_name)
                }
                fullWidth
                helperText={
                  formik.touched.alias_name && formik.errors.alias_name
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => addToAlias(formik)}>
                        <AddIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                label="Sub type"
                name="alias_name"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.alias_name}
                onKeyDown={handleKeyDown}
              />
              <Paper>
                <MenuList>
                  {formik.values.subtypes &&
                    formik.values.subtypes.map((item, index) => (
                      <MenuItem key={index}>
                        <ListItemText>{item}</ListItemText>
                        <ListItemIcon>
                          <DeleteOutlineIcon
                            onClick={() => removeAlias(formik, index)}
                          />
                        </ListItemIcon>
                      </MenuItem>
                    ))}
                </MenuList>
              </Paper>
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
          <Link href={paths.dictionary.companyType.index}>
            <Button color="inherit" disabled={formik.isSubmitting}>
              Cancel
            </Button>
          </Link>
        </Stack>
      </Card>
    </form>
  );
};
