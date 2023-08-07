import { useAuth0 } from "@auth0/auth0-react";

export default function DownloadButton() {
  const { getAccessTokenSilently } = useAuth0();

  const handleClick = async () => {
    const accessToken = await getAccessTokenSilently();
    fetch("http://localhost:8000/profiles/@me/resumes", {
      method: "GET",
      headers: {
        "Content-Type": "application/pdf",
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.blob())
      .then((blob) => {
        const element = document.createElement("a");
        element.href = URL.createObjectURL(blob);
        element.download = "resume.pdf";
        document.body.appendChild(element);
        element.click();
      });
  };

  return (
    <button
      className="bg-blue-600 hover:bg-blue-500 px-4 py-1"
      onClick={handleClick}
    >
      Download
    </button>
  );
}
