import './index.css';
import {ButtonProps} from "./types";
import React from "react";

export default function Button(props: ButtonProps) {
  return <button className="button" onClick={props.onClick}>{props.children}</button>
}