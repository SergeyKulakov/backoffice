import { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { useFormik } from "formik";
import Link from "next/link";
import { useDispatch } from "../../store";
import { useRouter } from "next/router";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";
import { paths } from "../../paths";
import EditIcon from "@mui/icons-material/Edit";

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
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import { Country } from "../../types/countries";
import { updateCountries } from "../../thunks/countries";

interface IProps {
  data: Country;
  cityId?: string;
}

export const CitiesEditForm: FC<IProps> = ({ data, cityId }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  // @ts-ignore
  const cityIndex = data.cities.findIndex((city) => city._id === cityId);
  const initialCityName = cityIndex !== -1 ? data.cities[cityIndex].name : "";
  const [aliasNames, setAliasNames] = useState<string[]>([]);
  useEffect(() => {
    const newCityName = cityIndex !== -1 ? data.cities[cityIndex].name : "";
    formik.setFieldValue("city_name", newCityName);
    // @ts-ignore
    const newAliasNames = cityIndex !== -1 ? data.cities[cityIndex].names : [];
    if (newAliasNames) {
      setAliasNames(newAliasNames);
    } else {
      setAliasNames([]);
    }
  }, [cityId]);
  function addToAlias(formik: any) {
    const newAlias = formik.values.alias_name;
    if (newAlias) {
      if (aliasNames) {
        setAliasNames(aliasNames.concat(newAlias));
      } else {
        setAliasNames([newAlias]);
      }
      formik.setFieldValue("alias_name", "");
    }
  }

  // function removeAlias(index: number) {
  //   setAliasNames((prevAliasNames) =>
  //     prevAliasNames.filter((_, i) => i !== index)
  //   );
  // }
  const formik = useFormik({
    initialValues: {
      name: data.name,
      names: data.names,
      _id: data._id,
      cities: data.cities,
      alias_name: "",
      city_name: "",
    },
    validationSchema: Yup.object({
      city_name: Yup.string()
        .min(1, "Please enter a city name more than 1 character")
        .max(50, "Must be 50 characters or less")
        .required("City name is required"),
    }),
    onSubmit: async (values, helpers): Promise<void> => {
      try {
        let updatedCities = [...values.cities];
        if (cityIndex !== -1) {
          const updatedCity = {
            ...updatedCities[cityIndex],
            name: values.city_name.toString(),
            names: aliasNames,
          };
          updatedCities[cityIndex] = updatedCity;
        } else {
          updatedCities.push({
            name: values.city_name,
            // @ts-ignore
            names: aliasNames,
          });
        }
        const updatedValues = {
          ...values,
          cities: updatedCities,
        };
        await dispatch(updateCountries(updatedValues)).unwrap();
        helpers.setStatus({ success: true });
        helpers.setSubmitting(false);
        toast.success("City updated");
        await router.push(paths.dictionary.countries.countryMain);
      } catch (err) {
        // @ts-ignore
        toast.error(err.message[0]);
        helpers.setStatus({ success: false });
        helpers.setSubmitting(false);
      }
    },
  });
  function removeAlias(formik: any, index: number) {
    const newAliasNames = [...aliasNames];
    newAliasNames.splice(index, 1);
    setAliasNames(newAliasNames);
  }
  const handleEditAlias = (formik: any, newName: string, index: number) => {
    const newAliasNames = [...aliasNames];
    newAliasNames[index] = newName;
    setAliasNames(newAliasNames);
    const newNames = [...formik.values.names];
    newNames[index] = newName;
    formik.setFieldValue("names", newNames);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Card>
        <CardHeader sx={{ mb: 4 }} title="Cities Edit" />
        <CardContent sx={{ pt: 0 }}>
          <Grid container spacing={3} flexDirection="column">
            <Grid xs={12} md={12}>
              <TextField
                error={!!(formik.touched.city_name && formik.errors.city_name)}
                fullWidth
                label="City name"
                name="city_name"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.city_name}
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
              />
              <Paper>
                <MenuList>
                  {aliasNames &&
                    aliasNames.map((item: string, index: number) => (
                      <MenuItem key={index}>
                        <TextField
                          variant="standard"
                          fullWidth
                          onChange={(event) =>
                            handleEditAlias(formik, event.target.value, index)
                          }
                          value={item}
                        />
                        <IconButton
                          aria-label="remove alias"
                          onClick={() => removeAlias(formik, index)}
                        >
                          <Tooltip title="Remove alias">
                            <DeleteOutlineIcon />
                          </Tooltip>
                        </IconButton>
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
