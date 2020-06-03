import React, { Component } from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Button from "react-bootstrap/Button";
import Tooltip from "react-bootstrap/Tooltip";
const FishList = (fishName, quantity) => {
  return (
    <li>
      {fishName}: {quantity}
    </li>
  );
};
function renderTooltip(props) {
  console.log(props);
  return (
    <Tooltip id="button-tooltip" {...props}>
      ffff
    </Tooltip>
  );
}
const ErrorMessages = (errors) => {
  console.log(errors);
  return (
    <div>
      {errors.hasOwnProperty("tooHot") ? (
        <p key="lowTemp">This fish's temperature requirement is too low</p>
      ) : (
        ""
      )}
      {errors.hasOwnProperty("tooCold") ? (
        <p key="highTemp">This fish's temperature requirement is too high</p>
      ) : (
        ""
      )}
      {errors.hasOwnProperty("tooAcidic") ? (
        <p key="lowPH">This fish's PH requirement is too high</p>
      ) : (
        ""
      )}
      {errors.hasOwnProperty("tooBasic") ? (
        <p key="highPh">This fish's PH requirement is too low</p>
      ) : (
        ""
      )}
      {errors.hasOwnProperty("tooSmall") ? (
        <p key="highPh">This fish needs a larger tank</p>
      ) : (
        ""
      )}
      {errors.hasOwnProperty("tooSmallGroup") ? (
        <p key="highPh">
          This fish needs to be in a group of at least {errors.tooSmallGroup}
        </p>
      ) : (
        ""
      )}
    </div>
  );
};
const ErrorIcon = (errors) => {
  return (
    <OverlayTrigger
      placement="right"
      delay={{ show: 250, hide: 400 }}
      overlay={<Tooltip id="button-tooltip">{ErrorMessages(errors)}</Tooltip>}
    >
      <svg
        className="bi bi-exclamation-circle-fill"
        width="1em"
        height="1em"
        viewBox="0 0 16 16"
        fill="currentColor"
        style={{ "margin-left": "7px" }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M16 8A8 8 0 110 8a8 8 0 0116 0zM8 4a.905.905 0 00-.9.995l.35 3.507a.552.552 0 001.1 0l.35-3.507A.905.905 0 008 4zm.002 6a1 1 0 100 2 1 1 0 000-2z"
          clipRule="evenodd"
        />
      </svg>
    </OverlayTrigger>
  );
};
const Summary = ({ tank, selectedFish, minTemp, maxTemp, minPh, maxPh }) => {
  return (
    <div>
      <h1>Summary</h1>
      <span>
        {tank == -1
          ? "No Tank Size Selected"
          : "Selected Tank Size: " + tank + " Gallons"}
      </span>
      <p>
        The temperature should be between {minTemp} and {maxTemp}F
      </p>
      <p>
        The PH should be between {minPh} and {maxPh}
      </p>
      <ul>
        {Object.keys(selectedFish).map((fish) => (
          <li>
            {fish}: {selectedFish[fish]["Concerns"]}
          </li>
        ))}
      </ul>
      <h2>Selected Fish:</h2>
      <ul style={{ "list-style-type": "none" }}>
        {Object.keys(selectedFish).map((fish) => (
          <div key={fish}>
            <li>
              {fish}: {selectedFish[fish]["quantity"]}
              {Object.keys(selectedFish[fish]["errors"]).length > 0
                ? ErrorIcon(selectedFish[fish]["errors"])
                : ""}
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
};
export default Summary;
