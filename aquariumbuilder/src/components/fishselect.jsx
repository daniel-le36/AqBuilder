import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
class FishSelect extends Component {
  state = {};

  render() {
    const { fishes, changeFish } = this.props;

    return (
      <div className="selection">
        <h4>Choose Fish</h4>
        <div className="section">
          {fishes.map((fish) => (
            <Fish key={fish.id} fish={fish} changeFish={changeFish} />
          ))}
        </div>
      </div>
    );
  }
}

function Fish({ fish, changeFish }) {
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
            <strong>Name: </strong> {fish.name}
          </p>
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
          /* src={beet} */
          /* src={"../images/" + fish.id + ".jpg"} */
          src="https://picsum.photos/200/150"
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
