import {ITextStorage} from "../../textStorage";

export interface CreateTextState {
  isOpen: boolean;
  text: string;
}

export interface CreateTextProps {
  storage: ITextStorage;
}