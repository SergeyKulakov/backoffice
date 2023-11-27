import { FC, SetStateAction, useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { useFormik } from "formik";
import Link from "next/link";
import { useDispatch, useSelector } from "../../store";
import { useRouter } from "next/router";
import { paths } from "../../paths";
import { createCountries } from "../../thunks/countries";
import AddIcon from "@mui/icons-material/Add";
import AddTaskIcon from "@mui/icons-material/AddTask";
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
import { getAllLanguage } from "../../thunks/language";
import EditIcon from "@mui/icons-material/Edit";
import useAddItemOnEnter from "../../hooks/useAddItemOnEnter";

interface IProps {
  data?: string;
}
export const CountryCreateForm: FC<IProps> = ({ data }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [subItems, setSubItems] = useState<{ [key: string]: string }>({});

  function addToAlias(formik: any) {
    const myArray = formik.values.names.concat(formik.values.alias);
    formik.setFieldValue("names", myArray);
    formik.setFieldValue("alias", "");
  }
  useEffect(() => {
    dispatch(getAllLanguage());
  }, [dispatch]);

  const [editingIndex, setEditingIndex] = useState<number>(-1);

  function generateUniqueId() {
    return (
      Math.floor(Math.random() * 1_000_000_000) + "-" + Date.now().toString(36)
    );
  }

  function addToCitiesArray(formik: any, fieldName: string) {
    const newCity = {
      id: generateUniqueId(),
      name: formik.values[fieldName],
    };
    return formik.values.cities.concat(newCity);
  }
  type SubItem = {
    id: string;
    name: string;
  };

  type City = {
    id: string;
    name: string;
    names: string;
    subItems: SubItem[];
  };
  type CountryAlias = {
    lias_name: string;
  };
  type InitialValues = {
    name: string;
    names: [];
    languages: [{ _id: string; name: string }];
    cities: City[];
    city_name: string;
    alias: string;
  };

  function removeAlias(formik: any, index: number) {
    const newValues = [...formik.values.names];
    newValues.splice(index, 1);
    formik.setFieldValue("names", newValues);
  }

  const subItemInputRef = useCallback((node: HTMLInputElement) => {
    if (node !== null) {
      node.focus();
    }
  }, []);

  const handleKeyDown = useAddItemOnEnter(() => addToAlias(formik));
  const handleCityKeyDown = useAddItemOnEnter(() => addToCities(formik));
  function addToCities(formik: any) {
    if (formik.values.city_name.trim() !== "") {
      if (editingIndex >= 0) {
        const updatedCity = {
          ...formik.values.cities[editingIndex],
          name: formik.values.city_name,
          names: subItems[formik.values.cities[editingIndex].id] || null,
        };
        const updatedCities = [
          ...formik.values.cities.slice(0, editingIndex),
          updatedCity,
          ...formik.values.cities.slice(editingIndex + 1),
        ];
        formik.setFieldValue("cities", updatedCities);
        formik.setFieldValue("city_name", "");
        setEditingIndex(-1);
      } else {
        const newCity = {
          id: generateUniqueId(),
          name: formik.values.city_name,
          names: subItems[formik.values.city_name] || null,
        };
        const myArray = formik.values.cities.concat(newCity);
        formik.setFieldValue("cities", myArray);
        formik.setFieldValue("city_name", "");
      }
    }
  }

  const [selectedLang, setSelectedLang] = useState<
    { _id: string | undefined; name: string }[]
  >([]);

  const handleSelectedLanguages = (
    selectedLang: React.SetStateAction<
      { _id: string | undefined; name: string }[]
    >
  ) => {
    setSelectedLang(selectedLang);
  };
  function removeCity(formik: any, index: number) {
    const city = formik.values.cities[index];
    const newValues = [...formik.values.cities];
    newValues.splice(index, 1);
    if (city.names) {
      formik.setFieldValue("names", null);
    }
    formik.setFieldValue("cities", newValues);
    if (index === editingIndex) {
      setEditingIndex(-1);
    }
  }
  function editCity(formik: any, index: number) {
    const city = formik.values.cities[index];
    formik.setFieldValue("city_name", city.name);
    formik.setFieldValue("names", city.names || "");
    setEditingIndex(index);
  }

  const formik = useFormik<InitialValues>({
    initialValues: {
      name: data || "",
      names: [],
      languages: [{ _id: "", name: "" }],
      cities: [],
      city_name: "",
      alias: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(1, "Please enter a name more than 1 character")
        .max(50, "Must be 50 characters or less")
        .required("Name is required"),
    }),
    onSubmit: async (values, helpers): Promise<void> => {
      try {
        const selectedLanguagesWithIds = selectedLang.map((lang) => {
          return {
            _id: lang._id,
            name: lang.name,
          };
        });

        const updatedCities = values.cities.map((city) => ({
          ...city,
          names: subItems[city.id],
        }));

        const updatedValues = {
          ...values,
          cities: updatedCities,
          languages: selectedLanguagesWithIds,
        };
        // @ts-ignore
        await dispatch(createCountries(updatedValues)).unwrap();
        helpers.setStatus({ success: true });
        helpers.setSubmitting(false);
        toast.success("Country type created");
        await router.push(paths.dictionary.countries.countryMain);
      } catch (err) {
        // @ts-ignore
        toast.error(err.message[0]);
        helpers.setStatus({ success: false });
        helpers.setSubmitting(false);
      }
    },
  });
  const handleEditResearcher = (cityId: string) => {
    setSubItems({ ...subItems, [cityId]: "" });
  };
  const handleSubItemChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    cityId: string
  ) => {
    const { value } = event.target;
    setSubItems({ ...subItems, [cityId]: value });
  };

  const countriesData = useSelector((state) => state.country.name);
  const languageData = useSelector((state) => state.language.language);
  const isSuccessLoad = useSelector((state) => state.language.isSuccess);
  return (
    <form onSubmit={formik.handleSubmit}>
      <Card>
        <CardHeader sx={{ mb: 4 }} title="Create Country" />
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
                fullWidth
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
                name="alias"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.alias}
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

            <Grid xs={12} md={12}>
              {isSuccessLoad && languageData && languageData.length > 0 ? (
                <>
                  {languageData ? (
                    <CountriesLanguagesTable
                      data={languageData}
                      setSelectedLang={handleSelectedLanguages}
                    />
                  ) : (
                    <div>Loading...</div>
                  )}
                </>
              ) : languageData && languageData.length === 0 ? (
                <Stack alignItems="center">
                  <Typography variant="h6">No languages found</Typography>
                </Stack>
              ) : (
                <Stack alignItems="center">
                  <Loader />
                </Stack>
              )}
            </Grid>
            <Grid xs={12} md={12}>
              <TextField
                error={!!(formik.touched.city_name && formik.errors.city_name)}
                fullWidth
                helperText={formik.touched.city_name && formik.errors.city_name}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => addToCities(formik)}>
                        <AddIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                label="City name"
                name="city_name"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.city_name}
                onKeyDown={handleCityKeyDown}
              />
              <Paper>
                <MenuList>
                  {formik.values.cities.map((item, index) => (
                    <MenuItem key={item.id} sx={{ height: "60px" }}>
                      <ListItemText>{item.name}</ListItemText>
                      <ListItemIcon>
                        <IconButton
                          aria-label="Add Alias"
                          onClick={() => handleEditResearcher(item.id)}
                        >
                          <AddIcon />
                        </IconButton>
                        {subItems[item.id] !== undefined && (
                          <TextField
                            inputRef={
                              formik.values.city_name === item.id
                                ? subItemInputRef
                                : null
                            }
                            label="Alias name"
                            value={subItems[item.id]}
                            onChange={(event: any) =>
                              handleSubItemChange(event, item.id)
                            }
                          />
                        )}
                        {/* <IconButton onClick={() => editCity(formik, index)}>
                          <EditIcon />
                        </IconButton> */}
                        <IconButton onClick={() => removeCity(formik, index)}>
                          <DeleteOutlineIcon />
                        </IconButton>
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
