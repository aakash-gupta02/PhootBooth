import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { usePhotoBooth } from "../context/PhotoBoothContext";

const Preview = () => {
  const { images, filter, setFilter, selectedTemplate, resetContext } =
    usePhotoBooth();
  const navigate = useNavigate();
  const printRef = useRef(null);

  const handleDownload = async () => {
    const html2canvas = (await import("html-to-image")).toJpeg;
    if (printRef.current) {
      html2canvas(printRef.current, { quality: 1.3 }).then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "photobooth_result.jpg";
        link.href = dataUrl;
        link.click();
      });
    }
  };

  const handleBack = () => {
    resetContext();
    navigate("/");
  };

  const getFilterClass = () => {
    switch (filter) {
      case "bw":
        return "grayscale";
      case "sepia":
        return "sepia";
      default:
        return "";
    }
  };

  const getGridCols = () => {
    if (images.length === 2) return "grid-cols-1";
    return "grid-cols-2";
  };

  const getBackgroundClass = () => {
    if (!selectedTemplate) return "bg-white";
    if (selectedTemplate === "solid-blue") return "bg-sky-500";
    if (selectedTemplate === "solid-grey") return "bg-gray-500";
    return "bg-cover bg-center";
  };


 return (
  <div className="h-screen max-h-screen w-full flex flex-col lg:flex-row items-center justify-center px-4 py-4 gap-4 md:gap-8 bg-base-white overflow-hidden">
{/* photo */}
    <div
      ref={printRef}
      className={`p-2 md:p-3 border rounded-xl shadow grid ${getGridCols()} ${getBackgroundClass()}`}
      style={{
        backgroundImage: selectedTemplate && !selectedTemplate.startsWith("solid-") 
          ? `url(${selectedTemplate})` 
          : "none",
        aspectRatio: "3/4", 
        width: "clamp(300px, 80vw, 500px)", 
        height: "auto",
        gridAutoRows: "1fr",
        gap: "0.5rem",
        overflow: "hidden" 
      }}
    >
      {images.map((img, i) => (
        <div key={i} className="relative w-full h-full overflow-hidden rounded-md shadow">
          <img
            src={img}
            alt={`Photo ${i + 1}`}
            className={`absolute inset-0 w-full h-full object-cover ${getFilterClass()}`}
            style={{
              objectPosition: "center"
            }}
          />
        </div>
      ))}
    </div>

    {/* Controls */}
    <div className="flex flex-col items-start gap-4 md:gap-6 w-full max-w-xs px-2">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-mansalva text-primary-blue">
        Your PhotoBooth
      </h1>

{/* filter */}
      <div className="flex flex-wrap gap-2 md:gap-3 w-full">
        {["none", "bw", "sepia"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`flex-1 min-w-[80px] px-3 py-2 rounded-md text-xs sm:text-sm font-medium ${
              filter === f ? "bg-accent-yellow" : "bg-light-bg"
            }`}
          >
            {f === "none" ? "Original" : f === "bw" ? "B&W" : "Sepia"}
          </button>
        ))}
      </div>

{/* button */}
      <div className="flex flex-col gap-2 md:gap-3 w-full mt-2">
        <button
          onClick={handleDownload}
          className="bg-deep-blue text-base-white font-semibold px-4 py-3 rounded-xl shadow hover:scale-105 transition"
        >
          Download Image
        </button>
        <button
          onClick={handleBack}
          className="bg-light-bg text-deep-blue font-semibold px-4 py-3 rounded-xl shadow hover:scale-105 transition"
        >
          Go Home
        </button>
      </div>
    </div>

  </div>
);

};

export default Preview;
