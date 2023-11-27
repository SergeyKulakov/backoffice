import { useMemo } from "react";
import { IDataIndex } from "../types/supervisor";

interface DataItem {
  degreeType: {
    status: number;
  } | null;
  university: {
    status: number;
  } | null;
  companyName: {
    status: number;
  } | null;
}
export const useFilterStatusData = (
  data: IDataIndex,
  status: number | number[]
) => {
  return useMemo(() => {
    const statusArray = Array.isArray(status) ? status : [status];
    return data.filter((item) => {
      return Object.values(item)
        .filter(
          (value): value is { status: number } =>
            typeof value === "object" && value !== null
        )
        .some((obj) => statusArray.includes(obj.status));
    });
  }, [data, status]);
};
