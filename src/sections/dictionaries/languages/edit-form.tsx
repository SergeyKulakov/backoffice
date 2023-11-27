import type { FC, KeyboardEvent } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { useFormik } from "formik";
import Link from "next/link";
import { useDispatch } from "../../../store";
import { updateLanguage } from "../../../thunks/language";
import { useRouter } from "next/router";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import useAddItemOnEnter from "../../../hooks/useAddItemOnEnter";
import AddIcon from "@mui/icons-material/Add";
import { paths } from "../../../paths";
import { Language } from "../../../types/language";
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

interface IProps {
  data: Language;
}

export const LanguageEditForm: FC<IProps> = ({ data }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  function addToAlias(formik: any) {
    const newArray = formik.values.names.concat(formik.values.alias_name);
    formik.setFieldValue("names", newArray);
    formik.setFieldValue("alias_name", "");
  }

  function removeAlias(formik: any, index: number) {
    const newValues = [...formik.values.names];
    newValues.splice(index, 1);
    formik.setFieldValue("names", newValues);
  }

  const handleEditAlias = (formik: any, newName: string, index: number) => {
    const newNames = [...formik.values.names];
    newNames[index] = newName;
    formik.setFieldValue("names", newNames);
  };

  const handleKeyDown = useAddItemOnEnter(() => addToAlias(formik));
  const handleKeyEdit = (event: KeyboardEvent<HTMLInputElement>) =>
    event.key === "Enter" ? event.preventDefault() : null;

  const formik = useFormik({
    initialValues: {
      name: data.name,
      names: data.names,
      _id: data._id,
      alias_name: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(1, "Please enter a language more than 1 character")
        .max(50, "Must be 50 characters or less")
        .required("Language is required"),
    }),
    onSubmit: async (values, helpers): Promise<void> => {
      try {
        await dispatch(updateLanguage(values)).unwrap();
        helpers.setStatus({ success: true });
        helpers.setSubmitting(false);
        toast.success("Language updated");
        await router.push(paths.dictionary.language.languageMain);
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
        <CardHeader sx={{ mb: 4 }} title="Edit Language" />
        <CardContent sx={{ pt: 0 }}>
          <Grid container spacing={3}>
            <Grid xs={12} md={6}>
              <TextField
                error={!!(formik.touched.name && formik.errors.name)}
                fullWidth
                label="Language"
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
                label="Alias name"
                name="alias_name"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.alias_name}
                onKeyDown={handleKeyDown}
              />
              <Paper>
                <MenuList>
                  {formik.values.names &&
                    formik.values.names.map((item, index: number) => (
                      <MenuItem key={index}>
                        <TextField
                          variant="standard"
                          fullWidth
                          onKeyDown={handleKeyEdit}
                          onChange={(event) =>
                            handleEditAlias(formik, event.target.value, index)
                          }
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
          <Link href={paths.dictionary.language.languageMain}>
            <Button color="inherit" disabled={formik.isSubmitting}>
              Cancel
            </Button>
          </Link>
        </Stack>
      </Card>
    </form>
  );
};
