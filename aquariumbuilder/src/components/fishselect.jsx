import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";

class FishSelect extends Component {
  state = {};

  render() {
    const { fishes, changeFish } = this.props;

    return (
      <div>
        <h4>Choose Fish</h4>
        {fishes.map((fish) => (
          <Fish key={fish.id} fish={fish} changeFish={changeFish} />
        ))}
      </div>
    );
  }
}

function Fish({ fish, changeFish }) {
  const [inputVal, setInputVal] = React.useState("");
  const [modalOpen, setModalOpen] = React.useState(false);

  const resetFish = (fishId) => {
    changeFish(fishId, 0);
    setInputVal("");
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
          <p>
            <strong>Name: </strong> {fish.name}
          </p>
          <p>
            <strong>Description: </strong>
            {fish.Description}
          </p>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    );
  };
  return (
    <div>
      <div style={{ position: "relative" }}>
        <img
          src="https://picsum.photos/50"
          data-container="body"
          onClick={() => setModalOpen(true)}
        />
      </div>
      {fishModal(fish)}
      <span>{fish.name}</span>
      <img
        src="https://picsum.photos/25"
        onClick={() => resetFish(fish.name)}
      />
      <input
        className="fishQuantity"
        value={inputVal}
        type="number"
        onChange={(e) => {
          changeFish(fish.name, e.target.value);
          modifyInput(e.target.value);
        }}
      />
    </div>
  );
}
export default FishSelect;
