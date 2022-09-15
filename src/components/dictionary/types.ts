import {Dictionary} from "../../app/types";

export interface DictionaryProps {
  items: Array<Dictionary>;
  addToDictionary: (value: Dictionary) => void;
  deleteFromDictionary: (value: Dictionary) => void;
}

