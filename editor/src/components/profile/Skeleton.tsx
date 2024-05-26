const Skeleton = () => {
  return (
    <div role="status" className="max-w-sm animate-pulse space-y-2.5">
      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px]"></div>
      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px]"></div>
    </div>
  );
};

export default Skeleton;
