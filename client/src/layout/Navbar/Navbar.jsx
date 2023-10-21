/* eslint-disable react/prop-types */
import logo from "../../assets/image 2.png";
import phone from "../../assets/Phone.png";
import Modal from "../../components/modal/Modal";
import { useState } from "react";

import "./Navbar.css";

const Navbar = ({ value }) => {
  const [visibleModal, setVisibleModal] = useState();
  const toggleModal = () => {
    setVisibleModal(!visibleModal);
  };

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
        <button id="navbtn" onClick={toggleModal}>
          <img src={phone} alt="" />
          Request a call back
        </button>
      </div>
      {visibleModal && <Modal />}
    </nav>
  );
};

export default Navbar;
