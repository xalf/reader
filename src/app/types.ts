export interface Text {
  id: string;
  title: string;
  text: string;
  dictionary: Array<Dictionary>;
}

export interface Dictionary {
  text: string;
  translate?: string;
  textId: string;
}