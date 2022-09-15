import './index.css';
import {useState} from "react";
import Button from "../button";

export default function MobileMenuPanel(props: any) {
  const [ isOpen, setOpen ] = useState(false);

  let classname = "mobile-menu-panel__content";
  if (isOpen) classname += " isOpen";

  return <div className="mobile-menu-panel">
    <div className="mobile-menu-panel__button" onClick={() => setOpen(!isOpen)}></div>
    <div className={classname}>{props.children}</div>
  </div>
}