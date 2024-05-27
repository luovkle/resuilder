const RepositorySkeleton = () => {
  return (
    <div className="col-span-1 space-y-3 p-5 border border-gray-700 rounded-lg space-y-8">
      <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-40 mb-2.5"></div>
      <div className="h-2.5 mx-auto bg-gray-300 rounded-full dark:bg-gray-700 max-w-[540px]"></div>
      <div className="flex items-center w-full">
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-4/12"></div>
        <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-2/12"></div>
        <div className="h-2.5 ms-2 bg-gray-200 rounded-full dark:bg-gray-700 w-6/12"></div>
      </div>
    </div>
  );
};

const Skeleton = () => {
  return (
    <div role="status" className="grid grid-cols-2 gap-4 animate-pulse">
      <RepositorySkeleton />
      <RepositorySkeleton />
    </div>
  );
};

export default Skeleton;
