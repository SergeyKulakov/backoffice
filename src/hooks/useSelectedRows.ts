import { useState, ChangeEvent } from "react";

const useSelectedRows = (): [
  string[],
  (event: ChangeEvent<HTMLInputElement>, id: string) => void,
  () => void
] => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const handleSelectRow = (
    event: ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    const selectedIndex = selectedRows.indexOf(id);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = [...selectedRows, id];
    } else if (selectedIndex === 0) {
      newSelected = [...selectedRows.slice(1)];
    } else if (selectedIndex === selectedRows.length - 1) {
      newSelected = [...selectedRows.slice(0, -1)];
    } else if (selectedIndex > 0) {
      newSelected = [
        ...selectedRows.slice(0, selectedIndex),
        ...selectedRows.slice(selectedIndex + 1),
      ];
    }

    setSelectedRows(newSelected);
  };

  const clearSelectedRows = () => {
    setSelectedRows([]);
  };

  return [selectedRows, handleSelectRow, clearSelectedRows];
};

export default useSelectedRows;
