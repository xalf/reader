import React, {useState} from "react";
import Modal, {ModalBody} from "../../../components/modal";
import { CreateTextProps } from "./types";
import { useNavigate } from "react-router-dom";
import './index.css';
import Button from "../../../components/button";

export default function CreateText(props: CreateTextProps) {
  let navigate = useNavigate();

  const [ isOpen, setOpen ] = useState(false);
  const [ text, setText ] = useState('');
  const [ title, setTitle ] = useState('');

  // todo text control
  return <React.Fragment>
    <Button onClick={() => { setOpen(true) }}>New text</Button>
    {isOpen && <Modal>
      <ModalBody onClose={() => setOpen(false)}>
        <div className="create-text__modal">
          <h3 className="create-text__title">New text</h3>
          <input
            className="create-text__title-input"
            value={title}
            onChange={(e) => setTitle(e.currentTarget.value)}
          />
          <textarea
            onChange={(e: React.FormEvent<HTMLTextAreaElement>) => {
              setText(e.currentTarget.value);
            }}
            className="create-text__input"
            value={text} />
          <Button
            onClick={() => {
              const id = props.storage.addText(text, title);
              setOpen(false);
              navigate('/texts/' + id);
            }}>
              Add
          </Button>
        </div>
      </ModalBody>
    </Modal>}
  </React.Fragment>
}