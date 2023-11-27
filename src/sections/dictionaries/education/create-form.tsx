import { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { useFormik } from "formik";
import Link from "next/link";
import { useDispatch, useSelector } from "../../../store";
import { useRouter } from "next/router";
import { paths } from "../../../paths";
import { createEducation } from "../../../thunks/education";
import useAddItemOnEnter from "../../../hooks/useAddItemOnEnter";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Image from "next/image";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Stack,
  MenuList,
  FormControl,
  MenuItem,
  InputLabel,
  Paper,
  TextField,
  Unstable_Grid2 as Grid,
  InputAdornment,
  ListItemText,
  ListItemIcon,
  IconButton,
  Input,
  Select,
} from "@mui/material";
import { getAllDCountries } from "../../../thunks/countries";
interface IProps {
  data?: string;
}
export const EducationCreateForm: FC<IProps> = ({ data }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(getAllDCountries());
  }, [dispatch]);
  const countriesData = useSelector((state) => state.country.name);
  const isSuccessLoad = useSelector((state) => state.country.isSuccess);
  function addToAlias(formik: any) {
    const myArray = formik.values.names.concat(formik.values.alias_name);
    formik.setFieldValue("names", myArray);
    formik.setFieldValue("alias_name", "");
  }

  function removeAlias(formik: any, index: number) {
    const newValues = [...formik.values.names];
    newValues.splice(index, 1);
    formik.setFieldValue("names", newValues);
  }
  const handleKeyDown = useAddItemOnEnter(() => addToAlias(formik));

  const handleLogoChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const dataUrl = reader.result as string;
        formik.setFieldValue("logo", dataUrl);
      };
    }
  };
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, [data]);
  const formik = useFormik({
    initialValues: {
      name: data || "",
      names: [],
      alias_name: "",
      logo: "",
      region: "",
      country_id: "",
      city_id: "",
    },

    validationSchema: Yup.object({
      name: Yup.string()
        .min(1, "Please enter a education more than 1 character")
        .max(50, "Must be 50 characters or less")
        .required("Education is required"),
    }),
    onSubmit: async (values, helpers): Promise<void> => {
      try {
        await dispatch(createEducation(values)).unwrap();
        helpers.setStatus({ success: true });
        helpers.setSubmitting(false);
        toast.success("University created");
        await router.push(paths.dictionary.education.educationMain);
      } catch (err) {
        // @ts-ignore
        toast.error(err.message[0]);
        helpers.setStatus({ success: false });
        helpers.setSubmitting(false);
      }
    },
  });

  const selectedCountry = countriesData?.find(
    (country) => country._id === formik.values.country_id
  );
  return (
    <form onSubmit={formik.handleSubmit}>
      <Card>
        <CardHeader sx={{ mb: 4 }} title="Create Universities" />
        <CardContent sx={{ pt: 0 }}>
          <Grid container spacing={3} flexDirection="column">
            <Grid xs={12} md={12}>
              <TextField
                error={!!(formik.touched.name && formik.errors.name)}
                fullWidth
                helperText={formik.touched.name && formik.errors.name}
                label="University"
                name="name"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.name}
              />
            </Grid>
            <Grid xs={12} md={12}>
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
                    formik.values.names.map((item, index) => (
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
            <Grid xs={12} md={12} flexDirection="column" display="flex">
              <FormControl fullWidth sx={{ mb: 5, mt: -3 }}>
                <InputLabel id="country_label">Country</InputLabel>
                <Select
                  name="country_id"
                  id="country_id"
                  label="Country"
                  labelId="country_label"
                  value={formik.values.country_id}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  {isSuccessLoad &&
                    countriesData &&
                    countriesData.map((country) => (
                      <MenuItem key={country._id} value={country._id}>
                        {country.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
              <FormControl fullWidth sx={{ mb: 5 }}>
                <InputLabel id="country_label">City</InputLabel>
                <Select
                  name="city_id"
                  id="city_id"
                  label="City"
                  labelId="city_label"
                  disabled={!formik.values.country_id}
                  value={formik.values.city_id}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  {isSuccessLoad &&
                    selectedCountry?.cities.map((city) => (
                      <MenuItem key={city._id} value={city._id}>
                        {city.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
              <Input
                id="logo"
                type="file"
                onChange={handleLogoChange}
                inputProps={{ accept: "image/*" }}
                sx={{ display: "none" }}
              />
              <Button
                variant="contained"
                component="label"
                htmlFor="logo"
                sx={{ mb: "12px" }}
              >
                Upload Logo
              </Button>
              {formik.values.logo && (
                <Image
                  src={formik.values.logo}
                  alt="Logo"
                  width={200}
                  height={200}
                  objectFit="contain"
                />
              )}
              <TextField
                error={!!(formik.touched.region && formik.errors.region)}
                fullWidth
                helperText={formik.touched.region && formik.errors.region}
                label="Region"
                name="region"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.region}
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
          <Link href={paths.dictionary.education.educationMain}>
            <Button color="inherit" disabled={formik.isSubmitting}>
              Cancel
            </Button>
          </Link>
        </Stack>
      </Card>
    </form>
  );
};
