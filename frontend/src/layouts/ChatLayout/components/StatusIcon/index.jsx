import React from "react";
import "./styles.css";

const StatusIcon = ({ connected }) => (
  <i className={`icon ${connected ? "connected" : ""}`}></i>
);

export default StatusIcon;
