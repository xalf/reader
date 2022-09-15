import React from "react";
import ReactDOM from "react-dom";
import './index.css';
import {ModalProps} from "./types";
import CloseIcon from "../closeIcon";

const modalRoot: HTMLElement = document.getElementById('modal-root') as HTMLElement;

// todo Compound components
export default class Modal extends React.Component<any, any> {
  private el: HTMLDivElement;

  constructor(props: any) {
    super(props);
    this.el = document.createElement('div');
    this.el.classList.add('modal');
  }

  componentDidMount() {
    modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(
      this.props.children,
      this.el
    );
  }
}

export function ModalBody(props: ModalProps) {
  return <div className="modal-body">
    <div className="modal-body__close" onClick={props.onClose}>
      <CloseIcon width={33} />
    </div>
    {props.children}
  </div>
}