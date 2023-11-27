import React, { ChangeEvent, FC, useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Tooltip,
  MenuItem,
  Select,
  SelectChangeEvent,
  InputLabel,
  FormControl,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useDispatch } from "../../store";
import { getAllDCountries, removeCountries } from "../../thunks/countries";
import { paths } from "../../paths";
import { useRouter } from "next/router";
import { Language } from "../../types/language";
import { getAllLanguage, removeLanguage } from "../../thunks/language";
interface IProps {
  data: Language[];
  setSelectedLang: (
    languages: { _id: string | undefined; name: string }[]
  ) => void;
}

const rowsPerPageOptions = [10, 15, 20];

export const CountriesLanguagesTable: FC<IProps> = ({
  data,
  setSelectedLang,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedLanguageNames, setSelectedLanguageNames] = useState<string[]>(
    []
  );

  const handleEditLanguage = (id: string) => {
    router.push(paths.dictionary.language.index + "/" + id);
  };

  const handleRemoveLanguage = async (id: string) => {
    await dispatch(removeLanguage(id));
    await dispatch(getAllLanguage());
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };
  const handleLanguageSelect = (
    event: SelectChangeEvent<string[]>,
    child: React.ReactNode
  ) => {
    const selectedLanguages = event.target.value as string[];
    setSelectedLanguages(selectedLanguages);
    const selectedLanguagesWithIds = selectedLanguages.map((name) => {
      const language = data.find((lang) => lang.name === name);
      return {
        _id: language?._id,
        name,
      };
    });
    setSelectedLang(selectedLanguagesWithIds);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const displayedRows = data
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .filter((item) => selectedLanguages.includes(item.name));
  const languageOptions = data.map((item: Language) => (
    <MenuItem key={item._id} value={item.name}>
      {item.name}
    </MenuItem>
  ));
  return (
    <>
      <FormControl variant="outlined" fullWidth>
        <InputLabel id="languages-label">Select Languages</InputLabel>
        <Select
          multiple
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
      </FormControl>
    </>
  );
};
