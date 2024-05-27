const Skeleton = () => {
  return (
    <div role="status" className="max-w-sm animate-pulse space-y-8">
      <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-40 mb-2.5"></div>
      <div className="h-2.5 mx-auto bg-gray-300 rounded-full dark:bg-gray-700 max-w-[540px]"></div>
    </div>
  );
};

export default Skeleton;
