import { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { useFormik } from "formik";
import Link from "next/link";
import { updateCountries } from "../../thunks/countries";
import { useRouter } from "next/router";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";
import { paths } from "../../paths";
import { Country } from "../../types/countries";
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
  Typography,
} from "@mui/material";
import { CitiesListTable } from "./cities-list-table";
import Loader from "../../components/Loader";
import { useDispatch, useSelector } from "../../store";
import { CountriesLanguagesTable } from "./countries-languages-table";
import { CountriesLanguagesEdit } from "./countries-languages-edit";
import { getAllLanguage } from "../../thunks/language";
import { Language } from "../../types/language";
import useAddItemOnEnter from "../../hooks/useAddItemOnEnter";
import { KeyboardEvent } from "react";

interface IProps {
  data: Country;
  allLanguages: Language[];
}

export const CountriesEditForm: FC<IProps> = ({ data }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const countriesData = useSelector((state) => state.country.name);
  const isSuccessLoad = useSelector((state) => state.country.isSuccess);
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

  const allLanguages = useSelector((state) => state.language.language);

  function removeCity(cityId: string) {
    const newCitiesArray = formik.values.cities.filter(
      (city: any) => city._id !== cityId
    );
    formik.setFieldValue("cities", newCitiesArray);
  }

  useEffect(() => {
    dispatch(getAllLanguage());
  }, [dispatch]);

  const getLanguageById = (id: string): Language | undefined => {
    return allLanguages
      ? allLanguages.find((language) => language._id === id)
      : undefined;
  };
  const handleSelectedLanguagesChange = (selectedLanguages: string[]) => {
    setSelectedLanguages(selectedLanguages);
  };
  const handleEditAlias = (formik: any, newName: string, index: number) => {
    const newNames = [...formik.values.names];
    newNames[index] = newName;
    formik.setFieldValue("names", newNames);
  };
  function addCity(formik: any) {
    const newCity = { name: formik.values.new_city };
    const newCitiesArray = formik.values.cities.concat(newCity);
    formik.setFieldValue("cities", newCitiesArray);
    formik.setFieldValue("new_city", "");
  }

  const handleCityKeyDown = useAddItemOnEnter(() => addCity(formik));
  const handleKeyDown = useAddItemOnEnter(() => addToAlias(formik));
  const handleKeyEdit = (event: KeyboardEvent<HTMLInputElement>) =>
    event.key === "Enter" ? event.preventDefault() : null;
  const formik = useFormik({
    initialValues: {
      name: data.name,
      names: data.names,
      cities: data.cities,
      languages: data.languages,
      _id: data._id,
      alias_name: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(1, "Please enter a country name more than 1 character")
        .max(50, "Must be 50 characters or less")
        .required("Country name is required"),
    }),
    onSubmit: async (values, helpers): Promise<void> => {
      try {
        const updatedValues = { ...values, languages: selectedLanguages };
        // @ts-ignore
        await dispatch(updateCountries(updatedValues)).unwrap();
        helpers.setStatus({ success: true });
        helpers.setSubmitting(false);
        toast.success("Country updated");
        await router.push(paths.dictionary.countries.countryMain);
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
        <CardHeader sx={{ mb: 4 }} title="Edit Country" />
        <CardContent sx={{ pt: 0 }}>
          <Grid container spacing={3} flexDirection="column">
            <Grid xs={12} md={12}>
              <TextField
                error={!!(formik.touched.name && formik.errors.name)}
                fullWidth
                label="Country"
                name="name"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.name}
              />
            </Grid>
            <Grid xs={12} md={12}>
              <TextField
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
                fullWidth
                name="alias_name"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.alias_name}
                onKeyDown={handleKeyDown}
              />
              <Paper>
                <MenuList>
                  {formik.values.names?.map((item, index: number) => (
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
            {isSuccessLoad && countriesData && countriesData.length > 0 ? (
              <Card>
                <Grid xs={12} md={12}>
                  <CountriesLanguagesEdit
                    // @ts-ignore
                    data={formik.values}
                    // @ts-ignore
                    allLanguages={allLanguages}
                    onSelectedLanguagesChange={handleSelectedLanguagesChange}
                    formik={formik}
                  />
                </Grid>
                <Grid xs={12} md={12}>
                  <TextField
                    label="Add new city"
                    fullWidth
                    name="new_city"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    // @ts-ignore
                    value={formik.values.new_city}
                    onKeyDown={handleCityKeyDown}
                  />
                </Grid>
                <Grid xs={12} md={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => addCity(formik)}
                  >
                    Add City
                  </Button>
                </Grid>
                <CitiesListTable // @ts-ignore
                  data={formik.values}
                  removeCity={removeCity}
                />
              </Card>
            ) : countriesData && countriesData.length === 0 ? (
              <Stack alignItems="center">
                <Typography variant="h6">No countries found</Typography>
              </Stack>
            ) : (
              <Stack alignItems="center">
                <Loader />
              </Stack>
            )}
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
