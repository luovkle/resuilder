interface Props {
  editContent: (arg: boolean) => void;
  content?: string;
}

export const Content = ({ editContent, content }: Props) => {
  const handleClick = () => {
    editContent(true);
  };

  return (
    <p onClick={handleClick} className="text-gray-300">
      {content ? content : <span className="italic">[Empty]</span>}
    </p>
  );
};
