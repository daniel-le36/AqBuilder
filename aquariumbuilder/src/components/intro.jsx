import React, { Component } from "react";
import logo from "../aqbuilderlogo.png";
const Intro = () => {
  return (
    <div className="intro">
      <h1 className="display-1">Welcome to Aquarium Builder</h1>
      <img src={logo} />
      <p
        style={{
          display: "flex",
          width: "500px",
          margin: "auto",
        }}
      >
        Aquarium Builder is a tool to help you plan out your next aquarium. This
        is mostly geared for those that are new to fishkeeping or only have a
        bit of experience. There are many other aspects that will be glossed but
        over this should be a suitable introduction and general guideline of how
        to plan your aquarium.
      </p>
    </div>
  );
};
export default Intro;
