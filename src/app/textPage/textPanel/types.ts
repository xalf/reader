import {ReactNode} from "react";
import {Dictionary} from "../../types";

export interface TextPanelProps {
  text: string;
  textId: string;
  dictionary: Array<Dictionary>;
  addToDictionary: (dictionary: Dictionary) => void
}

export interface TextPanelState {
  selectedText: TextPosition | null;
}

export interface TextPosition {
  start: number;
  end: number;
  text: string;
}