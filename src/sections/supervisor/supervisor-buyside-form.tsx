import React, { FC, useState, useEffect } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { FormikErrors, useFormik } from "formik";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "../../store";
import Image01Icon from "@untitled-ui/icons-react/build/esm/Image01";
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
  FormControlLabel,
  Collapse,
  SvgIcon,
  IconButton,
  Tooltip,
  MenuItem,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { paths } from "../../paths";
import {
  GenderOption,
  ISecondaryTeam,
  ISecondaryStrategy,
  MockOption,
  Values,
  IResearcherSellside,
} from "../../types/researcher";
import PlusIcon from "@untitled-ui/icons-react/build/esm/Plus";
import { ButtonsList } from "./buttons-list";
import { ArchiveModal } from "../../components/pages/researcher/ArchiveModal";
import { CarrierList } from "./carrier-list";
import { EducationList } from "./education-list";

import { ValuesSupervisiorBuysideNew } from "../../types/supervisor";
import jsonRes from "../../types/supervisor.json";
import {
  getSupervisorBuyside,
  updateProfile,
  updateSupervisor,
} from "../../thunks/supervisor";
import { getCountSupervisor } from "../../thunks/counter";
import { compareDisabledArrays } from "../../utils/compareDisabledArray";
import DeleteIcon from "@mui/icons-material/Delete";
import AddButton from "../../components/form/AddButton";
import OptionsSelect from "../../components/form/Options";
import RemoveButton from "../../components/form/RemoveButton";
import { IndexList } from "./IndexList";
import { useFilteredIndexData } from "../../hooks/useFilteredIndexData";
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
export const SupervisorBuysideForm: FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  // @ts-ignore
  const supervisorData: ValuesSupervisiorBuysideNew = useSelector(
    (state) => state.supervisor.supervisorBuyside
  );
  const [secondaryStrategy, setSecondaryStrategy] = useState<ISecondaryTeam[]>(
    []
  );
  const isSuccess = useSelector((state) => state.supervisor.isSuccess);
  const counterData = useSelector((state) => state.counter.dataSupervisor);
  const filteredData = useFilteredIndexData(supervisorData);
  const dispatch = useDispatch();
  const [secondarySubStrategy, setSecondarySubStrategy] = useState<
    ISecondaryTeam[]
  >([]);
  const [strategyData, setStrategyData] = useState<Strategy[]>([]);
  useEffect(() => {
    dispatch(getSupervisorBuyside());
    dispatch(getCountSupervisor());
  }, [dispatch]);
  useEffect(() => {
    if (isSuccess && supervisorData) {
      setIsLoading(false);
      setStrategyData(supervisorData?.dictionaries?.suggestedStrategy);
      setTeamsData(supervisorData?.dictionaries?.suggestedTeam);
    }
  }, [isSuccess, supervisorData]);
  //@ts-ignore
  const initialValues: ValuesSupervisiorBuysideNew = {
    info: {
      firstName: {
        isMarked: supervisorData?.info.firstName.isMarked,
        moveId: supervisorData?.info.firstName.moveId,
        value: supervisorData?.info.firstName.value,
      },
      websiteLink: {
        value: supervisorData?.info.websiteLink?.value,
        isMarked: supervisorData?.info.websiteLink?.isMarked,
        moveId: supervisorData?.info.websiteLink?.moveId,
      },
      lastName: {
        isMarked: supervisorData?.info.lastName.isMarked,
        moveId: supervisorData?.info.lastName.moveId,
        value: supervisorData?.info.lastName.value,
      },
      gender: {
        dictionaryId: supervisorData?.info.gender?.dictionaryId || null,
        isMarked: false,
      },
      diversity: {
        dictionaryId: supervisorData?.info.diversity?.value || null,
        isMarked: false,
      },
      education: supervisorData?.info.education,
      suggestedStrategy: supervisorData?.info.suggestedStrategy || [],
      currentEmployment: supervisorData?.info.currentEmployment,
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
    isArchived: false,
    profileId: supervisorData?.profileId,
    profileImage: supervisorData?.profileImage,
    profileType: supervisorData?.profileType,
  };
  const [isArchiveOpen, setIsArchiveOpen] = useState(false);
  const [isSubtitleBioOpen, setIsSubtitleBioOpen] = useState(false);
  const [isHideEducation, setIsHideEducation] = useState(false);
  const [isHideCarrierHistory, setIsHideCarrierHistory] = useState(false);
  const [isHideLanguages, setIsHideLanguages] = useState(false);
  const [userName, setUserName] = useState(
    supervisorData?.info.firstName.value
  );
  const [teamsData, setTeamsData] = useState<
    { dictionaryId: string; name: string }[]
  >([]);
  const [selectedTeam, setSelectedTeam] = useState<string>("");
  const [subTeams, setSubTeams] = useState<string[]>([""]);
  const [selectedStrategy, setSelectedStrategy] = useState<string>("");
  const [userLastName, setLastName] = useState(
    supervisorData?.info.lastName.value
  );
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
  const toggleSubtitleBio = () => {
    setIsSubtitleBioOpen(!isSubtitleBioOpen);
  };

  useEffect(() => {
    if (supervisorData && supervisorData.info.education.length > 0) {
      setIsHideEducation(true);
    }
  }, [supervisorData]);

  const handleUserName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };
  const handleUserLastName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value);
  };
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

  const [selectedSuggestedStrategy, setSuggestedStrategy] =
    useState<string>("");
  const [selectedSuggestedCoverage, setSuggestedCoverage] =
    useState<string>("");
  const [selectedSuggestedGeography, setSuggestedGeography] =
    useState<string>("");
  const [selectedDiversity, setSelectedDiversity] = useState<string>("");
  const [secondaryTeams, setSecondaryTeams] = useState<ISecondaryTeam[]>([]);
  const [selectedSuggestedSellsideTeam, setSuggestedSellsideTeam] =
    useState<string>("");
  const [storedSubTeams, setStoredSubTeams] = useState<any>([]);
  const [selectedGender, setSelectedGender] = useState<string>("");
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
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedDiversity = event.target.value;
    setSelectedDiversity(selectedDiversity);

    const diversityData = supervisorData.dictionaries.diversity.find(
      (diversity) => diversity.name === selectedDiversity
    );

    if (diversityData) {
      formik.setFieldValue(
        "info.diversity.dictionaryId",
        diversityData.dictionaryId
      );
    }
  };
  const handleSuggestedGeography = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedGeography = event.target.value;
    setSuggestedGeography(selectedGeography);

    const geographyData = supervisorData.dictionaries.suggestedGeography.find(
      (geography) => geography.name === selectedGeography
    );

    if (geographyData) {
      formik.setFieldValue(
        "info.suggestedGeography.dictionaryId",
        geographyData.dictionaryId
      );
    }
  };

  const handleSuggestedCoverage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedCoverage = event.target.value;
    setSuggestedCoverage(selectedCoverage);

    const coverageData = supervisorData.dictionaries.suggestedCoverage.find(
      (coverage) => coverage.name === selectedCoverage
    );

    if (coverageData) {
      formik.setFieldValue(
        "info.suggestedCoverage.dictionaryId",
        coverageData.dictionaryId
      );
    }
  };
  useEffect(() => {
    if (supervisorData) {
      setUserName(supervisorData.info.firstName.value);
      setLastName(supervisorData.info.lastName.value);
      setStrategyData(supervisorData?.dictionaries?.suggestedStrategy);
      setSelectedGender(
        supervisorData.dictionaries.gender.find(
          (gender: any) =>
            //@ts-ignore
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
      setSelectedDiversity(
        supervisorData.dictionaries.diversity.find(
          (diversity: any) =>
            //@ts-ignore
            diversity.dictionaryId === supervisorData.info.diversity?.value
        )?.name || ""
      );
      setSuggestedCoverage(
        supervisorData.dictionaries.suggestedCoverage.find(
          (suggestedCoverage: any) =>
            suggestedCoverage.dictionaryId ===
            //@ts-ignore
            supervisorData.info.suggestedCoverage?.value
        )?.name || ""
      );
      setSuggestedGeography(
        supervisorData.dictionaries.suggestedGeography.find(
          (suggestedGeography: any) =>
            suggestedGeography.dictionaryId ===
            //@ts-ignore
            supervisorData.info.suggestedGeography?.value
        )?.name || ""
      );
      setUserSubtitle(supervisorData.info.subtitle?.value || "");
      setUserSummary(supervisorData.info.summary?.value || "");
    }
  }, [supervisorData]);
  const errorStyles = {
    borderColor: "red",
    borderWidth: "2px",
  };
  const [selectedSubtitle, setSelectedSubtitle] = useState<string>("");

  const handleSubtitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedSubtitle(event.target.value);
  };
  const handleDateChange = (date: Date | null) => {
    if (date) {
      formik.setFieldValue("info.startCurrentEmployeer.value", date);
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
    const newTeam = {
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

  const handleArchiveProfile = async (id: string) => {
    await dispatch(updateProfile(id));
    await toggleArchiveDialog();
    await dispatch(getSupervisorBuyside());
    await dispatch(getCountSupervisor());
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

  const subSecondaryStrategiesData = (item: ISecondaryStrategy) => {
    return strategyData.find(
      (strategy) => strategy.dictionaryId === item.dictionaryId
    )?.subStrategies as { dictionaryId: string; name: string }[];
  };

  const subStrategiesData = strategyData.find(
    (strategy) => strategy.dictionaryId === selectedStrategy
  )?.subStrategies as { dictionaryId: string; name: string }[];

  const handleGetSubStrategies = (selectedStrategyId: string) => {
    const subStrategiesData = strategyData.find(
      (strategy) => strategy.dictionaryId === selectedStrategyId
    )?.subStrategies as { dictionaryId: string; name: string }[];

    if (subStrategiesData) {
      return subStrategiesData.map((subStrategy) => ({
        name: subStrategy.name,
        dictionaryId: subStrategy.dictionaryId,
      }));
    } else {
      return [];
    }
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

  const handleSubStrategiesData = (
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
  const handleRemoveSecondarySubStrategy = (index: number) => {
    const updatedSubStrategies = [...secondarySubStrategy];
    updatedSubStrategies.splice(index, 1);
    setSecondarySubStrategy(updatedSubStrategies);

    const updatedSuggestedStrategy = {
      ...formik.values.info.suggestedStrategy[0],
    };
    const updatedSub = [...updatedSuggestedStrategy.sub];
    updatedSub.splice(index + 1, 1);
    updatedSuggestedStrategy.sub = updatedSub;

    formik.setValues({
      ...formik.values,
      info: {
        ...formik.values.info,
        suggestedStrategy: [updatedSuggestedStrategy],
      },
    });
  };

  const handleChangeThirdSubStrategy = (
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

  const handleDateChangeInvestment = (date: Date | null) => {
    if (date) {
      formik.setFieldValue("info.startFirstBuyside.value", date);
    }
  };
  const handleRemoveSecondaryTeam = (index: number) => {
    const updatedSecondaryTeams = [...secondaryTeams];
    updatedSecondaryTeams.splice(index, 1);
    setSecondaryTeams(updatedSecondaryTeams);

    const updatedSuggestedTeams = [...formik.values.info.suggestedTeams];
    updatedSuggestedTeams.splice(index + 1, 1);
    formik.setFieldValue("info.suggestedTeams", updatedSuggestedTeams);
  };
  const handleDateChangeStarted = (date: Date | null) => {
    if (date) {
      formik.setFieldValue("info.startFirstSellside.value", date);
    }
  };
  const handleSuggestedSellsideTeam = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSuggestedSellsideTeam(event.target.value);
  };
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
  const router = useRouter();
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
        await dispatch(getSupervisorBuyside());
        await dispatch(getCountSupervisor());
        toast.success("Profile success updated");
        helpers.resetForm();
      } catch (err) {
        // @ts-ignore
        toast.error(err.message[0]);
      }
    },
  });
  useEffect(() => {
    const updatedTeamsData = compareDisabledArrays(
      strategyData,
      formik.values.info.suggestedStrategy
    );
    setStrategyData(updatedTeamsData);
  }, [formik.values.info.suggestedStrategy]);

  useEffect(() => {
    if (formik.values.info.suggestedStrategy) {
      setSecondaryStrategy(formik.values.info.suggestedStrategy);
      setSecondarySubStrategy(
        formik.values?.info?.suggestedStrategy[0]?.sub || []
      );
    }
  }, [formik.values.info.suggestedStrategy]);
  const sellsideSelectedDate = formik.values.info.startFirstSellside.value;
  const isNoSellsideMarked = formik.values.info.isNoSellsideMarked;
  const selectedDate = formik.values.info.startFirstBuyside.value;
  const selectedDateEmployeer = formik.values.info.startCurrentEmployeer.value;
  const websiteLinkError = (formik.errors as FormikErrors<IResearcherSellside>)
    .info?.websiteLink?.value;
  //@ts-ignore
  const isRequiredSellside = !sellsideSelectedDate && !isNoSellsideMarked;
  const isDisabled =
    formik.isSubmitting ||
    !(
      selectedDate &&
      selectedDateEmployeer &&
      (sellsideSelectedDate || isNoSellsideMarked)
    );
  const websiteLinkTouched = formik.touched.info?.websiteLink?.value;
  return (
    <>
      {isSuccess && supervisorData ? (
        <form onSubmit={formik.handleSubmit}>
          <Card>
            <CardHeader
              titleTypographyProps={{ variant: "h2" }}
              title="Supervisor Validation queue"
            />
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
                    {counterData && counterData.buyside} profiles left
                  </Typography>
                </Grid>
                <Grid xs={12} display="flex" mr={13} alignItems="center">
                  <TextField
                    label="Website"
                    name="info.websiteLink.value"
                    fullWidth
                    error={!!(websiteLinkTouched && websiteLinkError)}
                    helperText={websiteLinkTouched && websiteLinkError}
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
                    value={selectedDiversity}
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
                          <option key={index} value={option.name}>
                            {option.name}
                          </option>
                        )
                      )}
                  </TextField>
                </Grid>
                <Grid xs={12} display="flex" alignItems="center">
                  <TextField
                    label="Suggested Strategy"
                    name="info.suggestedStrategy.dictionaryId"
                    value={
                      formik?.values?.info?.suggestedStrategy?.length > 0
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
                {formik?.values?.info?.suggestedStrategy?.length > 0 && (
                  <Grid xs={12} display="flex" alignItems="center" ml={10}>
                    <TextField
                      label="Suggested Sub Strategy"
                      name="info.suggestedStrategy[0].sub[0].dictionaryId"
                      value={
                        formik.values?.info?.suggestedStrategy[0]?.sub[0]
                          .dictionaryId || ""
                      }
                      onChange={handleChangeSubStrategy}
                      onBlur={formik.handleBlur}
                      select
                      SelectProps={{ native: true }}
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                    >
                      {strategyData && (
                        <OptionsSelect
                          data={handleGetSubStrategies(
                            formik.values?.info?.suggestedStrategy[0]
                              ?.dictionaryId
                          )}
                        />
                      )}
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
                      {strategyData && (
                        <OptionsSelect
                          data={handleGetSubStrategies(
                            formik.values?.info?.suggestedStrategy[index]
                              ?.dictionaryId
                          )}
                        />
                      )}
                    </TextField>
                    <RemoveButton
                      onClick={() => handleRemoveSecondarySubStrategy(index)}
                    />
                  </Grid>
                ))}
                {secondaryStrategy &&
                  secondaryStrategy.map((team, index) => (
                    <>
                      <Grid
                        key={index}
                        xs={12}
                        display="flex"
                        alignItems="center"
                      >
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
                            <TextField
                              label={`Suggested Sub Strategy ${subIndex + 1}`}
                              name={`info.suggestedStrategy[${
                                index + 1
                              }].sub[${subIndex}].dictionaryId`}
                              value={subStrategy?.dictionaryId || ""}
                              onChange={(event) =>
                                handleChangeThirdSubStrategy(
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
                              {strategyData && (
                                <OptionsSelect
                                  data={handleGetSubStrategies(
                                    formik.values?.info?.suggestedStrategy[
                                      index + 1
                                    ]?.dictionaryId
                                  )}
                                />
                              )}
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
                  <TextField
                    label="Suggested coverage"
                    name="info.suggestedCoverage.dictionaryId"
                    value={selectedSuggestedCoverage}
                    onChange={handleSuggestedCoverage}
                    onBlur={formik.handleBlur}
                    select
                    SelectProps={{ native: true }}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    error={
                      supervisorData.info.suggestedCoverage?.isMarked ===
                        true ?? ""
                    }
                  >
                    <option value="" disabled>
                      Select an option
                    </option>
                    {supervisorData.dictionaries.suggestedCoverage &&
                      supervisorData.dictionaries.suggestedCoverage.map(
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
                    label="Suggested geography"
                    name="info.suggestedGeography.dictionaryId"
                    value={selectedSuggestedGeography}
                    onChange={handleSuggestedGeography}
                    onBlur={formik.handleBlur}
                    select
                    SelectProps={{ native: true }}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    error={
                      supervisorData.info.suggestedGeography?.isMarked ===
                        true ?? ""
                    }
                  >
                    <option value="" disabled>
                      Select an option
                    </option>
                    {supervisorData.dictionaries.suggestedGeography &&
                      supervisorData.dictionaries.suggestedGeography.map(
                        (option: any, index: any) => (
                          <option key={index} value={option.name}>
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
                <Grid xs={12} display="flex" mr={13}>
                  <DatePicker
                    views={["year", "month"]}
                    inputFormat="MM/yyyy"
                    label="When started 1st investment role"
                    onChange={handleDateChangeInvestment}
                    renderInput={(inputProps) => (
                      <TextField
                        {...inputProps}
                        error={
                          supervisorData.info.startFirstBuyside?.isMarked ===
                            true ?? ""
                        }
                        fullWidth
                      />
                    )}
                    value={formik.values.info.startFirstBuyside.value}
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
                        disabled={formik.values.info.isNoSellsideMarked}
                        fullWidth
                      />
                    )}
                    value={formik.values.info.startFirstSellside.value}
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
                      maxRows={4}
                      name="summary"
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
                      formikUpdate={formik}
                      data={supervisorData.info.currentEmployment ?? ""}
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
