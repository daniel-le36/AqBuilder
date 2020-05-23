import React, { Component } from "react";
import Popover from "@material-ui/core/Popover";
class TankSelection extends Component {
  state = {};
  render() {
    const { tanks, selectedTank, toggleTank } = this.props;
    return (
      <div>
        <h3>Choose Tank Size</h3>
        {tanks.map((tank) => (
          <Tank
            key={tank.id}
            tanksize={tank.tanksize}
            selectedTank={selectedTank}
            toggleTank={toggleTank}
            id={tank.id}
          />
        ))}
      </div>
    );
  }
}

class Tank extends TankSelection {
  state = { open: true };

  onHover;
  render() {
    const { tanksize, selectedTank, id, toggleTank } = this.props;
    return (
      <div
        className={tanksize === selectedTank ? "Selected-Tank" : ""}
        onClick={() => toggleTank(tanksize)}
      >
        <img src="https://picsum.photos/100" />
        <span>{tanksize} Gallons</span>
      </div>
    );
  }
}

export default TankSelection;
