import { useCanvasData, useCanvasImageData } from "../../hooks/useReduxData";
import DownloadIcon from "../Icon/DownloadIcon";
import clsx from "clsx";
import { useRef } from "react";
import toast from "react-hot-toast";
import { useCanvasAction } from "../../hooks/useReduxAction"; // Import the new hook

export default function DownloadButton() {
  const linkRef = useRef<HTMLAnchorElement | null>(null);
  const { canvas } = useCanvasData();
  const { uploadCount, maxImageUploads } = useCanvasImageData();
  const { setSavedImageAction } = useCanvasAction(); // Destructure the new action

  const downloadImage = () => {
    if (canvas && linkRef.current) {
      canvas.discardActiveObject();
      linkRef.current.href = canvas.toDataURL();
      linkRef.current.download = `collage-${new Date().getTime()}.png`;
      linkRef.current.click();
      toast.success("Collage downloaded.", { id: "toast-download" });
    } else {
      toast.error("Cannot download collage! :(", { id: "toast-download" });
    }
  };

  const saveImageToVariable = () => {
    if (canvas) {
      canvas.discardActiveObject();
      const imageData = canvas.toDataURL(); // Export canvas to data URL
      console.log("Generated Image Data:", imageData); // Log the generated image data
      setSavedImageAction(imageData); // Save the image data to Redux
      toast.success("Image saved for text/sticker addition.", {
        id: "toast-save",
      });
    } else {
      toast.error("Cannot save image! :(", { id: "toast-save" });
    }
  };

  return (
    <div className="flex flex-row">
      <a ref={linkRef} id="download" className="hidden"></a>

      {/* Download Button */}
      <button
        className={clsx([
          "flex w-full items-center justify-center",
          "px-5 py-3 text-sm font-semibold",
          "transition-colors",
          "bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-500 disabled:text-gray-300/50",
        ])}
        onClick={downloadImage}
        disabled={uploadCount !== maxImageUploads}
      >
        <DownloadIcon className="mr-2" />
        <span>
          Download <span className="inline sm:hidden md:inline">collage</span>
        </span>
      </button>

      {/* Add Text / Sticker Button */}
      <button
        className={clsx([
          "flex w-full items-center justify-center",
          "px-5 py-3 text-sm font-semibold",
          "transition-colors",
          "bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-500 disabled:text-gray-300/50",
        ])}
        onClick={saveImageToVariable}
      >
        <DownloadIcon className="mr-2" />
        <span>
          Add Text / <span className="inline sm:hidden md:inline">Sticker</span>
        </span>
      </button>
    </div>
  );
}
