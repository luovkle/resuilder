const Skeleton = () => {
  return (
    <div role="status" className="space-y-2.5 animate-pulse w-full flex flex-wrap gap-2">
      <div className="flex items-center w-full">
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-2/5"></div>
        <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-1/5"></div>
        <div className="h-2.5 ms-2 bg-gray-200 rounded-full dark:bg-gray-700 w-1/5"></div>
      </div>
    </div>
  );
};

export default Skeleton;
