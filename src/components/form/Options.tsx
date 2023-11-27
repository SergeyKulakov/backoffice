import React from "react";

type Props = {
  data: any[];
};

const OptionsSelect: React.FC<Props> = ({ data }) => {
  return (
    <>
      <option value="" disabled>
        Select an option
      </option>
      {data.map((option: any, index: number) => (
        <option
          key={index}
          value={option.dictionaryId}
          disabled={option?.disabled}
        >
          {option.name}
        </option>
      ))}
    </>
  );
};

export default OptionsSelect;
