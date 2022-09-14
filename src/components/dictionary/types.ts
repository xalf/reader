import {Dictionary} from "../../app/types";

export interface DictionaryProps {
  items: Array<Dictionary>;
  addToDictionary: (value: Dictionary) => void;
}

export interface DictionaryItemProps {
  value: Dictionary;
  addToDictionary: (value: Dictionary) => void;
}