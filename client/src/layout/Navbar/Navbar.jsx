/* eslint-disable react/prop-types */
import logo from "../../assets/image 2.png";
import phone from "../../assets/Phone.png";

import "./Navbar.css";

const Navbar = ({ value }) => {
  return (
    <nav>
      <div className="navTop">
        <img src={logo} alt="" />
        <h1>anchors</h1>
        <div className="beta">
          <span>Beta</span>
        </div>
      </div>
      <div
        style={{
          display: `${value}`,
        }}
      >
        <button id="navbtn">
          <img src={phone} alt="" />
          Request a call back
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
