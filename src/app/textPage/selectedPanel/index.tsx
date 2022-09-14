import {SelectedPanelProps} from "./types";
import './index.css';
import Button from "../../../components/button";
import {useEffect} from "react";

export default function SelectedPanel(props: SelectedPanelProps) {
  useEffect(() => {
    document.addEventListener("click", props.onClose);
    return () => {
      document.removeEventListener("click", props.onClose);
    }
  });

  return <div className="selected-panel" onClick={(e) => e.stopPropagation()}>
    <p className="selected-panel__text">{props.selectedText}</p>
    <Button onClick={props.onClick}>Add to dictionary</Button>
  </div>
}