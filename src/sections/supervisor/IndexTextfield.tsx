import React from "react";
import {
  TextField,
  Radio,
  FormControl,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";

interface Props {
  label: string;
  name: string;
  formik: any;
  field: string;
  radioChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  options: { value: number; label: string }[];
}

export const IndexTextfield: React.FC<Props> = ({
  label,
  name,
  options,
  formik,
  radioChange,
  field,
}) => {
  return (
    <FormControl fullWidth key={name}>
      <TextField
        label={label}
        name="index"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        SelectProps={{ native: true }}
        fullWidth
        helperText={label + " index is missing"}
        InputLabelProps={{ shrink: true }}
        value={field}
        InputProps={{
          readOnly: true,
        }}
        error
      />
      <RadioGroup onChange={radioChange} row>
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={<Radio />}
            label={option.label}
            sx={{ mb: 5 }}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};
