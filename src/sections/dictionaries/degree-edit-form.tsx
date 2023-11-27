import type { FC } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { useFormik } from "formik";
import Link from "next/link";
import { useDispatch } from "../../store";
import { updateDegreeTypes } from "../../thunks/degree";
import { useRouter } from "next/router";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";
import { paths } from "../../paths";
import { Degree } from "../../types/degree";
import useAddItemOnEnter from "../../hooks/useAddItemOnEnter";

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Tooltip,
  Stack,
  MenuList,
  MenuItem,
  Paper,
  TextField,
  Unstable_Grid2 as Grid,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { KeyboardEvent } from "react";

interface IProps {
  data: Degree;
}

export const DegreeEditForm: FC<IProps> = ({ data }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  function addToAlias(formik: any) {
    const newArray = formik.values.degree_names.concat(
      formik.values.alias_name
    );
    formik.setFieldValue("degree_names", newArray);
    formik.setFieldValue("alias_name", "");
  }

  function removeAlias(formik: any, index: number) {
    const newValues = [...formik.values.degree_names];
    newValues.splice(index, 1);
    formik.setFieldValue("degree_names", newValues);
  }

  const handleEditAlias = (formik: any, newName: string, index: number) => {
    const newNames = [...formik.values.degree_names];
    newNames[index] = newName;
    formik.setFieldValue("degree_names", newNames);
  };

  const handleKeyDown = useAddItemOnEnter(() => addToAlias(formik));
  const handleKeyEdit = (event: KeyboardEvent<HTMLInputElement>) =>
    event.key === "Enter" ? event.preventDefault() : null;

  const formik = useFormik({
    initialValues: {
      degree_name: data.degree_name,
      degree_names: data.degree_names,
      _id: data._id,
      alias_name: "",
    },
    validationSchema: Yup.object({
      degree_name: Yup.string()
        .min(1, "Please enter a degree name more than 1 character")
        .max(50, "Must be 50 characters or less")
        .required("Degree name is required"),
    }),
    onSubmit: async (values, helpers): Promise<void> => {
      try {
        await dispatch(updateDegreeTypes(values)).unwrap();
        helpers.setStatus({ success: true });
        helpers.setSubmitting(false);
        toast.success("Degree type updated");
        await router.push(paths.dictionary.degreeMain);
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
        <CardHeader sx={{ mb: 4 }} title="Edit Degree Type" />
        <CardContent sx={{ pt: 0 }}>
          <Grid container spacing={3}>
            <Grid xs={12} md={6}>
              <TextField
                error={
                  !!(formik.touched.degree_name && formik.errors.degree_name)
                }
                fullWidth
                label="Degree type"
                name="degree_name"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.degree_name}
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
                label="Alias name"
                name="alias_name"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.alias_name}
                onKeyDown={handleKeyDown}
              />
              <Paper>
                <MenuList>
                  {formik.values.degree_names &&
                    formik.values.degree_names.map((item, index: number) => (
                      <MenuItem key={index}>
                        <TextField
                          variant="standard"
                          fullWidth
                          onChange={(event) =>
                            handleEditAlias(formik, event.target.value, index)
                          }
                          onKeyDown={handleKeyEdit}
                          InputProps={{
                            disableUnderline: true,
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="password visibility"
                                  onClick={() => removeAlias(formik, index)}
                                >
                                  <Tooltip title="Remove alias">
                                    <DeleteOutlineIcon
                                      onClick={() => removeAlias(formik, index)}
                                    />
                                  </Tooltip>
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                          value={item}
                        />
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
            Update
          </Button>
          <Link href={paths.dictionary.degreeMain}>
            <Button color="inherit" disabled={formik.isSubmitting}>
              Cancel
            </Button>
          </Link>
        </Stack>
      </Card>
    </form>
  );
};
