const Skeleton = () => {
  return (
    <div role="status" className="space-y-5 animate-pulse">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-1 flex justify-center">
          <div className="bg-gray-200 rounded-full dark:bg-gray-700 w-[43.8333px] h-[43.8333px]"></div>
        </div>
        <div className="col-span-11 space-y-8">
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-2/5"></div>
          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-1/5"></div>
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-4/5"></div>
          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-3/5"></div>
          <div className="flex items-center w-full">
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-1/5"></div>
            <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-2/5"></div>
            <div className="h-2.5 ms-2 bg-gray-200 rounded-full dark:bg-gray-700 w-1/5"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skeleton;
