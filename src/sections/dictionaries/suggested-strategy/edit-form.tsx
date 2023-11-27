import type { FC } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { useFormik } from "formik";
import Link from "next/link";
import { useDispatch } from "../../../store";
import { updateStrategy } from "../../../thunks/suggestedStrategy";
import { useRouter } from "next/router";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";
import { paths } from "../../../paths";
import { Suggested } from "../../../types/suggested-strategy";
import useAddItemOnEnter from "../../../hooks/useAddItemOnEnter";
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
  data: Suggested;
}

export const EditForm: FC<IProps> = ({ data }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  function addItem() {
    const newArr = { name: formik.values.strategy_name };
    const concatArr = formik.values.substrategies.concat(newArr);
    formik.setFieldValue("substrategies", concatArr);
    formik.setFieldValue("strategy_name", "");
  }

  function removeItem(name: string) {
    const newArr = formik.values.substrategies.filter(
      (obj: any) => obj.name !== name
    );
    formik.setFieldValue("substrategies", newArr);
  }

  const handleKeyDown = useAddItemOnEnter(() => addItem());
  const handleKeyEdit = (event: KeyboardEvent<HTMLInputElement>) =>
    event.key === "Enter" ? event.preventDefault() : null;

  const handleEditItem = (newName: string, index: number) => {
    formik.setFieldValue(`substrategies.${index}.name`, newName);
  };

  const formik = useFormik({
    initialValues: {
      name: data.name,
      substrategies: data.substrategies,
      _id: data._id,
      strategy_name: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(1, "Please enter a suggested strategy more than 1 character")
        .max(50, "Must be 50 characters or less")
        .required("suggested strategy is required"),
    }),
    onSubmit: async (values, helpers): Promise<void> => {
      try {
        await dispatch(updateStrategy(values)).unwrap();
        helpers.setStatus({ success: true });
        helpers.setSubmitting(false);
        toast.success("Suggested strategy updated");
        await router.push(paths.dictionary.suggestedStrategy.index);
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
        <CardHeader sx={{ mb: 4 }} title="Edit suggested strategy" />
        <CardContent sx={{ pt: 0 }}>
          <Grid container spacing={3}>
            <Grid xs={12} md={6}>
              <TextField
                error={!!(formik.touched.name && formik.errors.name)}
                fullWidth
                label="Suggested strategy name"
                name="name"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.name}
              />
            </Grid>
            <Grid xs={12} md={6}>
              <TextField
                error={
                  !!(
                    formik.touched.strategy_name && formik.errors.strategy_name
                  )
                }
                fullWidth
                helperText={
                  formik.touched.strategy_name && formik.errors.strategy_name
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => addItem()}>
                        <AddIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                label="Create sub strategy"
                name="strategy_name"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.strategy_name}
                onKeyDown={handleKeyDown}
              />
              <Paper>
                <MenuList>
                  {formik.values.substrategies &&
                    formik.values.substrategies.map((item, index: number) => (
                      <MenuItem key={index}>
                        <TextField
                          variant="standard"
                          fullWidth
                          onChange={(event) =>
                            handleEditItem(event.target.value, index)
                          }
                          onKeyDown={handleKeyEdit}
                          InputProps={{
                            disableUnderline: true,
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={() => removeItem(item.name)}
                                >
                                  <Tooltip title="Remove strategy name">
                                    <DeleteOutlineIcon />
                                  </Tooltip>
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                          value={item.name}
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
          <Link href={paths.dictionary.suggestedStrategy.index}>
            <Button color="inherit" disabled={formik.isSubmitting}>
              Cancel
            </Button>
          </Link>
        </Stack>
      </Card>
    </form>
  );
};
