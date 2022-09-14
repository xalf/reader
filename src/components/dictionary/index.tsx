import {DictionaryItemProps, DictionaryProps} from "./types";
import './index.css';
import React, {useEffect, useState} from "react";

export default class Dictionary extends React.Component<DictionaryProps, any>{
  private el: React.RefObject<HTMLDivElement>;

  constructor(props: DictionaryProps) {
    super(props);
    this.el = React.createRef();
  }

  render() {
    const width: number = this.el.current?.clientWidth || 0;
    return <div className="dictionary" ref={this.el}>
      {this.props.items.map((item) => <DictionaryItem
        key={item.text}
        value={item}
        addToDictionary={this.props.addToDictionary}
      />)}
    </div>
  }
}

export function DictionaryItem(props: DictionaryItemProps) {
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
  </div>
}