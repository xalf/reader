import {TranslatePanelProps} from "./types";
import './index.css';
import {useState} from "react";

export default function TranslatePanel(props: TranslatePanelProps) {
  const [ isOpen, setOpen ] = useState(false);
  return <span className="translate-panel" onMouseLeave={() => setOpen(false)} onMouseEnter={() => setOpen(true)}>
    {props.dictionary.text}
    {isOpen && <span className="translate-panel__translate">{props.dictionary.translate}</span>}
  </span>
}