import React, { FC, useState, useEffect, KeyboardEvent } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { useFormik } from "formik";
import Link from "next/link";
import { useDispatch, useSelector } from "../../store";
import { updateCompaniesTypes } from "../../thunks/companies";
import { useRouter } from "next/router";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";
import { paths } from "../../paths";
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
  Checkbox,
  Input,
  FormControlLabel,
  Box,
} from "@mui/material";
import { Company } from "../../types/companies";
import { getAllCompanyType } from "../../thunks/companyTypes";
import useAddItemOnEnter from "../../hooks/useAddItemOnEnter";
interface IProps {
  data: Company;
}
export const CompaniesEditForm: FC<IProps> = ({ data }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [subTypes, setSubTypes] = useState<string[]>(
    // @ts-ignore
    data.company_type.subtypes
  );

  const [subtypeClicked, setSubtypeClicked] = useState(false);

  const [selectedSubtype, setSelectedSubtype] = useState(
    // @ts-ignore
    data.company_subtype
  );
  // @ts-ignore
  const companyTypes =
    useSelector((state) => state.companyType.companyType) ?? [];
  const [selectedCompany, setSelectedCompany] = useState("");
  useEffect(() => {
    dispatch(getAllCompanyType());
    // @ts-ignore
    setSelectedCompany(data.company_type?._id as string);
    // @ts-ignore
    setSelectedSubtype(data.company_subtype);
  }, [dispatch, data.company_type]);
  const handleSubtypeClick = () => {
    if (!subtypeClicked) {
      // @ts-ignore
      setSubTypes(data.company_type.subtypes);
      setSubtypeClicked(true);
    }
  };

  const handleCompanyChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    const companyId = event.target.value as string;

    const company = companyTypes.find(
      (company: { _id: string }) => company._id === companyId
    );

    if (company) {
      setSelectedCompany(company._id);
      if (company._id !== "") {
        setSubTypes(company.subtypes);
        const selectedSubtypeObj = company.subtypes.find(
          (subtype: any) => subtype._id === data.company_subtype
        );
        if (selectedSubtypeObj) {
          // @ts-ignore
          setSelectedSubtype(selectedSubtypeObj._id);
        } else {
          // @ts-ignore
          setSelectedSubtype(company.subtypes[0]._id);
        }
      }
    } else {
      setSubTypes([]);
      // @ts-ignore
      setSelectedSubtype("");
    }
  };

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

  const handleKeyDown = useAddItemOnEnter(() => addToAlias(formik));
  const handleKeyEdit = (event: KeyboardEvent<HTMLInputElement>) =>
    event.key === "Enter" ? event.preventDefault() : null;

  const handleSubtypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const subtypeId = event.target.value as any;
    setSelectedSubtype(subtypeId || "");
  };

  const handleEditAlias = (formik: any, newName: string, index: number) => {
    const newNames = [...formik.values.names];
    newNames[index] = newName;
    formik.setFieldValue("names", newNames);
  };

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
      website_url: data.website_url || "",
      linkedin_url: data.linkedin_url || "",
      company_type: data.company_type,
      company_subtype: "",
      subtype: "",
      logo: data.logo || "",
      _id: data._id,
      alias_name: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(1, "Please enter a company name more than 1 character")
        .max(50, "Must be 50 characters or less")
        .required("Company name is required"),
    }),
    onSubmit: async (values, helpers): Promise<void> => {
      try {
        const updatedValues = {
          ...values,
          company_type: selectedCompany,
          company_subtype: selectedSubtype,
        };
        await dispatch(updateCompaniesTypes(updatedValues)).unwrap();

        helpers.setStatus({ success: true });
        helpers.setSubmitting(false);
        toast.success("Company updated");
        await router.push(paths.dictionary.companiesMain);
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
        <CardHeader sx={{ mb: 4 }} title="Edit Company" />
        <CardContent sx={{ pt: 0 }}>
          <Grid container spacing={3} flexDirection="column">
            <Grid xs={12} md={6}>
              <TextField
                error={!!(formik.touched.name && formik.errors.name)}
                fullWidth
                label="Company name"
                name="name"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.name}
              />
            </Grid>
            <Grid xs={12} md={6}>
              <TextField
                label="Company type"
                name="company_type"
                fullWidth
                select
                SelectProps={{ native: true }}
                value={selectedCompany}
                onChange={handleCompanyChange}
              >
                {companyTypes.map((company) => (
                  <option key={company._id} value={company._id}>
                    {company.name}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid xs={12} md={6}>
              <TextField
                label="Subtype"
                name="subtype"
                fullWidth
                select
                SelectProps={{ native: true }}
                value={selectedSubtype}
                onChange={handleSubtypeChange}
                onClick={handleSubtypeClick}
              >
                {!subtypeClicked && selectedSubtype && (
                  <option
                    key={selectedSubtype as any}
                    value={selectedSubtype}
                    selected
                  >
                    {
                      subTypes.find(
                        (subtype: any) => subtype._id === selectedSubtype
                        // @ts-ignore
                      )?.name
                    }
                  </option>
                )}

                {subtypeClicked &&
                  subTypes.map((subtype: any, index) => (
                    <option key={index} value={subtype._id}>
                      {subtype.name}
                    </option>
                  ))}
              </TextField>
            </Grid>

            <Grid xs={12} md={6}>
              <TextField
                error={
                  !!(formik.touched.website_url && formik.errors.website_url)
                }
                fullWidth
                label="Website"
                name="website_url"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.website_url}
              />
            </Grid>

            <Grid xs={12} md={6}>
              <TextField
                fullWidth
                label="Linkedin"
                name="linkedin_url"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.linkedin_url}
              />
            </Grid>
            <Grid
              xs={12}
              md={6}
              display="flex"
              flexDirection="column"
              alignItems="start"
            >
              <Input
                id="logo"
                type="file"
                onChange={handleLogoChange}
                inputProps={{ accept: "image/*" }}
                sx={{ display: "none" }}
              />
              <Button variant="contained" component="label" htmlFor="logo">
                Upload Logo
              </Button>
              {formik.values.logo && (
                <Box
                  component="img"
                  alt="Logo"
                  my={2}
                  src={formik.values.logo}
                />
              )}
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
          <Link href={paths.dictionary.companiesMain}>
            <Button color="inherit" disabled={formik.isSubmitting}>
              Cancel
            </Button>
          </Link>
        </Stack>
      </Card>
    </form>
  );
};
