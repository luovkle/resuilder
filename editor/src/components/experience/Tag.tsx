interface Props {
  content: string;
}

const Tag = ({ content }: Props) => {
  return <span className="bg-gray-700 px-4 py-1">{content}</span>;
};

export default Tag;
