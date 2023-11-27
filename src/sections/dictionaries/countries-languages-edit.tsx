import { ChangeEvent, FC, useEffect, useState } from "react";
import {
  TableRow,
  TableCell,
  IconButton,
  Table,
  TableHead,
  TableBody,
  TablePagination,
  Tooltip,
  Box,
  Select,
  MenuItem,
  SelectChangeEvent,
  InputLabel,
  Grid,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { FieldArray, FormikProps, useFormikContext } from "formik";
import { Country } from "../../types/countries";
import { getAllLanguage } from "../../thunks/language";
import { useDispatch, useSelector } from "../../store";
import { Language } from "../../types/language";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { paths } from "../../paths";
import { useRouter } from "next/router";

interface IProps {
  data: Country;
  allLanguages: Language[];
  formik: FormikProps<any>;
}

const rowsPerPageOptions = [10, 15, 20];

export const CountriesLanguagesEdit: FC<IProps> = ({
  data,
  allLanguages,
  formik,
  // @ts-ignore
  onSelectedLanguagesChange,
}) => {
  const getLanguageNameById = (id: {}) => {
    const language =
      allLanguages && allLanguages.find((language) => language._id === id);
    return language?.name ?? "";
  };

  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  useEffect(() => {
    const languages = data.languages.map((languageId) => {
      const language = allLanguages?.find(
        (language: any) => language._id === languageId
      );
      return language?.name ?? "";
    });
    setSelectedLanguages(languages);
  }, [data.languages, allLanguages]);

  const router = useRouter();
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);

  const handleEditResearcher = (id: {}) => {
    router.push(paths.dictionary.language.index + "/" + id);
  };

  const removeLanguage = (languageId: {}) => {
    const newLanguages = data.languages.filter((id) => id !== languageId);
    formik.setFieldValue("languages", newLanguages);
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const languageOptions = allLanguages?.map((language) => (
    <MenuItem key={language._id} value={language.name}>
      {language.name}
    </MenuItem>
  ));
  const handleLanguageSelect = (
    event: SelectChangeEvent<string[]>,
    child: React.ReactNode
  ) => {
    setSelectedLanguages(event.target.value as any);
    if (onSelectedLanguagesChange) {
      // @ts-ignore
      const selectedLanguageIds = event.target.value.map((name) => {
        const language = allLanguages.find(
          (language) => language.name === name
        );
        return language?._id;
      });
      onSelectedLanguagesChange(selectedLanguageIds);
    }
  };

  return (
    <>
      <InputLabel id="languages-label">Select Languages</InputLabel>
      <Select
        multiple
        fullWidth
        displayEmpty
        labelId="languages-label"
        value={selectedLanguages}
        onChange={handleLanguageSelect}
        inputProps={{ "aria-label": "Select languages" }}
      >
        <MenuItem disabled value="">
          Select languages
        </MenuItem>
        {languageOptions}
      </Select>
    </>
  );
};
