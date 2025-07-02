import { createContext, useContext, useState } from "react";

const PhotoBoothContext = createContext();

export const usePhotoBooth = () => useContext(PhotoBoothContext);

export const PhotoBoothProvider = ({ children }) => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [copies, setCopies] = useState(2);
  const [images, setImages] = useState([]);
  const [filter, setFilter] = useState("none");

    const resetContext = () => {
    setSelectedTemplate(null);
    setCopies(0);
    setImages([]);
    setFilter("none");
  };

  return (
    <PhotoBoothContext.Provider
      value={{
        selectedTemplate,
        setSelectedTemplate,
        copies,
        setCopies,
        images,
        setImages,
        filter,
        setFilter,
        resetContext
      }}
    >
      {children}
    </PhotoBoothContext.Provider>
  );
};
