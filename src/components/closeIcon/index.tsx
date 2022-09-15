import './index.css';
import {CloseIconProps} from "./types";

export default function CloseIcon(props: CloseIconProps) {
  return <div className="close-icon" style={{ width: props.width, height: props.width }}>
    <span className="close-icon__before"></span>
    <span className="close-icon__after"></span>
  </div>
}