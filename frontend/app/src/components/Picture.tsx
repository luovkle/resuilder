import { useState } from "react";

import { PictureModal } from "./PictureModal";

interface Props {
  alt: string;
  url: string;
}

export const Picture = ({ alt, url: data }: Props) => {
  const [showModal, setShowModal] = useState(false);
  const [url, setUrl] = useState(data);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  return (
    <>
      <img
        src={url}
        alt={alt}
        className="rounded-full"
        onClick={handleOpenModal}
      />
      {showModal && (
        <PictureModal
          showModal={setShowModal}
          url={url}
          setUrl={setUrl}
          alt={alt}
        />
      )}
    </>
  );
};
