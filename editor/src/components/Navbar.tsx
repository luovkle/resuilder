import settings from "../config";

const Navbar = () => {
  return (
    <nav className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-4 px-8">
      <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
          Resuilder
        </span>
      </a>
      <div className="flex space-x-2">
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <a
            href={settings.VITE_GENERATOR_HTTP_URL}
            target="_blank"
            rel="noopener"
            className="border-blue-600 border-2 hover:border-blue-500 py-2 px-4 rounded-lg cursor-pointer"
          >
            Download PDF
          </a>
        </div>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse cursor-pointer">
          <a
            href={settings.VITE_RENDERER_HTTP_URL}
            target="_blank"
            rel="noopener"
            className="bg-blue-600 hover:bg-blue-500 py-2 px-4 rounded-lg"
          >
            Preview
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
