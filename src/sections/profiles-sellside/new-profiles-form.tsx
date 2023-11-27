import React, { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  Button,
  Card,
  CardContent,
  Tooltip,
  Stack,
  Checkbox,
  Typography,
  Box,
  TextField,
  FormControlLabel,
  Unstable_Grid2 as Grid,
  IconButton,
  SvgIcon,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { ArchiveModal } from "../../components/pages/researcher/ArchiveModal";
import PlusIcon from "@untitled-ui/icons-react/build/esm/Plus";
import DeleteIcon from "@mui/icons-material/Delete";
import { EducationList } from "../researcher/education-list";
import { IResearcherSellside, ISecondaryTeam } from "../../types/researcher";
import { useDispatch, useSelector } from "../../store";
import {
  getResearcherSellside,
  updateResearcher,
} from "../../thunks/researcher";
import Image01Icon from "@untitled-ui/icons-react/build/esm/Image01";
import { getCountReseacrher } from "../../thunks/counter";
import { compareDisabledArrays } from "../../utils/compareDisabledArray";
import { updateProfile } from "../../thunks/supervisor";
const label = { inputProps: { "aria-label": "Checkbox" } };

export const NewProfilesForm: FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [secondaryTeams, setSecondaryTeams] = useState<ISecondaryTeam[]>([]);
  const [teamsData, setTeamsData] = useState([]);

  const researcherData: any = useSelector(
    (state) => state.researcher.researcherSellside
  );
  const isSuccess = useSelector((state) => state.researcher.isSuccess);
  const counterData = useSelector((state) => state.counter.dataResearcher);
  const [isArchiveOpen, setIsArchiveOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getResearcherSellside());
    dispatch(getCountReseacrher());
  }, [dispatch]);
  useEffect(() => {
    if (isSuccess && researcherData) {
      setIsLoading(false);
      setTeamsData(researcherData?.dictionaries?.suggestedTeam);
    }
  }, [isSuccess, researcherData]);

  const initialValues: IResearcherSellside = {
    isArchived: false,
    profileId: researcherData?.profileId,
    profileType: researcherData?.profileType,
    info: {
      gender: {
        dictionaryId: "",
        isMarked: false,
      },
      diversity: {
        dictionaryId: "",
        isMarked: false,
      },
      suggestedTeams: [],
      startCurrentEmployeer: {
        isMarked: false,
        moveId: researcherData?.info?.startCurrentEmployeer?.moveId || null,
        value: researcherData?.info?.startCurrentEmployeer?.value || null,
      },
      firstName: {
        isMarked: researcherData?.info.firstName.isMarked,
        moveId: researcherData?.info.firstName.moveId,
        value: researcherData?.info.firstName.value,
      },
      lastName: {
        isMarked: researcherData?.info.lastName.isMarked,
        moveId: researcherData?.info.lastName.moveId,
        value: researcherData?.info.lastName.value,
      },
      websiteLink: {
        value: researcherData?.info.websiteLink?.value || null,
        isMarked: researcherData?.info.websiteLink?.value,
      },
      education: researcherData?.info.education,
      startFirstSellside: {
        isMarked: false,
        moveId: researcherData?.info?.startFirstSellside?.moveId || null,
        value: researcherData?.info?.startFirstSellside?.value || null,
      },
    },
  };
  const toggleArchiveDialog = () => {
    setIsArchiveOpen((prevState) => !prevState);
  };

  const handleSameDate = () => {
    formik.setFieldValue(
      "info.startFirstSellside.value",
      formik.values.info.startCurrentEmployeer.value
    );
  };

  const formatDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      month: "long",
      year: "numeric",
    };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  const handleDateChange = (date: Date | null) => {
    if (date) {
      formik.setFieldValue("info.startCurrentEmployeer.value", date);
    }
  };
  const handleDateChangeStarted = (date: Date | null) => {
    if (date) {
      formik.setFieldValue("info.startFirstSellside.value", formatDate(date));
    }
  };

  const handleArchiveProfile = async (id: string) => {
    await dispatch(updateProfile(id));
    await toggleArchiveDialog();
    await dispatch(getResearcherSellside());
    await dispatch(getCountReseacrher());
  };
  const websiteLinkSchema = Yup.object().shape({
    value: Yup.string().url("The field must contain a valid URL").nullable(),
  });
  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: Yup.object({
      info: Yup.object({
        websiteLink: websiteLinkSchema,
        startFirstSellside: Yup.object(),
        startCurrentEmployeer: Yup.object(),
      }),
    }),
    onSubmit: async (values, helpers): Promise<void> => {
      try {
        await dispatch(updateResearcher(values)).unwrap();
        formik.setFieldValue("info.websiteLink.value", "");
        await dispatch(getResearcherSellside());
        await dispatch(getCountReseacrher());
        setSecondaryTeams([]);
        helpers.resetForm();
        toast.success("Profile successfully updated");
      } catch (err) {
        //@ts-ignore
        toast.error(err.message[0]);
      }
    },
  });

  const isCheckboxSelected = formik.values.info.startFirstSellside.isMarked;
  const selectedDate = formik.values.info.startFirstSellside.value;
  const isCheckboxSelectedEmployeer =
    formik.values.info.startCurrentEmployeer.isMarked;
  const selectedDateEmployeer = formik.values.info.startCurrentEmployeer.value;
  const isValidEmployeer =
    !selectedDateEmployeer && !isCheckboxSelectedEmployeer;
  useEffect(() => {
    const updatedTeamsData = compareDisabledArrays(
      teamsData,
      formik.values.info.suggestedTeams
    );
    setTeamsData(updatedTeamsData);
  }, [formik.values.info.suggestedTeams]);

  const handleChangeTeam = (e: React.ChangeEvent<{ value: unknown }>) => {
    const newTeam: any = {
      dictionaryId: e.target.value as string,
      isMarked: false,
    };
    formik.setFieldValue("info.suggestedTeams", [newTeam]);
  };

  const handleChangeSecondaryTeam = (
    e: React.ChangeEvent<{ value: unknown }>,
    index: number
  ) => {
    const newTeam: any = {
      dictionaryId: e.target.value as string,
      isMarked: false,
    };
    formik.setFieldValue(`info.suggestedTeams[${index + 1}]`, newTeam);
  };

  const handleAddSecondaryTeam = () => {
    setSecondaryTeams([
      ...secondaryTeams,
      { dictionaryId: "", isMarked: false },
    ]);
  };
  const handleRemoveSecondaryTeam = (indexToRemove: number) => {
    const updatedSecondaryTeams = secondaryTeams.filter(
      (_team, index) => index !== indexToRemove
    );
    setSecondaryTeams(updatedSecondaryTeams);
    handleRemoveFormikTeam(indexToRemove + 1);
  };

  const handleRemoveFormikTeam = (indexToRemove: number) => {
    const updatedSuggestedTeams = [...formik.values.info.suggestedTeams];
    updatedSuggestedTeams.splice(indexToRemove, 1);
    formik.setFieldValue("info.suggestedTeams", updatedSuggestedTeams);
  };
  const isRequired = !selectedDate && !isCheckboxSelected;
  const disabled =
    formik.isSubmitting ||
    !(selectedDate || isCheckboxSelected) ||
    !(selectedDateEmployeer || isCheckboxSelectedEmployeer);
  return (
    <>
      {isSuccess && researcherData ? (
        <form onSubmit={formik.handleSubmit}>
          <Card>
            <CardContent sx={{ pt: 0 }}>
              <Grid container spacing={3} rowGap={3}>
                <Grid
                  xs={12}
                  my={5}
                  ml="50px"
                  display="flex"
                  justifyContent="space-between"
                >
                  <Box>
                    {researcherData.profileImage ? (
                      <Box
                        component="img"
                        sx={{
                          width: "200px",
                          mb: "15px",
                        }}
                        alt="Profile image."
                        src={researcherData.profileImage}
                      />
                    ) : (
                      <Box
                        sx={{
                          alignItems: "center",
                          backgroundColor: "#eaecec",
                          borderRadius: 1,
                          display: "flex",
                          height: 200,
                          mb: "15px",
                          justifyContent: "center",
                          width: 200,
                        }}
                      >
                        <SvgIcon>
                          <Image01Icon />
                        </SvgIcon>
                      </Box>
                    )}
                    <Box>
                      <Button
                        href={`https://www.linkedin.com/in/${researcherData.profileId}`}
                        sx={{ width: 200, height: 35 }}
                        variant="contained"
                        target="_blank"
                      >
                        View LinkedIn profile
                      </Button>
                    </Box>
                  </Box>
                  <Typography fontSize={18} variant="body1" mr={5}>
                    {counterData?.sellside} profiles left
                  </Typography>
                </Grid>
                <Grid xs={12} display="flex" mr={13} alignItems="center">
                  <TextField
                    label="Website"
                    name="info.websiteLink.value"
                    fullWidth
                    error={
                      !!(
                        formik.touched.info?.websiteLink?.value &&
                        formik.errors.info?.websiteLink?.value
                      )
                    }
                    helperText={
                      formik.touched.info?.websiteLink?.value &&
                      formik.errors.info?.websiteLink?.value
                    }
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.info.websiteLink.value}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid xs={12} display="flex" alignItems="center" mr={13}>
                  <Checkbox
                    {...label}
                    sx={{ mr: 3, height: 40 }}
                    onChange={(event) => {
                      formik.setFieldValue(
                        "info.firstName.isMarked",
                        event.target.checked
                      );
                    }}
                  />
                  <TextField
                    fullWidth
                    label="First Name"
                    name="info.firstName.value"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.info.firstName.value}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid xs={12} display="flex" mr={13} alignItems="center">
                  <Checkbox
                    {...label}
                    sx={{ mr: 3, height: 40 }}
                    onChange={(event) => {
                      formik.setFieldValue(
                        "info.lastName.isMarked",
                        event.target.checked
                      );
                    }}
                  />
                  <TextField
                    fullWidth
                    label="Last Name"
                    name="info.lastName.value"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.info.lastName.value}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid xs={12} display="flex" mr={13} alignItems="center">
                  <Checkbox
                    {...label}
                    sx={{ mr: 3, height: 40 }}
                    disabled={Boolean(!formik.values.info.gender.dictionaryId)}
                    onChange={(event) => {
                      formik.setFieldValue(
                        "info.gender.isMarked",
                        event.target.checked
                      );
                    }}
                  />
                  <TextField
                    label="Select Gender"
                    name="info.gender.dictionaryId"
                    value={formik.values.info.gender.dictionaryId}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    select
                    SelectProps={{ native: true }}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                  >
                    <option value="" disabled>
                      Select an option
                    </option>
                    {researcherData.dictionaries.gender &&
                      researcherData.dictionaries.gender.map(
                        (option: any, index: any) => (
                          <option key={index} value={option.dictionaryId}>
                            {option.name}
                          </option>
                        )
                      )}
                  </TextField>
                </Grid>
                <Grid xs={12} display="flex" mr={13} alignItems="center">
                  <Checkbox
                    {...label}
                    disabled={Boolean(
                      !formik.values.info.diversity.dictionaryId
                    )}
                    sx={{ mr: 3, height: 40 }}
                    onChange={(event) => {
                      formik.setFieldValue(
                        "info.diversity.isMarked",
                        event.target.checked
                      );
                    }}
                  />

                  <TextField
                    label="Diversity"
                    name="info.diversity.dictionaryId"
                    value={formik.values.info.diversity.dictionaryId}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    select
                    SelectProps={{ native: true }}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                  >
                    <option value="" disabled>
                      Select an option
                    </option>
                    {researcherData.dictionaries.diversity &&
                      researcherData.dictionaries.diversity.map(
                        (option: any, index: any) => (
                          <option key={index} value={option.dictionaryId}>
                            {option.name}
                          </option>
                        )
                      )}
                  </TextField>
                </Grid>
                <Grid xs={12} display="flex" alignItems="center">
                  <Checkbox
                    {...label}
                    sx={{ mr: 3, height: 40 }}
                    disabled={Boolean(!formik.values.info.suggestedTeams[0])}
                    onChange={(event) => {
                      formik.setFieldValue(
                        `info.suggestedTeams[0].isMarked`,
                        event.target.checked
                      );
                    }}
                  />
                  <TextField
                    label="Suggested Team Primary"
                    name="info.suggestedTeams.dictionaryId"
                    value={
                      formik.values.info.suggestedTeams[0]
                        ? formik.values.info.suggestedTeams[0].dictionaryId
                        : ""
                    }
                    onChange={handleChangeTeam}
                    onBlur={formik.handleBlur}
                    select
                    SelectProps={{ native: true }}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                  >
                    <option value="" disabled>
                      Select an option
                    </option>
                    {teamsData &&
                      teamsData.map((option: any, index: any) => (
                        <option
                          key={index}
                          value={option.dictionaryId}
                          disabled={option?.disabled}
                        >
                          {option.name}
                        </option>
                      ))}
                  </TextField>
                  <Tooltip title="+Add Secondary Team">
                    <IconButton
                      sx={{ width: "40px", height: "40px", ml: 3 }}
                      aria-label="+Add"
                      onClick={handleAddSecondaryTeam}
                    >
                      <PlusIcon />
                    </IconButton>
                  </Tooltip>
                </Grid>
                {secondaryTeams.map((team, index) => (
                  <Grid key={index} xs={12} display="flex" alignItems="center">
                    <Checkbox
                      {...label}
                      sx={{ mr: 3, height: 40 }}
                      disabled={Boolean(
                        !formik.values.info.suggestedTeams[index + 1]
                      )}
                      onChange={(event) => {
                        formik.setFieldValue(
                          `info.suggestedTeams[${index + 1}].isMarked`,
                          event.target.checked
                        );
                      }}
                    />
                    <TextField
                      label={`Suggested Team ${index + 1}`}
                      name={`info.suggestedTeams[${index + 1}].dictionaryId`}
                      value={
                        formik.values.info.suggestedTeams[index + 1]
                          ?.dictionaryId || ""
                      }
                      onBlur={formik.handleBlur}
                      select
                      SelectProps={{ native: true }}
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      onChange={(event) =>
                        handleChangeSecondaryTeam(event, index)
                      }
                    >
                      <option value="" disabled>
                        Select an option
                      </option>
                      {teamsData &&
                        teamsData.map((option: any, index: any) => (
                          <option
                            key={index}
                            value={option.dictionaryId}
                            disabled={option?.disabled}
                          >
                            {option.name}
                          </option>
                        ))}
                    </TextField>
                    <Tooltip title="Remove">
                      <IconButton
                        sx={{ width: "40px", height: "40px", ml: 3 }}
                        onClick={() => handleRemoveSecondaryTeam(index)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </Grid>
                ))}
                <Grid xs={12} display="flex" mr={13} alignItems="center">
                  <Checkbox
                    {...label}
                    sx={{ mr: 3, height: 40 }}
                    onChange={(event) => {
                      formik.setFieldValue(
                        "info.startCurrentEmployeer.isMarked",
                        event.target.checked
                      );
                    }}
                  />
                  <DatePicker
                    views={["year", "month"]}
                    inputFormat="MM/yyyy"
                    label="When joined current employer"
                    onChange={handleDateChange}
                    renderInput={(inputProps) => (
                      <TextField {...inputProps} fullWidth />
                    )}
                    value={
                      formik.values.info.startCurrentEmployeer.value ?? null
                    }
                  />
                  {isValidEmployeer && (
                    <Typography
                      variant="caption"
                      color="error"
                      fontSize={16}
                      sx={{ ml: 1 }}
                    >
                      Required
                    </Typography>
                  )}
                </Grid>
                <Grid xs={12} display="flex" mr={13} alignItems="center">
                  <Checkbox
                    {...label}
                    sx={{ mr: 3, height: 40 }}
                    onChange={(event) => {
                      formik.setFieldValue(
                        "info.startFirstSellside.isMarked",
                        event.target.checked
                      );
                    }}
                  />
                  <DatePicker
                    views={["year", "month"]}
                    inputFormat="MM/yyyy"
                    label="When started 1st sellside role"
                    onChange={handleDateChangeStarted}
                    renderInput={(inputProps) => (
                      <TextField {...inputProps} fullWidth />
                    )}
                    value={formik.values.info.startFirstSellside.value ?? null}
                  />
                  {isRequired && (
                    <Typography
                      variant="caption"
                      color="error"
                      fontSize={16}
                      sx={{ ml: 1 }}
                    >
                      Required
                    </Typography>
                  )}
                </Grid>

                <Grid xs={12} display="flex" justifyContent="end" mr={13}>
                  <FormControlLabel
                    onChange={handleSameDate}
                    control={<Checkbox sx={{ ml: "10px" }} />}
                    label="Same as above role"
                  />
                </Grid>
                <Grid xs={12}>
                  <Typography variant="h3" mt={15} mb={6} ml={4}>
                    Education
                  </Typography>
                  {formik.values.info.education && (
                    <EducationList
                      formikUpdate={formik}
                      data={formik.values.info.education}
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
              sx={{ p: 3, justifyContent: "space-between" }}
            >
              <Button disabled={disabled} type="submit" variant="contained">
                Submit
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={toggleArchiveDialog}
              >
                Archive
              </Button>
              <ArchiveModal
                open={isArchiveOpen}
                onClose={toggleArchiveDialog}
                handleArchiveProfile={handleArchiveProfile}
                id={formik.values.profileId}
              />
            </Stack>
          </Card>
        </form>
      ) : (
        <Card>
          <Typography variant="h3" p={10} textAlign="center">
            No profiles to check
          </Typography>
        </Card>
      )}
    </>
  );
};
