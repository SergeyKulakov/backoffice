import React, { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { FormikErrors, useFormik } from "formik";
import { useRouter } from "next/router";
import Image01Icon from "@untitled-ui/icons-react/build/esm/Image01";
import {
  Button,
  Card,
  SvgIcon,
  CardContent,
  Stack,
  Checkbox,
  Typography,
  Box,
  TextField,
  FormControlLabel,
  Unstable_Grid2 as Grid,
  Tooltip,
  IconButton,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { paths } from "../../paths";
import { EducationList } from "../researcher/education-list";
import { EmployerList } from "../researcher/employer-list";
import { ArchiveModal } from "../../components/pages/researcher/ArchiveModal";
import { useDispatch, useSelector } from "../../store";
import {
  getResearcherBuyside,
  updateResearcher,
} from "../../thunks/researcher";
import { getCountReseacrher } from "../../thunks/counter";
import PlusIcon from "@untitled-ui/icons-react/build/esm/Plus";
import {
  IResearcherSellside,
  ISecondaryStrategy,
  ISecondaryTeam,
} from "../../types/researcher";
import DeleteIcon from "@mui/icons-material/Delete";
import { compareDisabledArrays } from "../../utils/compareDisabledArray";
import OptionsSelect from "../../components/form/Options";
import RemoveButton from "../../components/form/RemoveButton";
import AddButton from "../../components/form/AddButton";
import { updateProfile } from "../../thunks/supervisor";
const label = { inputProps: { "aria-label": "Checkbox" } };
interface Strategy {
  dictionaryId?: string;
  name?: string;
  subStrategies: {
    dictionaryId?: string;
    name?: string;
  };
  sub?: {
    dictionaryId?: string;
    name?: string;
  };
  disabled?: boolean;
}

export const NewProfilesForm: FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const researcherData: any = useSelector(
    (state) => state.researcher.researcherBuyside
  );
  const counterData = useSelector((state) => state.counter.dataResearcher);
  const isSuccess = useSelector((state) => state.researcher.isSuccess);
  const [isArchiveOpen, setIsArchiveOpen] = useState(false);
  const [secondaryStrategy, setSecondaryStrategy] = useState<ISecondaryTeam[]>(
    []
  );
  const [secondarySubStrategy, setSecondarySubStrategy] = useState<
    ISecondaryTeam[]
  >([]);
  const [strategyData, setStrategyData] = useState<Strategy[]>([]);
  const [secondaryTeams, setSecondaryTeams] = useState<ISecondaryTeam[]>([]);
  const [teamsData, setTeamsData] = useState([]);
  const [selectedStrategy, setSelectedStrategy] = useState<string>("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getResearcherBuyside());
    dispatch(getCountReseacrher());
  }, [dispatch]);
  useEffect(() => {
    if (isSuccess && researcherData) {
      setIsLoading(false);
      setStrategyData(researcherData?.dictionaries?.suggestedStrategy);
      setTeamsData(researcherData?.dictionaries?.suggestedTeam);
    }
  }, [isSuccess, researcherData]);

  const handleArchiveProfile = async (id: string) => {
    await dispatch(updateProfile(id));
    await toggleArchiveDialog();
    await dispatch(getResearcherBuyside());
    await dispatch(getCountReseacrher());
  };

  const initialValues: any = {
    isArchived: false,
    profileId: researcherData?.profileId,
    profileType: researcherData?.profileType,
    info: {
      websiteLink: {
        value: researcherData?.info.websiteLink?.value || "",
        isMarked: researcherData?.info.websiteLink?.isMarked,
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
      gender: {
        dictionaryId: "",
        isMarked: false,
      },
      diversity: {
        dictionaryId: "",
        isMarked: false,
      },
      education: researcherData?.info.education,
      currentEmployment: researcherData?.info.currentEmployment,
      suggestedCoverage: {
        dictionaryId: "",
        isMarked: false,
      },
      suggestedGeography: {
        dictionaryId: "",
        isMarked: false,
      },
      suggestedStrategy: [],
      suggestedTeams: [],
      startCurrentEmployeer: {
        isMarked: false,
        moveId: researcherData?.info?.startCurrentEmployeer?.moveId || null,
        value: researcherData?.info?.startCurrentEmployeer?.value || null,
      },
      startFirstBuyside: {
        isMarked: false,
        moveId: researcherData?.info?.startFirstBuyside?.moveId || null,
        value: researcherData?.info?.startFirstBuyside?.value || null,
      },
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
  const websiteLinkSchema = Yup.object().shape({
    value: Yup.string().url("The field must contain a valid URL").nullable(),
  });
  const router = useRouter();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: Yup.object({
      info: Yup.object({
        websiteLink: websiteLinkSchema,
        startCurrentEmployeer: Yup.object(),
        startFirstBuyside: Yup.object(),
        startFirstSellside: Yup.object(),
      }),
    }),
    onSubmit: async (values, helpers): Promise<void> => {
      try {
        await dispatch(updateResearcher(values)).unwrap();
        formik.setFieldValue("info.websiteLink.value", "");
        await dispatch(getResearcherBuyside());
        await dispatch(getCountReseacrher());
        setSecondaryTeams([]);
        setSecondaryStrategy([]);
        helpers.resetForm();
        toast.success("Profile success updated");
      } catch (err) {
        // @ts-ignore
        toast.error(err.message[0]);
      }
    },
  });

  const handleDateChange = (date: Date | null) => {
    if (date) {
      formik.setFieldValue("info.startCurrentEmployeer.value", date);
    }
  };

  const handleDateChangeInvestment = (date: Date | null) => {
    if (date) {
      formik.setFieldValue("info.startFirstBuyside.value", date);
    }
  };

  const handleDateChangeStarted = (date: Date | null) => {
    if (date) {
      formik.setFieldValue("info.startFirstSellside.value", date);
    }
  };

  const handleAddSecondaryStrategy = () => {
    setSecondaryStrategy([
      ...secondaryStrategy,
      { dictionaryId: "", isMarked: false },
    ]);
  };
  const handleAddSecondarySubStrategy = () => {
    setSecondarySubStrategy([
      ...secondarySubStrategy,
      { dictionaryId: "", isMarked: false },
    ]);
  };

  const handleChangeStrategy = (e: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedStrategy(e.target.value as string);
    if (e.target.value) {
      const newSubStrategy: any = {
        dictionaryId: "",
        isMarked: false,
      };
      const newStrategy: any = {
        dictionaryId: e.target.value as string,
        isMarked: false,
        sub: [newSubStrategy],
      };
      formik.setFieldValue("info.suggestedStrategy", [newStrategy]);
    } else {
      formik.setFieldValue("info.suggestedStrategy", []);
    }
  };

  const handleChangeSubStrategy = (
    e: React.ChangeEvent<{ value: unknown }>
  ) => {
    const currentStrategy = formik.values.info.suggestedStrategy?.[0];
    if (currentStrategy) {
      currentStrategy.sub[0].dictionaryId = e.target.value as string;
      formik.setFieldValue("info.suggestedStrategy", [currentStrategy]);
    }
  };

  const handleChangeSecondaryStrategy = (
    e: React.ChangeEvent<{ value: unknown }>,
    index: number
  ) => {
    const newSubStrategy: ISecondaryStrategy = {
      dictionaryId: e.target.value as string,
      isMarked: false,
    };
    const newStrategy: ISecondaryStrategy = {
      dictionaryId: e.target.value as string,
      isMarked: false,
      sub: [newSubStrategy],
    };
    formik.setFieldValue(`info.suggestedStrategy[${index + 1}]`, newStrategy);
  };

  const handleChangeSubSecondaryStrategy = (
    e: React.ChangeEvent<{ value: unknown }>,
    index: number
  ) => {
    const newStrategy: ISecondaryStrategy = {
      dictionaryId: e.target.value as string,
      isMarked: false,
    };
    formik.setFieldValue(
      `info.suggestedStrategy[0].sub[${index + 1}]`,
      newStrategy
    );
  };

  const handleAddThirdSubStrategy = (index: number) => {
    const newSubStrategy: ISecondaryStrategy = {
      dictionaryId: "",
      isMarked: false,
    };

    formik.setFieldValue(
      `info.suggestedStrategy[${index + 1}].sub[${
        formik.values.info.suggestedStrategy[index + 1].sub.length
      }]`,
      newSubStrategy
    );
  };

  const subStrategiesData = strategyData.find(
    (strategy) => strategy.dictionaryId === selectedStrategy
  )?.subStrategies as { dictionaryId: string; name: string }[];

  const subSecondaryStrategiesData = (item: ISecondaryStrategy) => {
    return strategyData.find(
      (strategy) => strategy.dictionaryId === item.dictionaryId
    )?.subStrategies as { dictionaryId: string; name: string }[];
  };

  const handleRemoveSecondaryStrategy = (indexToRemove: number) => {
    const updatedStrategy = secondaryStrategy.filter(
      (_team, index) => index !== indexToRemove
    );
    setSecondaryStrategy(updatedStrategy);
    handleRemoveFormikStrategy(indexToRemove + 1);
  };
  const handleRemoveThirdSubStrategy = (index: number, subIndex: number) => {
    const newSubStrategies = [
      ...formik.values.info.suggestedStrategy[index + 1].sub,
    ];
    newSubStrategies.splice(subIndex, 1);
    formik.setFieldValue(
      `info.suggestedStrategy[${index + 1}].sub`,
      newSubStrategies
    );
  };

  const handleCgangeThirdSubStrategy = (
    value: string,
    index: number,
    subIndex: number,
    subStrategy: any,
    setFieldValue: any
  ) => {
    const newSubStrategies = [
      ...formik.values.info.suggestedStrategy[index + 1].sub,
    ];

    newSubStrategies[subIndex] = {
      ...subStrategy,
      dictionaryId: value,
    };

    setFieldValue(`info.suggestedStrategy[${index + 1}].sub`, newSubStrategies);
  };

  const handleRemoveFormikStrategy = (indexToRemove: number) => {
    const updatedSuggestedStrategy = [...formik.values.info.suggestedStrategy];
    updatedSuggestedStrategy.splice(indexToRemove, 1);
    formik.setFieldValue("info.suggestedStrategy", updatedSuggestedStrategy);
  };

  useEffect(() => {
    const updatedTeamsData = compareDisabledArrays(
      teamsData,
      formik.values.info.suggestedTeams
    );
    setTeamsData(updatedTeamsData);
  }, [formik.values.info.suggestedTeams]);

  const handleRemoveSecondarySubStrategy = (index: number) => {
    const updatedSubStrategies = [...secondarySubStrategy];
    updatedSubStrategies.splice(index, 1);
    setSecondarySubStrategy(updatedSubStrategies);

    const updatedSuggestedStrategy = {
      ...formik.values.info.suggestedStrategy[0],
    };
    updatedSuggestedStrategy.sub.splice(index + 1, 1);

    formik.setValues({
      ...formik.values,
      info: {
        ...formik.values.info,
        suggestedStrategy: [updatedSuggestedStrategy],
      },
    });
  };

  useEffect(() => {
    const updatedTeamsData = compareDisabledArrays(
      strategyData,
      formik.values.info.suggestedStrategy
    );
    setStrategyData(updatedTeamsData);
  }, [formik.values.info.suggestedStrategy]);

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
  const isCheckboxSelected = formik.values.info.startFirstBuyside.isMarked;
  const selectedDate = formik.values.info.startFirstBuyside.value;
  const isSellsideCheckboxSelected =
    formik.values.info.startFirstSellside.isMarked;
  const sellsideSelectedDate = formik.values.info.startFirstSellside.value;
  const isNoSellsideMarked = formik.values.info.isNoSellsideMarked;
  const isCheckboxSelectedEmployeer =
    formik.values.info.startCurrentEmployeer.isMarked;
  const selectedDateEmployeer = formik.values.info.startCurrentEmployeer.value;
  const websiteLinkError = (formik.errors as FormikErrors<IResearcherSellside>)
    .info?.websiteLink?.value;
  //@ts-ignore
  const websiteLinkTouched = formik.touched.info?.websiteLink?.value;
  const isValidEmployeer =
    !selectedDateEmployeer && !isCheckboxSelectedEmployeer;
  const isRequired = !selectedDate && !isCheckboxSelected;
  const isRequiredSellside =
    !sellsideSelectedDate && !isSellsideCheckboxSelected && !isNoSellsideMarked;
  const disabled =
    formik.isSubmitting ||
    !(selectedDate || isCheckboxSelected) ||
    !(selectedDateEmployeer || isCheckboxSelectedEmployeer) ||
    !(sellsideSelectedDate || isSellsideCheckboxSelected || isNoSellsideMarked);
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
                    {counterData?.buyside} profiles left
                  </Typography>
                </Grid>
                <Grid xs={12} display="flex" mr={13} alignItems="center">
                  <TextField
                    label="Website"
                    name="info.websiteLink.value"
                    error={!!(websiteLinkTouched && websiteLinkError)}
                    helperText={websiteLinkTouched && websiteLinkError}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.info.websiteLink.value}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
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
                    <OptionsSelect data={researcherData.dictionaries.gender} />
                  </TextField>
                </Grid>
                <Grid xs={12} display="flex" mr={13} alignItems="center">
                  <Checkbox
                    {...label}
                    sx={{ mr: 3, height: 40 }}
                    disabled={Boolean(
                      !formik.values.info.diversity.dictionaryId
                    )}
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
                    <OptionsSelect
                      data={researcherData.dictionaries.diversity}
                    />
                  </TextField>
                </Grid>
                <Grid xs={12} display="flex" alignItems="center">
                  <Checkbox
                    {...label}
                    sx={{ mr: 3, height: 40 }}
                    disabled={Boolean(!formik.values.info.suggestedStrategy[0])}
                    onChange={(event) => {
                      formik.setFieldValue(
                        `info.suggestedStrategy[0].isMarked`,
                        event.target.checked
                      );
                    }}
                  />
                  <TextField
                    label="Suggested Strategy"
                    name="info.suggestedStrategy.dictionaryId"
                    value={
                      formik.values.info.suggestedStrategy[0]
                        ? formik.values.info.suggestedStrategy[0].dictionaryId
                        : ""
                    }
                    onChange={handleChangeStrategy}
                    onBlur={formik.handleBlur}
                    select
                    SelectProps={{ native: true }}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                  >
                    <OptionsSelect data={strategyData} />
                  </TextField>
                  <AddButton onClick={handleAddSecondaryStrategy} />
                </Grid>
                {formik.values.info.suggestedStrategy[0]?.dictionaryId && (
                  <Grid xs={12} display="flex" alignItems="center" ml={10}>
                    <Checkbox
                      {...label}
                      sx={{ mr: 3, height: 40 }}
                      onChange={(event) => {
                        formik.setFieldValue(
                          `info.suggestedStrategy[0].sub[0].isMarked`,
                          event.target.checked
                        );
                      }}
                    />
                    <TextField
                      label="Suggested Sub Strategy"
                      name="info.suggestedStrategy[0].sub[0].dictionaryId"
                      value={
                        formik.values.info.suggestedStrategy[0]?.sub[0]
                          ?.dictionaryId || ""
                      }
                      onChange={handleChangeSubStrategy}
                      onBlur={formik.handleBlur}
                      select
                      SelectProps={{ native: true }}
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                    >
                      <OptionsSelect data={subStrategiesData} />
                    </TextField>
                    <AddButton onClick={handleAddSecondarySubStrategy} />
                  </Grid>
                )}
                {secondarySubStrategy.map((team, index) => (
                  <Grid
                    key={index}
                    xs={12}
                    display="flex"
                    alignItems="center"
                    ml={10}
                  >
                    <Checkbox
                      {...label}
                      sx={{ mr: 3, height: 40 }}
                      onChange={(event) => {
                        formik.setFieldValue(
                          `info.suggestedStrategy[0].sub[${
                            index + 1
                          }].isMarked`,
                          event.target.checked
                        );
                      }}
                    />
                    <TextField
                      label={`Suggested Sub Strategy ${index + 1}`}
                      name={`info.suggestedStrategy[0].sub[${
                        index + 1
                      }].dictionaryId`}
                      value={
                        formik.values.info.suggestedStrategy[0]?.sub[index + 1]
                          ?.dictionaryId || ""
                      }
                      onBlur={formik.handleBlur}
                      select
                      SelectProps={{ native: true }}
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      onChange={(event) =>
                        handleChangeSubSecondaryStrategy(event, index)
                      }
                    >
                      <OptionsSelect data={subStrategiesData} />
                    </TextField>
                    <RemoveButton
                      onClick={() => handleRemoveSecondarySubStrategy(index)}
                    />
                  </Grid>
                ))}
                {secondaryStrategy.map((team, index) => (
                  <>
                    <Grid
                      key={index}
                      xs={12}
                      display="flex"
                      alignItems="center"
                    >
                      <Checkbox
                        {...label}
                        sx={{ mr: 3, height: 40 }}
                        disabled={Boolean(
                          !formik.values.info.suggestedStrategy[index + 1]
                        )}
                        onChange={(event) => {
                          formik.setFieldValue(
                            `info.suggestedStrategy[${index + 1}].isMarked`,
                            event.target.checked
                          );
                        }}
                      />
                      <TextField
                        label={`Suggested Strategy ${index + 1}`}
                        name={`info.suggestedStrategy[${
                          index + 1
                        }].dictionaryId`}
                        value={
                          formik.values.info.suggestedStrategy[index + 1]
                            ?.dictionaryId || ""
                        }
                        onBlur={formik.handleBlur}
                        select
                        SelectProps={{ native: true }}
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        onChange={(event) =>
                          handleChangeSecondaryStrategy(event, index)
                        }
                      >
                        <OptionsSelect data={strategyData} />
                      </TextField>
                      <RemoveButton
                        onClick={() => handleRemoveSecondaryStrategy(index)}
                      />
                    </Grid>
                    {formik.values.info.suggestedStrategy[index + 1]?.sub.map(
                      (subStrategy: any, subIndex: number) => (
                        <Grid
                          key={subIndex}
                          xs={12}
                          display="flex"
                          alignItems="center"
                          ml={10}
                        >
                          <Checkbox
                            {...label}
                            sx={{ mr: 3, height: 40 }}
                            onChange={(event) => {
                              formik.setFieldValue(
                                `info.suggestedStrategy[${
                                  index + 1
                                }].sub[${subIndex}].isMarked`,
                                event.target.checked
                              );
                            }}
                          />
                          <TextField
                            label={`Suggested Sub Strategy ${subIndex + 1}`}
                            name={`info.suggestedStrategy[${
                              index + 1
                            }].sub[${subIndex}].dictionaryId`}
                            value={subStrategy?.dictionaryId || ""}
                            onChange={(event) =>
                              handleCgangeThirdSubStrategy(
                                event.target.value,
                                index,
                                subIndex,
                                subStrategy,
                                formik.setFieldValue
                              )
                            }
                            select
                            SelectProps={{ native: true }}
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                          >
                            <OptionsSelect
                              data={subSecondaryStrategiesData(
                                formik.values.info.suggestedStrategy[index + 1]
                              )}
                            />
                          </TextField>
                          {subIndex > 0 ? (
                            <RemoveButton
                              onClick={() =>
                                handleRemoveThirdSubStrategy(index, subIndex)
                              }
                            />
                          ) : (
                            <AddButton
                              onClick={() => handleAddThirdSubStrategy(index)}
                            />
                          )}
                        </Grid>
                      )
                    )}
                  </>
                ))}
                <Grid xs={12} display="flex" mr={13}>
                  <Checkbox
                    {...label}
                    disabled={Boolean(
                      !formik.values.info.suggestedCoverage.dictionaryId
                    )}
                    sx={{ mr: 3 }}
                    onChange={(event) => {
                      formik.setFieldValue(
                        "info.suggestedCoverage.isMarked",
                        event.target.checked
                      );
                    }}
                  />
                  <TextField
                    label="Suggested coverage"
                    name="info.suggestedCoverage.dictionaryId"
                    value={formik.values.info.suggestedCoverage.dictionaryId}
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
                    {researcherData.dictionaries.suggestedCoverage &&
                      researcherData.dictionaries.suggestedCoverage.map(
                        (option: any, index: any) => (
                          <option key={index} value={option.dictionaryId}>
                            {option.name}
                          </option>
                        )
                      )}
                  </TextField>
                </Grid>
                <Grid xs={12} display="flex" mr={13}>
                  <Checkbox
                    {...label}
                    sx={{ mr: 3 }}
                    disabled={Boolean(
                      !formik.values.info.suggestedGeography.dictionaryId
                    )}
                    onChange={(event) => {
                      formik.setFieldValue(
                        "info.suggestedGeography.isMarked",
                        event.target.checked
                      );
                    }}
                  />
                  <TextField
                    label="Suggested geography"
                    name="info.suggestedGeography.dictionaryId"
                    value={
                      formik.values.info.suggestedGeography.dictionaryId ?? null
                    }
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
                    {researcherData.dictionaries.suggestedGeography &&
                      researcherData.dictionaries.suggestedGeography.map(
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
                        "info.startFirstBuyside.isMarked",
                        event.target.checked
                      );
                    }}
                  />
                  <DatePicker
                    views={["year", "month"]}
                    inputFormat="MM/yyyy"
                    label="When started 1st investment role"
                    onChange={handleDateChangeInvestment}
                    renderInput={(inputProps) => (
                      <TextField {...inputProps} fullWidth />
                    )}
                    value={formik.values.info.startFirstBuyside.value ?? null}
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
                <Grid
                  xs={12}
                  mr={13}
                  sx={{
                    pointerEvents: formik.values.info.isNoSellsideMarked
                      ? "none"
                      : "auto",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Checkbox
                    {...label}
                    sx={{ mr: 3, height: 40 }}
                    disabled={formik.values.info.isNoSellsideMarked}
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
                      <TextField
                        {...inputProps}
                        disabled={formik.values.info.isNoSellsideMarked}
                        fullWidth
                      />
                    )}
                    value={formik.values.info.startFirstSellside.value ?? null}
                  />
                  {isRequiredSellside && (
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
                    control={
                      <Checkbox
                        sx={{ ml: "10px" }}
                        name="isNoSellsideMarked"
                        checked={formik.values.info.isNoSellsideMarked}
                        onChange={(e) =>
                          formik.setFieldValue(
                            "info.isNoSellsideMarked",
                            e.target.checked
                          )
                        }
                      />
                    }
                    label="No sellside"
                  />
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
                <Grid xs={12}>
                  <Typography variant="h3" mt={15} mb={6} ml={4}>
                    Current Employment
                  </Typography>
                  {formik.values.info.currentEmployment && (
                    <EmployerList
                      data={formik.values.info.currentEmployment}
                      formikUpdate={formik}
                    />
                  )}
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
