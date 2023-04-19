interface Props {
  content?: string;
  editContent: (arg: boolean) => void;
}

export const Content = ({ content, editContent }: Props) => {
  const handleClick = () => {
    editContent(true);
  };

  return (
    <p onClick={handleClick} className="text-gray-300">
      {content ? content : <span className="italic">[Empty]</span>}
    </p>
  );
};
