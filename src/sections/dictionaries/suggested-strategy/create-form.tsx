import type { FC } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { useFormik } from "formik";
import Link from "next/link";
import { useDispatch } from "../../../store";
import { useRouter } from "next/router";
import { paths } from "../../../paths";
import { createStrategy } from "../../../thunks/suggestedStrategy";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
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
import useAddItemOnEnter from "../../../hooks/useAddItemOnEnter";

export const CreateForm: FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  function addItem(formik: any) {
    const newArr = { name: formik.values.strategy_name };
    formik.values.substrategies.push(newArr);
    formik.setFieldValue("strategy_name", "");
  }

  function removeItem(formik: any, name: string) {
    const newArr = formik.values.substrategies.filter(
      (obj: any) => obj.name !== name
    );
    formik.setFieldValue("substrategies", newArr);
  }

  const handleKeyDown = useAddItemOnEnter(() => addItem(formik));

  const formik = useFormik({
    initialValues: {
      name: "",
      substrategies: [],
      strategy_name: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(1, "Please enter a suggested strategy more than 1 character")
        .max(50, "Must be 50 characters or less")
        .required("Suggested strategy is required"),
    }),
    onSubmit: async (values, helpers): Promise<void> => {
      try {
        await dispatch(createStrategy(values)).unwrap();
        helpers.setStatus({ success: true });
        helpers.setSubmitting(false);
        toast.success("Suggested strategy created");
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
        <CardHeader sx={{ mb: 4 }} title="Create suggested strategy" />
        <CardContent sx={{ pt: 0 }}>
          <Grid container spacing={3}>
            <Grid xs={12} md={6}>
              <TextField
                error={!!(formik.touched.name && formik.errors.name)}
                fullWidth
                helperText={formik.touched.name && formik.errors.name}
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
                      <IconButton onClick={() => addItem(formik)}>
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
                    formik.values.substrategies.map((item: any, index) => (
                      <MenuItem key={index}>
                        <ListItemText>{item.name}</ListItemText>
                        <ListItemIcon>
                          <DeleteOutlineIcon
                            onClick={() => removeItem(formik, item?.name)}
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
