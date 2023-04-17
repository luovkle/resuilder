interface Props {
  editName: (arg: boolean) => void;
  name: string;
}

export const Name = ({ editName, name }: Props) => {
  const handleClick = () => {
    editName(true);
  };

  return (
    <h1 onClick={handleClick} className="text-2xl font-bold">
      {name.length > 0 ? name : <span className="italic">[Empty]</span>}
    </h1>
  );
};
