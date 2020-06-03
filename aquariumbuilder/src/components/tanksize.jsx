import React, { Component } from "react";
import Popover from "react-bootstrap/Popover";
import Tooltip from "react-bootstrap/Tooltip";
import Overlay from "react-bootstrap/Overlay";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Button from "react-bootstrap/Button";
class TankSelection extends Component {
  state = {};

  render() {
    const { tanks, selectedTank, toggleTank } = this.props;
    return (
      <div className="selection">
        <h3 className="display-4">Choose Tank Size</h3>
        <div className="section">
          {tanks.map((tank) => (
            <Tank
              key={tank.id}
              tanksize={tank.tanksize}
              tankDesc={tank.description}
              selectedTank={selectedTank}
              toggleTank={toggleTank}
              id={tank.id}
            />
          ))}
        </div>
      </div>
    );
  }
}
function Tank({ tanksize, selectedTank, id, toggleTank, tankDesc }) {
  const [popoverOpen, setPopoverOpen] = React.useState(false);
  const target = React.useRef(null);

  return (
    <div>
      <Button
        className={
          selectedTank === tanksize ? "active tankSelector" : "tankSelector"
        }
        ref={target}
        onClick={() => toggleTank(tanksize)}
        onMouseEnter={() => setPopoverOpen(true)}
        onMouseLeave={() => setPopoverOpen(false)}
      >
        {tanksize} Gallons
      </Button>
      <Overlay target={target.current} show={popoverOpen} placement="top">
        {(props) => (
          <Tooltip id="overlay-example" {...props}>
            {tankDesc}
          </Tooltip>
        )}
      </Overlay>
    </div>
  );
}

export default TankSelection;
