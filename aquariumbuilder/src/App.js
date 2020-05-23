import React, { Component, useEffect } from "react";
import "./App.css";
import TankSelection from "./components/tanksize";
import FishSelect from "./components/fishselect";
import Summary from "./components/summary";
import Papa from "papaparse";
import * as d3 from "d3";
import data from "./FishData.csv";

class App extends Component {
  state = {
    data: [],
    tanks: [
      { id: 1, tanksize: 10 },
      { id: 2, tanksize: 20 },
    ],
    fishes: [
      { id: 1, name: "betta" },
      { id: 2, name: "neon tetra" },
    ],
    selectedFish: {},
    selectedTank: -1,
    minTemp: 0,
    maxTemp: 100,
    minPh: 10,
    maxPh: 0,
  };

  setFishData = (data) => {
    this.setState({ fishes: data });
  };

  // Set/Unset the selected tank size
  // Also update fishes who need a larger tank
  toggleTank = (tankSize) => {
    const { selectedTank } = this.state;
    const fishSelect = { ...this.state.selectedFish };
    if (selectedTank === -1 || selectedTank !== tankSize) {
      this.setState({ selectedTank: tankSize });
      Object.keys(fishSelect).forEach((fish) => {
        if (fishSelect[fish]["MinAquarium"] > tankSize) {
          fishSelect[fish]["errors"]["tooSmall"] = true;
        } else {
          delete fishSelect[fish]["errors"]["tooSmall"];
        }
      });
    } else {
      this.setState({ selectedTank: -1 });
      Object.keys(fishSelect).forEach((fish) => {
        delete fishSelect[fish]["errors"]["tooSmall"];
      });
    }
    this.setState({ selectedFish: fishSelect });
  };

  reCalculateTempAndPh = (fishSelect) => {
    const chosenFish = [
      ...this.state.fishes.filter((x) =>
        Object.keys(fishSelect).includes(x.name)
      ),
    ];
    console.log(chosenFish);
    let minTemp = 0;
    let maxPh = 0;
    let maxTemp = 100;
    let minPh = 10;

    chosenFish.forEach((currentFish) => {
      if (parseInt(currentFish.LowTemp) > minTemp) {
        minTemp = parseInt(currentFish.LowTemp);
      }
      if (parseInt(currentFish.HighTemp) < maxTemp) {
        maxTemp = parseInt(currentFish.HighTemp);
      }
      if (parseInt(currentFish.LowPH) < minPh) {
        minPh = parseInt(currentFish.LowPH);
      }
      if (parseInt(currentFish.HighPH) > maxPh) {
        maxPh = parseInt(currentFish.HighPH);
      }
    });
    console.log(maxTemp);
    this.setState({
      minTemp: minTemp,
      maxTemp: maxTemp,
      minPh: minPh,
      maxPh: maxPh,
    });
  };
  changeFish = (fishName, num) => {
    const fishSelect = { ...this.state.selectedFish };

    if (num <= 0) {
      delete fishSelect[fishName];
      if (Object.keys(fishSelect).length === 0) {
        this.setState({ minTemp: 0, maxTemp: 100, minPh: 10, maxPh: 0 });
      } else {
        this.reCalculateTempAndPh(fishSelect);
      }
    } else {
      const currentFish = {
        ...this.state.fishes.filter((x) => x.name == fishName)[0],
      };
      const fishProps = (({
        LowTemp,
        HighTemp,
        LowPH,
        HighPH,
        MinAquarium,
      }) => ({
        LowTemp,
        HighTemp,
        LowPH,
        HighPH,
        MinAquarium,
      }))(currentFish);
      fishProps["quantity"] = num;

      const errors = {};
      if (
        this.state.minTemp !== 0 &&
        parseInt(currentFish.HighTemp) < this.state.minTemp
      ) {
        errors.tooHot = true;
      }
      if (
        this.state.maxTemp !== 100 &&
        parseInt(currentFish.LowTemp) > this.state.maxTemp
      ) {
        errors.tooCold = true;
      }
      if (
        this.state.maxPh !== 0 &&
        parseInt(currentFish.LowPH) > this.state.maxPh
      ) {
        errors.tooAcidic = true;
      }
      if (
        this.state.minPh !== 10 &&
        parseInt(currentFish.HighPH) < this.state.minPh
      ) {
        errors.tooBasic = true;
      }
      if (
        this.state.selectedTank !== -1 &&
        currentFish.MinAquarium > this.state.selectedTank
      ) {
        errors.tooSmall = currentFish.MinAquarium;
      }
      if (num < currentFish.MinGroup) {
        errors.tooSmallGroup = currentFish.MinGroup;
      } else {
        delete errors.tooSmallGroup;
      }
      if (Object.keys(errors).length === 0) {
        if (parseInt(currentFish.LowTemp) > this.state.minTemp) {
          this.setState({ minTemp: parseInt(currentFish.LowTemp) });
        }
        if (parseInt(currentFish.HighTemp) < this.state.maxTemp) {
          this.setState({ maxTemp: parseInt(currentFish.HighTemp) });
        }
        if (parseFloat(currentFish.LowPH) < this.state.minPh) {
          this.setState({ minPh: parseFloat(currentFish.LowPH) });
        }
        if (parseFloat(currentFish.HighPH) > this.state.maxPh) {
          this.setState({ maxPh: parseFloat(currentFish.HighPH) });
        }
      }
      fishProps["errors"] = errors;
      fishSelect[fishName] = fishProps;
    }

    this.setState({ selectedFish: fishSelect });
  };
  componentDidMount() {
    d3.csv(data).then(this.setFishData.bind(this));
  }
  render() {
    const {
      tanks,
      fishes,
      selectedTank,
      selectedFish,
      minTemp,
      maxTemp,
      minPh,
      maxPh,
    } = this.state;
    return (
      <React.Fragment>
        <TankSelection
          tanks={tanks}
          toggleTank={this.toggleTank}
          selectedTank={selectedTank}
        />
        <FishSelect fishes={fishes} changeFish={this.changeFish} />
        <Summary
          selectedFish={selectedFish}
          tank={selectedTank}
          fishes={fishes}
          minTemp={minTemp}
          maxTemp={maxTemp}
          minPh={minPh}
          maxPh={maxPh}
        />
      </React.Fragment>
    );
  }
}

export default App;
