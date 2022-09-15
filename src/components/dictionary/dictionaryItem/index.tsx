import './index.css';
import {DictionaryItemProps} from "./types";
import React, {useEffect, useState} from "react";
import CloseIcon from "../../closeIcon";

export default function DictionaryItem(props: DictionaryItemProps) {
  const { text, translate } = props.value;

  const [ isTranslating, setIsTranslating ] = useState(false);
  const [ newTranslate, setNewTranslate ] = useState(translate || '');

  const listener = () => {
    if (!isTranslating) {
      return;
    }
    setIsTranslating(false);
    const newValue = {
      ...props.value,
      translate: newTranslate
    };
    props.addToDictionary(newValue);
  }
  useEffect(() => {
    document.addEventListener("click", listener);
    return () => {
      document.removeEventListener("click", listener);
    }
  });

  return <div className="dictionary-item">
    <span className="dictionary-item__word">{text}</span>
    &nbsp; - &nbsp;
    {isTranslating ? (
      <input
        value={newTranslate}
        onChange={(e) => setNewTranslate(e.currentTarget.value)}
        onClick={(e) => e.stopPropagation() }
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            listener();
          }
        }}
      />
    ) : (
      <span
        className="dictionary-item__translate"
        onClick={(e) => {
          setIsTranslating(true);
          e.stopPropagation();
        }}>
        {translate || 'add translate'}
      </span>
    )}
    <span
      className="dictionary-item__delete"
      onClick={() => props.deleteFromDictionary(props.value) }
    >
      <CloseIcon width={10} />
    </span>
  </div>
}