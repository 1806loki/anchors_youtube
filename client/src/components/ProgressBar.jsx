/* eslint-disable react/prop-types */
const ProgressBar = ({ progress }) => {
  return (
    <div
      className="loader-container"
      style={{
        width: "25%",
        height: "20px",
        backgroundColor: " #f3f3f3",
        borderRadius: "25px",
        margin: "20px 0",
      }}
    >
      <div
        className="loader-bar"
        style={{
          height: "100%",
          backgroundColor: "#64ff64",
          borderRadius: "25px",
          textAlign: "center",
          color: "black",
          lineHeight: "20px",
          transition: `${progress} 0.3s ease-in-out`,
        }}
      >
        {progress}%
      </div>
    </div>
  );
};

export default ProgressBar;
