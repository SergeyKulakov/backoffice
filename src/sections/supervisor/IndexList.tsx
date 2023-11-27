import React, { FC, Fragment, useEffect } from "react";
import styled from "@emotion/styled";
import { Divider as MuiDivider, Typography } from "@mui/material";

const Divider = styled(MuiDivider)(spacing);
import { spacing } from "@mui/system";
import { IndexTextfield } from "./IndexTextfield";
import { IDataIndex, IEducation } from "../../types/supervisor";
import { useFilterStatusData } from "../../hooks/useFilterStatusData";

const optionsButtonsData = [
  { value: 3, label: "Index queue missing" },
  { value: 4, label: "Dismiss" },
];

interface IProps {
  data: IDataIndex;
  formik: any;
}

const degreeTypePropertyName = "degreeType";
const universityPropertyName = "university";
const companyPropertyName = "companyName";
const allowedStatusValues = [3, 5];

export const IndexList: FC<IProps> = ({ data, formik }) => {
  const filteredData = useFilterStatusData(data, allowedStatusValues);

  const handleStatusForm = (
    item: number,
    findId: string,
    keyProperty: string,
    valueProperty: string
  ) => {
    const index = formik.values.info[keyProperty].findIndex(
      (item: { [key: string]: { moveId: string } }) =>
        item[valueProperty].moveId === findId
    );

    if (item) {
      formik.setFieldValue(
        `info.${keyProperty}[${index}].${valueProperty}.status`,
        item
      );
    }
  };

  return (
    <>
      <Typography variant="h3" mt={5} mb={5} color="error">
        Index issues
      </Typography>
      {data.some(
        (item: any) =>
          allowedStatusValues.includes(item.university?.status) ||
          allowedStatusValues.includes(item.degreeType?.status)
      ) && (
        <Typography variant="h4" my={5}>
          Education
        </Typography>
      )}
      {filteredData.map((item: any, index: number) => {
        const status = item.degreeType?.status;
        if (!allowedStatusValues.includes(status)) {
          return null;
        }
        return (
          <Fragment key={index}>
            {item[degreeTypePropertyName] && (
              <IndexTextfield
                label="Degree Type"
                name={degreeTypePropertyName}
                field={item.degreeType.value}
                formik={formik}
                options={optionsButtonsData}
                radioChange={(e: { target: { value: unknown } }) =>
                  handleStatusForm(
                    Number(e.target.value),
                    item.degreeType.moveId,
                    "education",
                    "degreeType"
                  )
                }
              />
            )}
          </Fragment>
        );
      })}
      {filteredData.map((item: any, index: number) => {
        const status = item.university?.status;
        if (!allowedStatusValues.includes(status)) {
          return null;
        }
        return (
          <Fragment key={index}>
            {item[universityPropertyName] && (
              <IndexTextfield
                label="University"
                name={universityPropertyName}
                field={item.university.value}
                formik={formik}
                options={optionsButtonsData}
                radioChange={(e: { target: { value: unknown } }) =>
                  handleStatusForm(
                    Number(e.target.value),
                    item.university.moveId,
                    "education",
                    "university"
                  )
                }
              />
            )}
          </Fragment>
        );
      })}
      {data.some((item: any) => [3, 5].includes(item.companyName?.status)) && (
        <Typography variant="h4" my={5}>
          Career
        </Typography>
      )}
      {filteredData.map((item: any, index: number) => {
        const status = item.companyName?.status;
        if (!allowedStatusValues.includes(status)) {
          return null;
        }
        return (
          <Fragment key={index}>
            {item[companyPropertyName] && (
              <IndexTextfield
                label="Company Name"
                name={companyPropertyName}
                field={item.companyName.value}
                formik={formik}
                options={optionsButtonsData}
                radioChange={(e: { target: { value: unknown } }) =>
                  handleStatusForm(
                    Number(e.target.value),
                    item.companyName.moveId,
                    "currentEmployment",
                    "companyName"
                  )
                }
              />
            )}
          </Fragment>
        );
      })}
    </>
  );
};
