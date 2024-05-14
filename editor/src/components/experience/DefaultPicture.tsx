interface Props {
  title: string;
}

const DefaultPicture = ({ title }: Props) => {
  return (
    <div className="flex items-center justify-center bg-blue-600 w-[43.8333px] h-[43.8333px] rounded-full font-bold select-none">
      {title ? title.charAt(0).toUpperCase() : "●"}
    </div>
  );
};

export default DefaultPicture;
