import { KeyboardEvent } from "react";

const useAddItemOnEnter = (
  addItemFunction?: any
): ((event: KeyboardEvent<HTMLInputElement>) => void) => {
  return (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addItemFunction();
    }
  };
};

export default useAddItemOnEnter;
