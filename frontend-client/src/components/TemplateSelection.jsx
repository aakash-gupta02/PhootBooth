import React from "react";
import { useNavigate } from "react-router-dom";
import { usePhotoBooth } from "../context/PhotoBoothContext";

const TemplateSelection = () => {
  const { selectedTemplate, setSelectedTemplate, copies, setCopies } =
    usePhotoBooth();
  const navigate = useNavigate();

  const handleNext = () => {
    if (!selectedTemplate) {
      alert("Please select a template first.");
      return;
    }
    navigate("/capture");
  };

  const templateOptions = [
    { label: "Blue", value: "solid-blue", color: "#34d2eb" },
    { label: "Grey", value: "solid-grey", color: "#353e40" },
  ];

  return (
    <div className="h-screen max-h-screen overflow-hidden bg-base-white text-contrast px-4 py-4 flex flex-col items-center justify-between gap-4">
{/* title */}
      <h1 className="text-xl md:text-2xl lg:text-3xl font-mansalva text-primary-blue text-center mt-2">
        Choose Your Template
      </h1>

{/* template */}
      <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-center justify-center flex-grow w-full overflow-auto py-4">
        {templateOptions.map((template) => (
          <div
            key={template.value}
            className={`w-48 h-72 md:w-56 md:h-80 lg:w-64 lg:h-96 rounded-lg cursor-pointer border-4 transition-all duration-300 ${
              selectedTemplate === template.value
                ? "border-accent-yellow scale-105"
                : "border-transparent"
            }`}
            style={{ backgroundColor: template.color }}
            onClick={() => setSelectedTemplate(template.value)}
            title={template.label}
          ></div>
        ))}
      </div>

{/* no of photos */}
      <div className="flex items-center gap-2 md:gap-4 mb-4">
        <span className="text-sm md:text-lg font-semibold">Copies:</span>
        {[2, 4, 6].map((num) => (
          <label key={num} className="flex items-center gap-1 text-sm md:text-base">
            <input
              type="radio"
              name="copies"
              value={num}
              checked={copies === num}
              onChange={() => setCopies(num)}
              className="w-3 h-3 md:w-4 md:h-4"
            />
            {num}
          </label>
        ))}
      </div>

      {/* Next Button */}
      <button
        className="bg-deep-blue text-base-white font-semibold px-4 py-2 md:px-6 md:py-3 rounded-xl shadow hover:scale-105 transition-all mb-4 text-sm md:text-base"
        onClick={handleNext}
      >
        Next
      </button>
    </div>
  );
};

export default TemplateSelection;