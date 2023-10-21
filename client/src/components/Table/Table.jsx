import { useState, useEffect } from "react";
import "./Table.css";
import axios from "axios";
const Table = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const API = "http://localhost:3000/api/getVideoMetrics";
    const fetchData = async () => {
      try {
        const response = await axios.get(API);
        const res = await response.data;
        setData(res);
        setLoading(false);
        console.log(data);
      } catch (err) {
        console.log(`Error : ${err}`);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="resultTable">
      <h3>Other Videos Potentials</h3>
      <table>
        <thead>
          <tr>
            <td>Rank</td>
            <td>Title</td>
            <td>Thumbnail</td>
            <td>Views</td>
            <td>Likes</td>
            <td>Comment</td>
            <td>Uploaded on</td>
            <td>*Estimated Earning</td>
          </tr>
        </thead>
        <tbody>
          {loading > 0 ? (
            <tr>
              <td colSpan="8">Loading...</td>
            </tr>
          ) : (
            data.map((video, index) => (
              <tr key={video._id}>
                <td>{index + 1}</td>
                <td>{video.title}</td>
                <td>
                  <img src={video.thumbnail} id="thumbnail" alt="Thumbnail" />
                </td>
                <td>{video.views}</td>
                <td>{video.likes}</td>
                <td>{video.comments}</td>
                <td>{video.formattedDate}</td>
                <td>{video.earnings}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
