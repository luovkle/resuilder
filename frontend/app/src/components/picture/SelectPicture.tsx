import React, { useState } from "react";

interface Props {
  newPicture: (picture: File) => void;
}

export const SelectPicture = ({ newPicture }: Props) => {
  const [picture, setPicture] = useState<File | null>(null);

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    target.files && setPicture(target.files.item(0));
  };

  const handleClick = () => {
    picture && newPicture(picture);
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleChange} />
      <button type="submit" onClick={handleClick}>
        Submit
      </button>
    </div>
  );
};
