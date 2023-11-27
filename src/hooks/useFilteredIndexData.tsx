import { useEffect, useState } from "react";
import { IDataIndex } from "../types/supervisor";

export const useFilteredIndexData = (supervisorData: any) => {
  const [filteredData, setFilteredData] = useState<IDataIndex>([]);

  useEffect(() => {
    if (supervisorData) {
      const filteredData = [
        ...supervisorData.info.education.filter(
          (item: {
            university: { status: number };
            degreeType: { status: number };
          }) => item.university.status || item.degreeType.status
        ),
        ...supervisorData.info.currentEmployment.filter(
          (item: { companyName: { status: any } }) => item.companyName.status
        ),
      ];
      setFilteredData(filteredData);
    }
  }, [supervisorData]);

  return filteredData;
};
