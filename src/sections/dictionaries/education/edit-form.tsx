import { FC, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { useFormik } from "formik";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";
import Image from "next/image";
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
  Input,
} from "@mui/material";
import { useDispatch, useSelector } from "../../../store";
import { updateEducation } from "../../../thunks/education";
import { paths } from "../../../paths";
import { Education } from "../../../types/education";
import useAddItemOnEnter from "../../../hooks/useAddItemOnEnter";
import { KeyboardEvent } from "react";
import { getAllDCountries } from "../../../thunks/countries";
interface IProps {
  data: Education;
}

export const EducationEditForm: FC<IProps> = ({ data }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const countriesData = useSelector((state) => state.country.name ?? []);
  const isSuccessLoad = useSelector((state) => state.country.isSuccess);
  const [showCountries, setShowCountries] = useState(false);
  const [defaultCountry, setDefaultCountry] = useState<string[]>([
    data?.country?.name,
  ]);

  function handleAddAlias(formik: any) {
    const newArray = formik.values.names.concat(formik.values.alias_name);
    formik.setFieldValue("names", newArray);
    formik.setFieldValue("alias_name", "");
  }

  function handleRemoveAlias(formik: any, index: number) {
    const newValues = [...formik.values.names];
    newValues.splice(index, 1);
    formik.setFieldValue("names", newValues);
  }

  useEffect(() => {
    dispatch(getAllDCountries());
    if (data?.country?.name) {
      // setSelectedCountry(data.country.name);
      const country = countriesData.find((c) => c.name === data?.country?.name);
      if (country) {
        formik.setFieldValue("country_id", country?._id);
        formik.setFieldValue("country", { _id: country?._id });
      }
    }
  }, [dispatch, data?.country?.name]);
  const handleEditAlias = (formik: any, newName: string, index: number) => {
    const newNames = [...formik.values.names];
    newNames[index] = newName;
    formik.setFieldValue("names", newNames);
  };

  const handleKeyDown = useAddItemOnEnter(() => handleAddAlias(formik));
  const handleKeyEdit = (event: KeyboardEvent<HTMLInputElement>) =>
    event.key === "Enter" ? event.preventDefault() : null;

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

  const formik = useFormik({
    initialValues: {
      name: data.name,
      names: data.names,
      _id: data._id,
      logo: data.logo || "",
      alias_name: "",
      country_id: data.country?._id,
      country: {},
      city_id: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(1, "Please enter a university more than 1 character")
        .max(50, "Must be 50 characters or less")
        .required("University name is required"),
    }),
    onSubmit: async (values, helpers): Promise<void> => {
      try {
        await dispatch(updateEducation(values)).unwrap();
        helpers.setStatus({ success: true });
        helpers.setSubmitting(false);
        toast.success("University updated");
        await router.push(paths.dictionary.education.educationMain);
      } catch (err) {
        // @ts-ignore
        toast.error(err.message[0]);
        helpers.setStatus({ success: false });
        helpers.setSubmitting(false);
      }
    },
  });
  const handleCountryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const countryId = event.target.value;
    const country = countriesData.find((c) => c._id === countryId);
    if (country) {
      formik.setFieldValue("country_id", country._id);
      formik.setFieldValue("country", { _id: country._id });
      formik.setFieldValue("city_id", "");
    }
  };
  const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const cityId = event.target.value;
    formik.setFieldValue("city_id", cityId);
  };

  const selectedCountry = countriesData?.find(
    (country) => country._id === formik.values.country_id
  );
  return (
    <form onSubmit={formik.handleSubmit}>
      <Card>
        <CardHeader sx={{ mb: 4 }} title="Edit University" />
        <CardContent sx={{ pt: 0 }}>
          <Grid container spacing={3} flexDirection="column">
            <Grid xs={12} md={6}>
              <TextField
                error={!!(formik.touched.name && formik.errors.name)}
                fullWidth
                label="University"
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
                      <IconButton onClick={() => handleAddAlias(formik)}>
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
                          onChange={(event) =>
                            handleEditAlias(formik, event.target.value, index)
                          }
                          onKeyDown={handleKeyEdit}
                          InputProps={{
                            disableUnderline: true,
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={() =>
                                    handleRemoveAlias(formik, index)
                                  }
                                >
                                  <Tooltip title="Remove alias">
                                    <DeleteOutlineIcon
                                      onClick={() =>
                                        handleRemoveAlias(formik, index)
                                      }
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
            <Grid xs={12} md={6}>
              <TextField
                label="Country"
                name="country_id"
                fullWidth
                select
                InputLabelProps={{ shrink: true }}
                SelectProps={{
                  native: true,
                  onClick: () => setShowCountries(true),
                  onClose: () => setShowCountries(false),
                }}
                value={formik.values.country_id || ""}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  handleCountryChange(event)
                }
              >
                <option value="" disabled>
                  Select an option
                </option>
                {countriesData &&
                  countriesData.map((country: any) => (
                    <option
                      key={country._id}
                      value={country._id}
                      selected={country._id === formik.values.country_id}
                    >
                      {country.name}
                    </option>
                  ))}
              </TextField>
            </Grid>
            <Grid xs={12} md={6}>
              <TextField
                label="City"
                name="city_id"
                fullWidth
                select
                InputLabelProps={{ shrink: true }}
                SelectProps={{
                  displayEmpty: true,
                }}
                disabled={!formik.values.country_id}
                value={formik.values.city_id}
                // @ts-ignore
                onChange={handleCityChange}
              >
                {selectedCountry?.cities.map((city) => (
                  <MenuItem key={city._id} value={city._id}>
                    {city.name}
                  </MenuItem>
                )) || []}
              </TextField>
            </Grid>
            <Grid xs={12} md={6} display="flex" flexDirection="column">
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
