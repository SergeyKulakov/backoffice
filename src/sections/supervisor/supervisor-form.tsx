import React, { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import styled from "@emotion/styled";
import * as Yup from "yup";
import { useFormik } from "formik";
import Image01Icon from "@untitled-ui/icons-react/build/esm/Image01";

import { useDispatch, useSelector } from "../../store";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Stack,
  Checkbox,
  Typography,
  Box,
  TextField,
  Unstable_Grid2 as Grid,
  IconButton,
  Tooltip,
  FormControlLabel,
  SvgIcon,
  TextareaAutosize,
  Collapse,
  MenuItem,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { paths } from "../../paths";
import {
  GenderOption,
  ISecondaryTeam,
  MockOption,
  Values,
} from "../../types/researcher";
import { NotificationList } from "./notification-list";
import {
  dataCarrier,
  dataEducation,
  mockInfoButton,
} from "../../mocks/supervisor";
import PlusIcon from "@untitled-ui/icons-react/build/esm/Plus";
import DeleteIcon from "@mui/icons-material/Delete";
import { ButtonsList } from "./buttons-list";
import { EducationList } from "../supervisor/education-list";
import { useFilteredIndexData } from "../../hooks/useFilteredIndexData";
import { CarrierList } from "./carrier-list";
import { ArchiveModal } from "../../components/pages/researcher/ArchiveModal";
import { ValuesSupervisiorBuysideNew } from "../../types/supervisor";
import jsonRes from "../../types/supervisor.json";
import {
  getSupervisorSellside,
  updateProfile,
  updateSupervisor,
} from "../../thunks/supervisor";
import { getCountSupervisor } from "../../thunks/counter";
import { compareDisabledArrays } from "../../utils/compareDisabledArray";
import { IndexList } from "./IndexList";

export const SupervisorForm: FC = () => {
  const [isHide, setIsHide] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  // @ts-ignore
  const supervisorData: ValuesSupervisiorBuysideNew = useSelector(
    (state) => state.supervisor.supervisorSellside
  );
  const isSuccess = useSelector((state) => state.supervisor.isSuccess);
  const counterData = useSelector((state) => state.counter.dataSupervisor);
  const dispatch = useDispatch();
  const filteredData = useFilteredIndexData(supervisorData);

  useEffect(() => {
    dispatch(getSupervisorSellside());
    dispatch(getCountSupervisor());
  }, [dispatch]);
  useEffect(() => {
    if (isSuccess && supervisorData) {
      setIsLoading(false);
      setTeamsData(supervisorData?.dictionaries?.suggestedTeam as any);
    }
  }, [isSuccess, supervisorData]);
  //@ts-ignore
  const initialValues: ValuesSupervisiorBuysideNew = {
    isArchived: false,
    profileId: supervisorData?.profileId,
    profileType: supervisorData?.profileType,
    profileImage: supervisorData?.profileImage,
    info: {
      websiteLink: {
        value: supervisorData?.info.websiteLink?.value,
        isMarked: supervisorData?.info.websiteLink?.isMarked,
        moveId: supervisorData?.info.websiteLink?.moveId,
      },
      firstName: {
        isMarked: supervisorData?.info.firstName.isMarked,
        moveId: supervisorData?.info.firstName.moveId,
        value: supervisorData?.info.firstName.value,
      },
      lastName: {
        isMarked: supervisorData?.info.lastName.isMarked,
        moveId: supervisorData?.info.lastName.moveId,
        value: supervisorData?.info.lastName.value,
      },
      gender: {
        dictionaryId: supervisorData?.info.gender?.value || null,
        isMarked: false,
      },
      diversity: {
        dictionaryId: supervisorData?.info.diversity.value || null,
        isMarked: false,
      },
      education: supervisorData?.info.education,
      suggestedStrategy: supervisorData?.info.suggestedStrategy || [],
      currentEmployment: supervisorData?.info.currentEmployment || null,
      suggestedCoverage: {
        dictionaryId: supervisorData?.info.suggestedCoverage?.value || null,
        isMarked: false,
      },
      suggestedGeography: {
        dictionaryId: supervisorData?.info.suggestedGeography?.value || null,
        isMarked: false,
      },
      suggestedTeams: [
        { dictionaryId: supervisorData?.info.suggestedTeam[0]?.value || null },
      ],
      startCurrentEmployeer: {
        isMarked: false,
        moveId: supervisorData?.info?.startCurrentEmployeer?.moveId || null,
        value: supervisorData?.info?.startCurrentEmployeer?.value || null,
      },
      startFirstBuyside: {
        isMarked: false,
        moveId: supervisorData?.info?.startFirstBuyside?.moveId || null,
        value: supervisorData?.info?.startFirstBuyside?.value || null,
      },
      startFirstSellside: {
        isMarked: false,
        moveId: supervisorData?.info?.startFirstSellside?.moveId || null,
        value: supervisorData?.info?.startFirstSellside?.value || null,
      },
      languages: {
        native: supervisorData?.info?.languages?.native || null,
        others: supervisorData?.info?.languages?.others || null,
      },
      subtitle: {
        isMarked: false,
        moveId: supervisorData?.info?.subtitle?.moveId || null,
        value: supervisorData?.info?.subtitle?.value || null,
      },
      summary: {
        isMarked: false,
        moveId: supervisorData?.info?.summary?.moveId || null,
        value: supervisorData?.info?.summary?.value || null,
      },
    },
  };
  const [selectedGender, setSelectedGender] = useState<string>("");
  const [selectedTeam, setSelectedTeam] = useState<string>("");

  const [isArchiveOpen, setIsArchiveOpen] = useState(false);
  const [isSubtitleBioOpen, setIsSubtitleBioOpen] = useState(false);
  const [isHideEducation, setIsHideEducation] = useState(false);
  const [isHideCarrierHistory, setIsHideCarrierHistory] = useState(false);
  const [isHideLanguages, setIsHideLanguages] = useState(false);
  const [userName, setUserName] = useState(
    supervisorData?.info.firstName.value
  );
  const [secondaryTeams, setSecondaryTeams] = useState<ISecondaryTeam[]>([]);
  const [teamsData, setTeamsData] = useState([]);
  const [userLastName, setLastName] = useState(
    supervisorData?.info.lastName.value
  );
  const [storedSubTeams, setStoredSubTeams] = useState<any>([]);

  const [userSubtitle, setUserSubtitle] = useState(
    supervisorData?.info.subtitle?.value ?? ""
  );
  const [userSummary, setUserSummary] = useState(
    supervisorData?.info.summary?.value ?? ""
  );
  const handleUserSubtitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserSubtitle(event.target.value);
  };
  const handleUserSummary = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserSummary(event.target.value);
  };
  const [subTeams, setSubTeams] = useState<string[]>([""]);

  const handleArchiveProfile = async (id: string) => {
    await dispatch(updateProfile(id));
    await toggleArchiveDialog();
    await dispatch(getSupervisorSellside());
    await dispatch(getCountSupervisor());
  };

  useEffect(() => {
    if (supervisorData) {
      setUserName(supervisorData.info.firstName.value);
      setLastName(supervisorData.info.lastName.value);
      setSelectedGender(
        supervisorData.dictionaries.gender.find(
          (gender: any) =>
            gender.dictionaryId === supervisorData.info.gender?.value
        )?.name || ""
      );
      const subTeamsArray = supervisorData.info.suggestedTeam.slice(1);
      const newSubTeamsArray = [...subTeamsArray];

      newSubTeamsArray.forEach((team, index) => {
        const name =
          supervisorData.dictionaries.suggestedTeam.find(
            (t: any) => t.dictionaryId === team.value
          )?.name || "";
        newSubTeamsArray[index] = { ...team, name };
      });

      setSubTeams(newSubTeamsArray);
      setSelectedTeam(
        supervisorData.dictionaries.suggestedTeam.find(
          (gender: any) =>
            gender.dictionaryId === supervisorData.info.suggestedTeam[0]?.value
        )?.name || ""
      );
      const diversityOption = supervisorData.dictionaries.diversity.find(
        (diversity) =>
          diversity.dictionaryId === supervisorData.info.diversity.value
      );
      setSelectedDiversity(diversityOption?.name || "");

      setUserSubtitle(supervisorData.info.subtitle?.value || "");
      setUserSummary(supervisorData.info.summary?.value || "");
    }
  }, [supervisorData]);

  const toggleSubtitleBio = () => {
    setIsSubtitleBioOpen(!isSubtitleBioOpen);
  };

  useEffect(() => {
    if (supervisorData && supervisorData.info.education.length > 0) {
      setIsHideEducation(true);
    }
  }, [supervisorData]);

  const toggleEducation = () => {
    setIsHideEducation((prevState) => !prevState);
  };

  const toggleCarrierHistory = () => {
    setIsHideCarrierHistory((prevState) => !prevState);
  };
  const toggleLanguages = () => {
    setIsHideLanguages((prevState) => !prevState);
  };
  const toggleArchiveDialog = () => {
    setIsArchiveOpen((prevState) => !prevState);
  };

  const [selectedDiversity, setSelectedDiversity] = useState<string>("");
  const [selectedTeamSecondary, setSelectedTeamSecondary] =
    useState<string>("");
  const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedGender = event.target.value;
    setSelectedGender(selectedGender);

    const genderData = supervisorData.dictionaries.gender.find(
      (gender) => gender.name === selectedGender
    );

    if (genderData) {
      formik.setFieldValue("info.gender.dictionaryId", genderData.dictionaryId);
    }
  };

  const handleDiversityChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    const selectedId = event.target.value as string;
    const diversityData = supervisorData.dictionaries.diversity.find(
      (diversity) => diversity.dictionaryId === selectedId
    );

    if (diversityData) {
      setSelectedDiversity(diversityData.name);
      formik.setFieldValue("info.diversity.dictionaryId", selectedId);
    }
  };
  const handleChangeTeam = (event: React.ChangeEvent<{ value: unknown }>) => {
    const selectedTeams = event.target.value;
    setSelectedTeam(selectedTeams as string);
    const teamData = supervisorData.dictionaries.suggestedTeam.find(
      (team) => team.name === selectedTeams
    );
    if (teamData) {
      formik.setFieldValue(
        "info.suggestedTeams[0].dictionaryId",
        teamData.dictionaryId
      );
    }
  };

  const handleSameDate = () => {
    formik.setFieldValue(
      "info.startFirstSellside",
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

  const handleUserName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };
  const handleUserLastName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value);
  };
  const handleRemoveSubTeam = (index: number) => {
    const newSubTeams = [...subTeams];
    newSubTeams.splice(index, 1);
    setSubTeams(newSubTeams);

    const newStoredSubTeams = [...storedSubTeams];
    newStoredSubTeams.splice(index, 1);
    setStoredSubTeams(newStoredSubTeams);

    const updatedSuggestedTeams = [...formik.values.info.suggestedTeams];
    updatedSuggestedTeams.splice(index + 1, 1);
    formik.setFieldValue("info.suggestedTeams", updatedSuggestedTeams);
  };

  const handleChangeSecondaryTeam = (
    e: React.ChangeEvent<{ value: unknown }>,
    index: number
  ) => {
    const newTeam: any = {
      dictionaryId: e.target.value as string,
      isMarked: false,
    };

    const updatedSuggestedTeams = [...formik.values.info.suggestedTeams];

    updatedSuggestedTeams[index + 1] = newTeam;

    const combinedTeams = [...updatedSuggestedTeams, ...storedSubTeams];

    formik.setFieldValue("info.suggestedTeams", combinedTeams);

    setSelectedTeamSecondary(newTeam.dictionaryId);
  };

  const handleAddSecondaryTeam = () => {
    setSecondaryTeams([
      ...secondaryTeams,
      { dictionaryId: "", isMarked: false },
    ]);
    formik.setFieldValue(`info.suggestedTeams[${secondaryTeams.length + 1}]`, {
      dictionaryId: "",
      isMarked: false,
    });
  };
  useEffect(() => {
    const newTeams =
      subTeams &&
      subTeams.map((team: any) => ({
        dictionaryId: team.value,
        isMarked: false,
      }));

    setStoredSubTeams(newTeams);

    const updatedSuggestedTeams = [
      ...formik.values.info.suggestedTeams.slice(0, 1),
      ...newTeams,
    ];

    formik.setFieldValue("info.suggestedTeams", updatedSuggestedTeams);

    return () => {
      setStoredSubTeams([]);
    };
  }, [subTeams]);

  const router = useRouter();
  const removeDuplicates = (arr: any[]) => {
    const uniqueArr = arr.reduce((acc: any[], item: any) => {
      const exists = acc.some(
        (elem: any) => elem.dictionaryId === item.dictionaryId
      );
      if (!exists) {
        acc.push(item);
      }
      return acc;
    }, []);

    return uniqueArr;
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
      }),
    }),
    onSubmit: async (values, helpers): Promise<void> => {
      try {
        const uniqueSuggestedTeams = removeDuplicates(
          values.info.suggestedTeams
        );
        const updatedValues = {
          ...values,
          info: {
            ...values.info,
            suggestedTeams: uniqueSuggestedTeams,
          },
        };

        await dispatch(updateSupervisor(updatedValues)).unwrap();
        formik.setFieldValue("info.websiteLink.value", "");
        await dispatch(getSupervisorSellside());
        await dispatch(getCountSupervisor());
        setSecondaryTeams([]);
        helpers.resetForm();
        toast.success("Profile success updated");
      } catch (err) {
        // @ts-ignore
        toast.error(err.message[0]);
      }
    },
  });

  useEffect(() => {
    const updatedTeamsData = compareDisabledArrays(
      teamsData,
      formik.values.info.suggestedTeams
    );

    setTeamsData(updatedTeamsData);
  }, [formik.values.info.suggestedTeams]);

  const handleRemoveSecondaryTeam = (index: number) => {
    const updatedSecondaryTeams = [...secondaryTeams];
    updatedSecondaryTeams.splice(index, 1);
    setSecondaryTeams(updatedSecondaryTeams);

    const updatedSuggestedTeams = [...formik.values.info.suggestedTeams];
    updatedSuggestedTeams.splice(index + 1, 1);
    formik.setFieldValue("info.suggestedTeams", updatedSuggestedTeams);
  };
  const selectedDateEmployeer = formik.values.info.startCurrentEmployeer.value;
  const selectedDate = formik.values.info.startFirstSellside.value;
  const isDisabled =
    formik.isSubmitting || !(selectedDate && selectedDateEmployeer);
  return (
    <>
      {isSuccess && supervisorData ? (
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
                    {supervisorData.profileImage ? (
                      <Box
                        component="img"
                        sx={{
                          width: "200px",
                          mb: "15px",
                        }}
                        alt="Profile image."
                        src={supervisorData.profileImage}
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
                        href={`https://www.linkedin.com/in/${supervisorData.profileId}`}
                        sx={{ width: 200, height: 35 }}
                        variant="contained"
                        target="_blank"
                      >
                        View LinkedIn profile
                      </Button>
                    </Box>
                  </Box>
                  <Typography fontSize={18} variant="body1" mr={5}>
                    {counterData && counterData.sellside} profiles left
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
                <Grid xs={12} display="flex" mr={13}>
                  <TextField
                    fullWidth
                    label="First Name"
                    name="info.firstName.value"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.info.firstName.value}
                    InputLabelProps={{ shrink: true }}
                    error={
                      supervisorData.info.firstName?.isMarked === true ?? ""
                    }
                  />
                </Grid>
                <Grid xs={12} display="flex" mr={13}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    name="info.lastName.value"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.info.lastName.value}
                    InputLabelProps={{ shrink: true }}
                    error={
                      supervisorData.info.lastName?.isMarked === true ?? ""
                    }
                  />
                </Grid>
                <Grid xs={12} display="flex" mr={13}>
                  <TextField
                    label="Select Gender"
                    name="gender"
                    value={selectedGender}
                    onChange={handleGenderChange}
                    onBlur={formik.handleBlur}
                    select
                    SelectProps={{ native: true }}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    error={supervisorData.info.gender?.isMarked === true ?? ""}
                  >
                    <option value="" disabled>
                      Select an option
                    </option>
                    {supervisorData.dictionaries.gender &&
                      supervisorData.dictionaries.gender.map(
                        (option: any, index: any) => (
                          <option key={index} value={option.name}>
                            {option.name}
                          </option>
                        )
                      )}
                  </TextField>
                </Grid>
                <Grid xs={12} display="flex" mr={13}>
                  <TextField
                    label="Diversity"
                    name="diversity"
                    value={selectedDiversity ?? ""}
                    onChange={handleDiversityChange}
                    onBlur={formik.handleBlur}
                    select
                    SelectProps={{ native: true }}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    error={
                      supervisorData.info.diversity?.isMarked === true ?? ""
                    }
                  >
                    <option value="" disabled>
                      Select an option
                    </option>
                    {supervisorData.dictionaries.diversity &&
                      supervisorData.dictionaries.diversity.map(
                        (option: any, index: any) => (
                          <option key={index} value={option.value}>
                            {option.name}
                          </option>
                        )
                      )}
                  </TextField>
                </Grid>
                <Grid xs={12} display="flex" alignItems="center">
                  <TextField
                    label="Suggested Team"
                    name="suggestedTeams"
                    value={selectedTeam}
                    onChange={handleChangeTeam}
                    select
                    fullWidth
                  >
                    <MenuItem value="">Select a team</MenuItem>
                    {teamsData.map((team: any) => (
                      <MenuItem key={team.dictionaryId} value={team.name}>
                        {team.name}
                      </MenuItem>
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
                  <Grid xs={12} display="flex" mr={13} key={index}>
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

                {subTeams &&
                  subTeams.map((subTeam, index) => (
                    <Grid xs={12} display="flex" mr={13} key={index}>
                      <TextField
                        label={`Sub Team ${index + 1}`}
                        name={`info.subTeams[${index}].name`}
                        //@ts-ignore
                        value={subTeam.name}
                        disabled
                        onBlur={formik.handleBlur}
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                      />
                      <Tooltip title="Remove Sub Team">
                        <IconButton
                          sx={{ width: "40px", height: "40px", ml: 3 }}
                          aria-label="remove"
                          onClick={() => handleRemoveSubTeam(index)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </Grid>
                  ))}

                <Grid xs={12} display="flex" mr={13} alignItems="center">
                  <DatePicker
                    views={["year", "month"]}
                    inputFormat="MM/yyyy"
                    label="When joined current employer"
                    onChange={handleDateChange}
                    renderInput={(inputProps) => (
                      <TextField
                        {...inputProps}
                        error={
                          supervisorData.info.startCurrentEmployeer
                            ?.isMarked === true ?? ""
                        }
                        fullWidth
                      />
                    )}
                    value={formik.values.info.startCurrentEmployeer.value}
                  />
                  {!selectedDateEmployeer && (
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
                  <DatePicker
                    views={["year", "month"]}
                    inputFormat="MM/yyyy"
                    label="When started 1st sellside role"
                    onChange={handleDateChangeStarted}
                    renderInput={(inputProps) => (
                      <TextField
                        {...inputProps}
                        error={
                          supervisorData.info.startFirstSellside?.isMarked ===
                            true ?? ""
                        }
                        fullWidth
                      />
                    )}
                    value={formik.values.info.startFirstSellside.value}
                  />
                  {!selectedDate && (
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
                <Grid xs={12} display="flex" mr={13} flexDirection="column">
                  <Typography
                    variant="h3"
                    mt={5}
                    mb={5}
                    onClick={toggleSubtitleBio}
                    sx={{ cursor: "pointer" }}
                  >
                    {isSubtitleBioOpen
                      ? "- Subtitle and full bio"
                      : "+ Subtitle and full bio"}
                  </Typography>
                  <Collapse in={isSubtitleBioOpen} timeout="auto" unmountOnExit>
                    <TextField
                      fullWidth
                      label="Subtitle"
                      name="subtitle"
                      InputLabelProps={{ shrink: true }}
                      onBlur={formik.handleBlur}
                      onChange={handleUserSubtitle}
                      // @ts-ignore
                      value={userSubtitle}
                      error={
                        supervisorData.info.subtitle?.isMarked === true ?? ""
                      }
                      sx={{ mb: "20px" }}
                    />
                    <TextField
                      rows={5}
                      minRows={4}
                      multiline
                      name="summary"
                      maxRows={4}
                      style={{ width: "100%" }}
                      placeholder="Write your biography here..."
                      onChange={handleUserSummary as any}
                      onBlur={formik.handleBlur}
                      value={userSummary}
                    />
                    {supervisorData.info.summary?.isMarked && (
                      <Typography variant="caption" color="error">
                        Error
                      </Typography>
                    )}
                  </Collapse>
                </Grid>
                <Grid xs={12}>
                  <Typography
                    variant="h3"
                    mt={5}
                    mb={5}
                    onClick={toggleEducation}
                    sx={{ cursor: "pointer" }}
                  >
                    {isHideEducation ? "- Full Education" : "+ Full Education"}
                  </Typography>
                  <Collapse in={isHideEducation} timeout="auto" unmountOnExit>
                    <EducationList
                      formikUpdate={formik}
                      data={supervisorData.info.education ?? ""}
                    />
                  </Collapse>
                </Grid>
                <Grid xs={12}>
                  <Typography
                    variant="h3"
                    mt={5}
                    mb={5}
                    onClick={toggleCarrierHistory}
                    sx={{ cursor: "pointer" }}
                  >
                    {isHideCarrierHistory
                      ? "- Full Carrier History"
                      : "+ Full Carrier History"}
                  </Typography>
                  <Collapse
                    in={isHideCarrierHistory}
                    timeout="auto"
                    unmountOnExit
                  >
                    <CarrierList
                      data={supervisorData.info.currentEmployment ?? ""}
                      formikUpdate={formik}
                      profileType={supervisorData?.profileType}
                    />
                  </Collapse>
                </Grid>
                <Grid xs={12}>
                  <Typography
                    variant="h3"
                    mt={5}
                    mb={5}
                    onClick={toggleLanguages}
                    sx={{ cursor: "pointer" }}
                  >
                    {isHideLanguages ? "- Languages" : "+ Languages"}
                  </Typography>
                  <Collapse in={isHideLanguages} timeout="auto" unmountOnExit>
                    <TextField
                      label="Native Language"
                      name="languages"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      SelectProps={{ native: true }}
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      //@ts-ignore
                      value={supervisorData.info.languages?.native.value ?? ""}
                      InputProps={{
                        readOnly: true,
                      }}
                      sx={{ mb: "20px" }}
                      error={
                        supervisorData.info.languages.native?.IsMarked ===
                          true ?? ""
                      }
                    />
                    <TextField
                      label="Other Languages"
                      name="languages"
                      InputLabelProps={{ shrink: true }}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      SelectProps={{ native: true }}
                      fullWidth
                      InputProps={{
                        readOnly: true,
                      }}
                      value={
                        supervisorData.info.languages?.others
                          .map((lang: any) => lang.value)
                          .join(", ") ?? ""
                      }
                      error={supervisorData.info.languages?.others.some(
                        (lang: any) => lang.IsMarked === true
                      )}
                    />
                  </Collapse>
                </Grid>
                <Grid xs={8} />
              </Grid>
              <IndexList data={filteredData} formik={formik} />
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
              <Button disabled={isDisabled} type="submit" variant="contained">
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
