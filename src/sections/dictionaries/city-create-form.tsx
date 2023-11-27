import { FC, useEffect } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { useFormik } from "formik";
import Link from "next/link";
import { useDispatch, useSelector } from "../../store";
import { useRouter } from "next/router";
import { paths } from "../../paths";
import { createCountries } from "../../thunks/countries";
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
  Typography,
} from "@mui/material";
import { CountriesLanguagesTable } from "./countries-languages-table";
import Loader from "../../components/Loader";
interface IProps {
  data?: string;
}
export const CityCreateForm: FC<IProps> = ({ data }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  function generateUniqueId() {
    return (
      Math.floor(Math.random() * 1_000_000_000) + "-" + Date.now().toString(36)
    );
  }

  function addToAlias(formik: any) {
    const newCity = {
      id: generateUniqueId(),
      name: formik.values.alias_name,
    };
    const myArray = formik.values.cities.concat(newCity);
    formik.setFieldValue("alias_name", "");
    formik.setFieldValue("cities", myArray);
  }

  function removeAlias(formik: any, index: number) {
    const newValues = [...formik.values.cities];
    newValues.splice(index, 1);
    formik.setFieldValue("cities", newValues);
  }

  function addToCitiesArray(formik: any, fieldName: string) {
    const newCity = {
      id: generateUniqueId(),
      name: formik.values[fieldName],
    };
    return formik.values.cities.concat(newCity);
  }
  type City = {
    id: string;
    name: string;
  };
  type InitialValues = {
    name: string;
    names: string[];
    languages: string[];
    cities: City[];
    city_name: string;
    alias_name: string;
  };
  const formik = useFormik<InitialValues>({
    initialValues: {
      name: data || "",
      names: [],
      languages: [],
      cities: [],
      city_name: "",
      alias_name: "",
    },
    validationSchema: Yup.object({
      city_name: Yup.string()
        .min(1, "Please enter a city name more than 1 character")
        .max(50, "Must be 50 characters or less")
        .required("city name is required"),
    }),
    onSubmit: async (values, helpers): Promise<void> => {
      try {
        const updatedCities = addToCitiesArray(formik, "city_name");
        const updatedLanguages = values.languages.map((language) => ({
          name: language,
        }));
        const updatedValues = {
          ...values,
          cities: updatedCities,
          languages: updatedLanguages,
        };
        // @ts-ignore
        await dispatch(createCountries(updatedValues)).unwrap();
        helpers.setStatus({ success: true });
        helpers.setSubmitting(false);
        toast.success("City type created");

        await router.push(paths.dictionary.createCountry);
      } catch (err) {
        // @ts-ignore
        toast.error(err.message[0]);
        helpers.setStatus({ success: false });
        helpers.setSubmitting(false);
      }
    },
  });

  const countriesData = useSelector((state) => state.country.name);
  const isSuccessLoad = useSelector((state) => state.country.isSuccess);

  return (
    <form onSubmit={formik.handleSubmit}>
      <Card>
        <CardHeader sx={{ mb: 4 }} title="Create City" />
        <CardContent sx={{ pt: 0 }}>
          <Grid container spacing={3} flexDirection="column">
            <Grid xs={12} md={6}>
              <TextField
                error={!!(formik.touched.city_name && formik.errors.city_name)}
                fullWidth
                helperText={formik.touched.city_name && formik.errors.city_name}
                label="City name"
                name="city_name"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.city_name}
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
              />
              <Paper>
                <MenuList>
                  {formik.values.cities &&
                    formik.values.cities.map((item, index) => (
                      <MenuItem key={item.id}>
                        <ListItemText>
                          {item.name} (ID: {item.id})
                        </ListItemText>
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
            <Grid xs={12} md={12}></Grid>
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
          <Link href={paths.dictionary.countries.countryMain}>
            <Button color="inherit" disabled={formik.isSubmitting}>
              Cancel
            </Button>
          </Link>
        </Stack>
      </Card>
    </form>
  );
};
