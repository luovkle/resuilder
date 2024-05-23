import { useState } from "react";

interface Props {
  content: string;
}

const Tag = ({ content }: Props) => {
  const [showOptions, setShowOptions] = useState(false);

  const handleUpdate = () => {
    console.log(`Update ${content}`);
  };

  const handleDelete = () => {
    console.log(`Delete ${content}`);
  };

  return (
    <div
      onMouseEnter={() => setShowOptions(true)}
      onMouseLeave={() => setShowOptions(false)}
      className="bg-blue-600 hover:bg-blue-500 px-4 py-1 rounded-md"
    >
      {!showOptions ? (
        <span>{content}</span>
      ) : (
        <div className="space-x-3">
          <button type="button" onClick={handleUpdate} className="text-sm">
            ✏️
          </button>
          <button type="button" onClick={handleDelete} className="text-sm">
            ❌
          </button>
        </div>
      )}
    </div>
  );
};

export default Tag;
