import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import betta from "../images/1.jpg";
import angelfish from "../images/2.jpg";
import platy from "../images/3.jpg";
import guppy from "../images/4.jpg";
import cardinaltetra from "../images/5.jpg";
import dwarfgrourami from "../images/6.jpg";
import bristlenosepleco from "../images/7.jpg";
import tigerbarb from "../images/8.jpg";
import pandacory from "../images/9.jpg";
import harlequinrasbora from "../images/10.jpg";
import kuhliloach from "../images/11.jpg";
import rainbowshark from "../images/12.jpg";
import neontetra from "../images/13.jpg";
class FishSelect extends Component {
  state = {
    pictures: {
      "1": betta,
      "2": angelfish,
      "3": platy,
      "4": guppy,
      "5": cardinaltetra,
      "6": dwarfgrourami,
      "7": bristlenosepleco,
      "8": tigerbarb,
      "9": pandacory,
      "10": harlequinrasbora,
      "11": kuhliloach,
      "12": rainbowshark,
      "13": neontetra,
    },
  };

  render() {
    const { fishes, changeFish } = this.props;

    return (
      <div className="selection">
        <h4>Choose Fish</h4>
        <div className="section">
          {fishes.map((fish) => (
            <Fish
              key={fish.id}
              fish={fish}
              changeFish={changeFish}
              picture={this.state.pictures[fish.id]}
            />
          ))}
        </div>
      </div>
    );
  }
}

function Fish({ fish, changeFish, picture }) {
  const [inputVal, setInputVal] = React.useState(0);
  const [modalOpen, setModalOpen] = React.useState(false);

  const resetFish = (fishId) => {
    changeFish(fishId, 0);
    setInputVal(0);
  };
  const modifyInput = (val) => {
    if (val >= 0) {
      setInputVal(val);
    }
  };
  const fishModal = (fish) => {
    return (
      <Modal
        show={modalOpen}
        onHide={() => setModalOpen(false)}
        animation={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{fish.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="lead">
            <strong>Temperature Range: </strong> {fish.LowTemp}-{fish.HighTemp}
            °F
          </p>
          <p className="lead">
            <strong>PH Range: </strong> {fish.LowPH}-{fish.HighPH}
          </p>
          <p className="lead">
            <strong>Temperament: </strong>
            {fish.Temperament}
          </p>
          <p className="lead">
            <strong>Minimum Aquarium Size: </strong>
            {fish.MinAquarium} Gallons
          </p>
          <p className="lead">
            <strong>Description: </strong>
            {fish.Description}
          </p>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    );
  };
  return (
    <div className="fishInfo">
      <div style={{ position: "relative" }}>
        <img
          src={picture}
          data-container="body"
          onClick={() => setModalOpen(true)}
          className="fishImg"
        />
      </div>
      {fishModal(fish)}
      <p>{fish.name}</p>
      <div className="input-group fishQuantityCont">
        <span className="input-group-btn">
          <button
            type="button"
            className="quantity-left-minus btn btn-danger btn-number"
            data-type="minus"
            data-field=""
            onClick={() => {
              changeFish(fish.name, inputVal - 1);
              modifyInput(inputVal - 1);
            }}
          >
            <span className="glyphicon glyphicon-minus"></span>
          </button>
        </span>
        <input
          className="fishQuantity form-control input-number"
          value={inputVal}
          type="number"
          onChange={(e) => {
            changeFish(fish.name, e.target.value);
            modifyInput(e.target.value);
          }}
        />

        <span className="input-group-btn">
          <button
            type="button"
            className="quantity-right-plus btn btn-success btn-number"
            data-type="plus"
            data-field=""
            onClick={() => {
              changeFish(fish.name, inputVal + 1);
              modifyInput(inputVal + 1);
            }}
          >
            <span className="glyphicon glyphicon-plus"></span>
          </button>
        </span>
      </div>
    </div>
  );
}
export default FishSelect;
