import { FC, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { useFormik } from "formik";
import Link from "next/link";
import { useDispatch, useSelector } from "../../store";
import { useRouter } from "next/router";
import { paths } from "../../paths";
import { createNewCompany } from "../../thunks/companies";
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
  MenuItem,
  Paper,
  TextField,
  Unstable_Grid2 as Grid,
  InputAdornment,
  IconButton,
  Checkbox,
  Input,
  Tooltip,
  FormControlLabel,
} from "@mui/material";
import { getAllCompanyType } from "../../thunks/companyTypes";
import useAddItemOnEnter from "../../hooks/useAddItemOnEnter";
interface IProps {
  data?: string;
}
export const CompaniesCreateForm: FC<IProps> = ({ data }) => {
  const dispatch = useDispatch();
  const toNameRef = useRef();
  const router = useRouter();
  const [selectedCompany, setSelectedCompany] = useState("");
  const [subTypes, setSubTypes] = useState<string[]>([]);
  const [selectedSubtype, setSelectedSubtype] = useState("");
  const companyTypes = useSelector((state) => state.companyType.companyType);
  useEffect(() => {
    dispatch(getAllCompanyType());
  }, [dispatch]);

  const handleCompanyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const companyId = event.target.value;

    if (companyTypes) {
      const company = companyTypes.find(
        (company: { _id: string }) => company._id === companyId
      );
      setSelectedCompany(company?._id || "");
      setSubTypes(company?.subtypes || []);
    } else {
      setSubTypes([]);
    }
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
  function addToAlias(formik: any) {
    const newArray = formik.values.names.concat(formik.values.alias_name);
    formik.setFieldValue("names", newArray);
    formik.setFieldValue("alias_name", "");
  }

  function removeAlias(formik: any, item: string) {
    const newValues = [...formik.values.names];
    const index = newValues.indexOf(item);
    newValues.splice(index, 1);
    formik.setFieldValue("names", newValues);
  }
  const handleSubtypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const subtypeId = event.target.value;
    setSelectedSubtype(subtypeId || "");
  };

  const handleEditAlias = (formik: any, newName: string, index: number) => {
    const newNames = [...formik.values.names];
    newNames[index] = newName;
    formik.setFieldValue("names", newNames);
  };

  const handleKeyDown = useAddItemOnEnter(() => addToAlias(formik));

  const formik = useFormik({
    initialValues: {
      name: data || "",
      company_type: "",
      company_subtype: "",
      // subtype: [],
      logo: "",
      email: "",
      website_url: "",
      linkedin_url: "",
      names: [],
      alias_name: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(1, "Please enter a company name more than 1 character")
        .max(50, "Must be 50 characters or less")
        .required("Company name is required"),
      email: Yup.string().email("Invalid email address"),
    }),
    onSubmit: async (values, helpers): Promise<void> => {
      try {
        await dispatch(
          createNewCompany({
            ...values,
            company_type: selectedCompany,
            // @ts-ignore
            company_subtype: selectedSubtype,
          })
        ).unwrap();
        helpers.setStatus({ success: true });
        helpers.setSubmitting(false);
        toast.success("Company created");
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
        <CardHeader sx={{ mb: 4 }} title="Companies" />
        <CardContent sx={{ pt: 0 }}>
          <Grid container spacing={3} flexDirection="column">
            <Grid xs={12} md={6}>
              <TextField
                error={!!(formik.touched.name && formik.errors.name)}
                fullWidth
                helperText={formik.touched.name && formik.errors.name}
                label="Company"
                name="name"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.name}
              />
            </Grid>
            <Grid xs={12} md={6}>
              <TextField
                label="Company Type"
                name="company_type"
                fullWidth
                select
                SelectProps={{ native: true }}
                inputRef={toNameRef}
                InputLabelProps={{ shrink: !!toNameRef.current }}
                value={selectedCompany}
                onChange={handleCompanyChange}
              >
                <option value="">Select a company type</option>
                {Array.isArray(companyTypes) &&
                  companyTypes.map((company) => (
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
                inputRef={toNameRef}
                InputLabelProps={{ shrink: !!toNameRef.current }}
                disabled={!selectedCompany}
                value={selectedSubtype}
                onChange={handleSubtypeChange}
              >
                <option value="">Select a subtype</option>
                {subTypes.map((subtype: any, index) => (
                  <option key={index} value={subtype._id}>
                    {subtype.name}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid xs={12} md={6}>
              <TextField
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
            <Grid xs={12} md={6} flexDirection="column" display="flex">
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
                  layout="responsive"
                  width="100"
                  height="100"
                />
              )}
              <TextField
                error={!!(formik.touched.email && formik.errors.email)}
                fullWidth
                helperText={formik.touched.email && formik.errors.email}
                label="E-mail"
                name="email"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.email}
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
                    formik.values.names?.map((item, index: number) => (
                      <MenuItem key={index}>
                        <TextField
                          variant="standard"
                          fullWidth
                          onChange={(event) =>
                            handleEditAlias(formik, event.target.value, index)
                          }
                          InputProps={{
                            disableUnderline: true,
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="password visibility"
                                  onClick={() =>
                                    removeAlias(formik, index as any)
                                  }
                                >
                                  <Tooltip title="Remove alias">
                                    <DeleteOutlineIcon
                                      onClick={() =>
                                        removeAlias(formik, index as any)
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
          <Link href={paths.dictionary.companies}>
            <Button color="inherit" disabled={formik.isSubmitting}>
              Cancel
            </Button>
          </Link>
        </Stack>
      </Card>
    </form>
  );
};
