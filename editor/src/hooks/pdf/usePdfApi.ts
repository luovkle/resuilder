import { PDFApi } from "../../services/generatorApi";
import useGeneratorApi from "../useGeneratorApi";

const usePdfApi = () => {
  const pdfApi = useGeneratorApi(PDFApi);

  const generatePdf = async (user: string) => {
    if (!pdfApi) {
      return Promise.reject("pdfApi is undefined");
    }
    const response = await pdfApi.generateResumePdfPdfUserPost(user);
    return response.data;
  };

  return {
    generatePdf,
  };
};

export default usePdfApi;
