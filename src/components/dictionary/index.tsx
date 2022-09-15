import {DictionaryProps} from "./types";
import './index.css';
import DictionaryItem from "./dictionaryItem";

export default function Dictionary(props: DictionaryProps) {
  return <div className="dictionary">
    {props.items.map((item) => <DictionaryItem
      key={item.text}
      value={item}
      addToDictionary={props.addToDictionary}
      deleteFromDictionary={props.deleteFromDictionary}
    />)}
  </div>
}