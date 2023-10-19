/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./LandingPage.css";
import ProgressBar from "../Progressbar";

import axios from "axios";
import Navbar from "../Navbar/Navbar";
const LandingPage = () => {
  const [link, setLink] = useState("");
  const [videoData, setVideoData] = useState(null);
  const [earnings, setEarnings] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  const navigate = useNavigate();
  const handlelink = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const API = "http://localhost:3000/api/videoMetrics";

    try {
      const response = await axios.post(
        API,
        { link },
        {
          onDownloadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded / progressEvent.total) * 100
            );
            console.log(progress);
            setLoadingProgress(progress);
          },
        }
      );

      const videoData = response.data.videoData;

      const calculatedEarnings = await response.data.earnings;
      setLink("");
      setVideoData(videoData);
      console.log(videoData);

      setEarnings(calculatedEarnings);
      console.log(calculatedEarnings);

      setTimeout(() => {
        setIsLoading(false);
        navigate("/result", {
          state: { videoResult: videoData, earnings: calculatedEarnings },
        });
      }, 1000);
    } catch (err) {
      console.log(`Error : ${err}`);
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handlelink(e);
    }
  };

  return (
    <div className="landingPage">
      <Navbar value={"none"} />
      <div className="container">
        <h1>Discover your earning potential</h1>

        <p>
          Turn your Youtube expertise into a lucrative income through resource
          sharing
        </p>

        <div className="containerBottom">
          <div className="inputContainer">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="mdi:youtube">
                <path
                  id="Vector"
                  d="M10 15L15.19 12L10 9V15ZM21.56 7.17C21.69 7.64 21.78 8.27 21.84 9.07C21.91 9.87 21.94 10.56 21.94 11.16L22 12C22 14.19 21.84 15.8 21.56 16.83C21.31 17.73 20.73 18.31 19.83 18.56C19.36 18.69 18.5 18.78 17.18 18.84C15.88 18.91 14.69 18.94 13.59 18.94L12 19C7.81 19 5.2 18.84 4.17 18.56C3.27 18.31 2.69 17.73 2.44 16.83C2.31 16.36 2.22 15.73 2.16 14.93C2.09 14.13 2.06 13.44 2.06 12.84L2 12C2 9.81 2.16 8.2 2.44 7.17C2.69 6.27 3.27 5.69 4.17 5.44C4.64 5.31 5.5 5.22 6.82 5.16C8.12 5.09 9.31 5.06 10.41 5.06L12 5C16.19 5 18.8 5.16 19.83 5.44C20.73 5.69 21.31 6.27 21.56 7.17Z"
                  fill="#B4B4B4"
                  fillOpacity="0.8"
                />
              </g>
            </svg>
            <input
              type="search"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="enter youtube video link"
              spellCheck="false"
              onKeyDown={handleKeyPress}
            />
          </div>
          <button onClick={handlelink}>Check Earning</button>
        </div>
        <div className="circle">
          <svg
            width="80"
            height="80"
            viewBox="0 0 80 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="solar:play-bold">
              <path
                id="Vector"
                d="M71.3633 31.1767C72.9643 32.028 74.3035 33.299 75.2374 34.8533C76.1712 36.4076 76.6646 38.1867 76.6646 40C76.6646 41.8133 76.1712 43.5924 75.2374 45.1467C74.3035 46.701 72.9643 47.972 71.3633 48.8233L28.6567 72.0467C21.78 75.7867 13.3333 70.92 13.3333 63.2267V16.7767C13.3333 9.07667 21.78 4.21334 28.6567 7.95001L71.3633 31.1767Z"
                fill="#323232"
              />
            </g>
          </svg>
        </div>
      </div>
      {isLoading && (
        <div className="loader">
          <ProgressBar progress={loadingProgress} />
        </div>
      )}
    </div>
  );
};

export default LandingPage;
