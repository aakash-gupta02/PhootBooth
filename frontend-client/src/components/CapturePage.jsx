import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import { useNavigate } from "react-router-dom";
import { usePhotoBooth } from "../context/PhotoBoothContext";

const CapturePage = () => {
  const webcamRef = useRef(null);
  const navigate = useNavigate();

  const [countdown, setCountdown] = useState(3);
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const [isCapturing, setIsCapturing] = useState(false);

  const {
    images,
    setImages,
    copies,
  } = usePhotoBooth();

  // Clean countdown and capture logic
  useEffect(() => {
    let countdownInterval;

    if (isCapturing && currentPhoto < copies) {
      setCountdown(3);

      countdownInterval = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            clearInterval(countdownInterval);
            capture();
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(countdownInterval); // cleanup
  }, [isCapturing, currentPhoto]);

  const capture = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        setImages((prev) => [...prev, imageSrc]); // ✅ Safe inside capture function
        setCurrentPhoto((prev) => prev + 1);
      }
    }
  };

  // Navigate when all photos are captured
  useEffect(() => {
    if (images.length === copies && isCapturing) {
      setIsCapturing(false); // stop capture state
      navigate("/preview");
    }
  }, [images, copies, navigate, isCapturing]);

  return (
    <div className="min-h-screen bg-light-bg flex flex-col items-center justify-center gap-6 text-center">
      <h1 className="text-3xl font-mansalva text-primary-blue">
        Capture Photos
      </h1>

      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        className="rounded-xl shadow-md"
        videoConstraints={{
          width: 640,
          height: 480,
          facingMode: "user",
        }}
      />

      {!isCapturing ? (
        <button
          onClick={() => {
            setImages([]); // reset previous images
            setCurrentPhoto(0); // reset index
            setIsCapturing(true); // begin capture
          }}
          className="mt-4 bg-deep-blue text-base-white px-6 py-3 rounded-xl shadow hover:scale-105 transition"
        >
          Start Capturing
        </button>
      ) : (
        <div className="text-2xl text-deep-blue font-semibold">
          Capturing photo {currentPhoto + 1}/{copies} in {countdown}...
        </div>
      )}
    </div>
  );
};

export default CapturePage;
