import settings from "../config";
import { useResume } from "../hooks";
import usePdfApi from "../hooks/pdf/usePdfApi";

const Navbar = () => {
  const { resume, isLoading } = useResume();
  const { generatePdf } = usePdfApi();

  const handleDownload = () => {
    if (resume?.nickname) {
      generatePdf(resume.nickname).then((response) =>
        window.open(response.url),
      );
    }
  };

  return (
    <nav className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-4 px-8">
      <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
          Resuilder
        </span>
      </a>
      {isLoading ? (
        <div role="status" className="space-x-2.5 animate-pulse flex w-1/5">
          <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-2/4"></div>
          <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-2/4"></div>
        </div>
      ) : (
        <div className="flex space-x-2">
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <button
              type="submit"
              onClick={handleDownload}
              className="border-blue-600 border-2 hover:border-blue-500 py-2 px-4 rounded-lg cursor-pointer"
            >
              Download PDF
            </button>
          </div>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse cursor-pointer">
            <a
              href={`${settings.VITE_RENDERER_HTTP_URL}/resume/${resume?.nickname}`}
              target="_blank"
              rel="noopener"
              className="bg-blue-600 hover:bg-blue-500 py-2 px-4 rounded-lg"
            >
              Preview
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
