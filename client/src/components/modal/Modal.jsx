import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Modal.css";
import axios from "axios";
const Modal = () => {
  const [name, setName] = useState();
  const [number, setNumber] = useState();
  const [preferredTime, setPreferredTime] = useState();
  const [message, setMessage] = useState("");
  const [request, setRequest] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    document.body.classList.add("modal-open");

    return () => {
      document.body.classList.remove("modal-open");
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const API = "http://localhost:3000/sendEmail";

    try {
      await axios.post(API, {
        name,
        number,
        preferredTime,
        message,
      });
      console.log(name, number, preferredTime);
      setRequest(true);
      console.log("Email Sent");
    } catch (err) {
      console.log(`Email Error : ${err}`);
    }
  };

  const handlenavigate = () => {
    navigate("/");
  };
  return (
    <div className="modal">
      <div className="modal-container">
        {request ? (
          <div className="modal-section">
            <svg
              width="80"
              height="81"
              viewBox="0 0 80 81"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="mdi:tick-circle-outline">
                <path
                  id="Vector"
                  d="M40 7.16669C21.6667 7.16669 6.66669 22.1667 6.66669 40.5C6.66669 58.8334 21.6667 73.8334 40 73.8334C58.3334 73.8334 73.3334 58.8334 73.3334 40.5C73.3334 22.1667 58.3334 7.16669 40 7.16669ZM40 67.1667C25.3 67.1667 13.3334 55.2 13.3334 40.5C13.3334 25.8 25.3 13.8334 40 13.8334C54.7 13.8334 66.6667 25.8 66.6667 40.5C66.6667 55.2 54.7 67.1667 40 67.1667ZM55.3 25.7667L33.3334 47.7334L24.7 39.1334L20 43.8334L33.3334 57.1667L60 30.5L55.3 25.7667Z"
                  fill="#34D399"
                />
              </g>
            </svg>
            <h1>Request a call back</h1>
            <span>Our Team will call you shortly in 12-24 hrs</span>
            <span>Can’t you wait for call?</span>
            <button id="result" onClick={handlenavigate}>
              Check another video
              <svg
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="mingcute:arrow-up-line" clipPath="url(#clip0_1_296)">
                  <g id="Group">
                    <path
                      id="Vector"
                      d="M20.864 13.207C21.0515 13.0194 21.1568 12.7651 21.1568 12.5C21.1568 12.2348 21.0515 11.9805 20.864 11.793L15.207 6.13598C15.1148 6.04047 15.0044 5.96428 14.8824 5.91188C14.7604 5.85947 14.6292 5.83188 14.4964 5.83073C14.3636 5.82957 14.232 5.85487 14.1091 5.90516C13.9862 5.95544 13.8745 6.02969 13.7806 6.12358C13.6867 6.21747 13.6125 6.32913 13.5622 6.45202C13.5119 6.57492 13.4866 6.7066 13.4878 6.83938C13.4889 6.97216 13.5165 7.10338 13.5689 7.22538C13.6213 7.34739 13.6975 7.45773 13.793 7.54998L17.743 11.5L4.50001 11.5C4.2348 11.5 3.98044 11.6053 3.79291 11.7929C3.60537 11.9804 3.50001 12.2348 3.50001 12.5C3.50001 12.7652 3.60537 13.0195 3.79291 13.2071C3.98044 13.3946 4.2348 13.5 4.50001 13.5L17.743 13.5L13.793 17.45C13.6109 17.6386 13.5101 17.8912 13.5123 18.1534C13.5146 18.4156 13.6198 18.6664 13.8052 18.8518C13.9906 19.0372 14.2414 19.1424 14.5036 19.1447C14.7658 19.1469 15.0184 19.0461 15.207 18.864L20.864 13.207Z"
                      fill="white"
                    />
                  </g>
                </g>
                <defs>
                  <clipPath id="clip0_1_296">
                    <rect
                      width="24"
                      height="24"
                      fill="white"
                      transform="matrix(0 1 -1 0 24.5 0.5)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </button>
          </div>
        ) : (
          <div className="modal-section">
            <h1>Request a call back</h1>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Enter Name"
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Enter number"
                onChange={(e) => setNumber(e.target.value)}
              />
              <input
                type="text"
                placeholder="Enter Preferred Time"
                onChange={(e) => setPreferredTime(e.target.value)}
              />
              <input
                type="text"
                placeholder="Enter Message"
                onChange={(e) => setMessage(e.target.value)}
              />
              <button type="submit">Request a Call Back</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
