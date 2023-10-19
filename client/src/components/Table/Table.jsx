import thumb from "../../assets/Frame 8.png";
import "./Table.css"
const Table = () => {
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
          <tr>
            <td>2</td>
            <td>Video Title Name</td>
            <td>
              <img src={thumb} alt="" />
            </td>
            <td>88456</td>
            <td>55585</td>
            <td>654448</td>
            <td>June 23, 2023</td>
            <td>239893</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Video Title Name</td>
            <td></td>
            <td>88456</td>
            <td>55585</td>
            <td>654448</td>
            <td>June 23, 2023</td>
            <td>239893</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Table;
