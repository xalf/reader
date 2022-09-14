import {Dictionary, Text} from "./types";
import {v4} from "uuid";

export interface ITextStorage {
  addText: (text: string, title: string) => string;
  getTexts: () => Array<Text>;
  getTextById: (id: string) => Text;
  getDictionary: () => Array<Dictionary>
  addToDictionary: (dictionary: Dictionary) => Array<Dictionary>
}

export class TextBrowserStorage implements ITextStorage {
  private KEY = "textsStorage";

  addText(text: string, title: string): string {
    const list: Array<Text> = this.getTexts();
    const newText: Text = {
      id: v4(),
      title,
      text,
      dictionary: []
    }
    list.push(newText);
    const newListStr = JSON.stringify(list);
    localStorage.setItem(this.KEY, newListStr);
    return newText.id;
  }

  getDictionary(): Array<Dictionary> {
    const list: Array<Text> = this.getTexts();
    return list
      .flatMap((item) => item.dictionary)
      .filter((value: Dictionary, index: number, self: Array<Dictionary>) => self.indexOf(value) === index);
  }

  getTexts(): Array<Text> {
    const listStr: string = localStorage.getItem(this.KEY) || "[]";
    const list: Array<Text> = JSON.parse(listStr);
    return list;
  }

  getTextById(id: string): Text {
    const list: Array<Text> = this.getTexts();
    const text = list.find((el: Text) => el.id === id);
    if (!text) {
      throw new Error('Something bad happened');
    }
    return text
  }

  addToDictionary(dictionary: Dictionary): Array<Dictionary> {
    const list: Array<Text> = this.getTexts()
    const page: Text | undefined = list.find((item) => item.id === dictionary.textId);
    if (!page) return [];

    if (page.dictionary.find((item) => item.text === dictionary.text)) {
      page.dictionary = page.dictionary.map((item) => {
        if (item.text === dictionary.text) {
          item.translate = dictionary.translate;
        }
        return item;
      });
    } else {
      page.dictionary.push(dictionary);
    }
    const newListStr = JSON.stringify(list);
    localStorage.setItem(this.KEY, newListStr);

    return page.dictionary;
  }
}

export function getStorage(): ITextStorage {
  return new TextBrowserStorage();
}