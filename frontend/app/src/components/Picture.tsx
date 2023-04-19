import { useState } from "react";

import { PictureModal } from "./PictureModal";

interface Props {
  alt: string;
  picture_url: string;
  newPicture: (picture: File) => void;
}

export const Picture = ({ alt, picture_url, newPicture }: Props) => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  return (
    <>
      <img
        src={picture_url}
        alt={alt}
        className="rounded-full"
        onClick={handleOpenModal}
      />
      {showModal && (
        <PictureModal
          showModal={setShowModal}
          url={picture_url}
          alt={alt}
          newPicture={newPicture}
        />
      )}
    </>
  );
};
