import {Dictionary} from "../../../app/types";

export interface DictionaryItemProps {
  value: Dictionary;
  addToDictionary: (value: Dictionary) => void;
  deleteFromDictionary: (value: Dictionary) => void;
}