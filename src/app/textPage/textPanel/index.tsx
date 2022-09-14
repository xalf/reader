import React, {ReactNode} from "react";
import {TextPosition, TextPanelProps, TextPanelState} from "./types";
import './index.css';
import {throttle} from "../../../utils";
import SelectedPanel from "../selectedPanel";
import {Dictionary} from "../../types";
import TranslatePanel from "../translatePanel";

export default class TextPanel extends React.Component<TextPanelProps, TextPanelState> {
  constructor(props: TextPanelProps) {
    super(props);
    this.state = {
      selectedText: null
    };
  }

  componentDidMount() {
    document.onselectionchange = throttle(this.selectionHandler, 1000);
  }

  componentWillUnmount() {
    document.onselectionchange = null;
  }

  selectionHandler = () => {
    const range: Selection | null = document.getSelection();

    if (!range || !isValidRange(range)) {
      return;
    }

    const selectedText = getTextPosition(this.props.text, range);
    this.setState({
      selectedText
    })
  }

  render() {
    const textTokens = this.getTextTokens();
    return <div className="text-panel">
      {textTokens.concat()}
    </div>;
  }

  getTextTokens(): Array<ReactNode> {
    const selectedText = this.state.selectedText;
    if (!selectedText) {
      return this.getDictionaryTokens(this.props.text);
    }
    return [
      this.getDictionaryTokens(this.props.text.slice(0, selectedText.start)),
      <span className="text-panel__selected" key={selectedText.text}>
        <SelectedPanel
          selectedText={selectedText.text}
          onClick={() => this.props.addToDictionary({ text: selectedText.text, textId: this.props.textId })}
          onClose={() => this.setState({ selectedText: null })}
        />
        {selectedText.text}
      </span>,
      this.getDictionaryTokens(this.props.text.slice(selectedText.end))
    ];
  }

  getDictionaryTokens(text: string): Array<ReactNode> {
    const dictionary = this.props.dictionary.filter((item) => !!item.translate);
    const textPositions: Array<TextPosition> = getTranslatePosition(text, dictionary)
      .sort((a, b) => a.start < b.start ? -1 : 1);

    const result: Array<ReactNode> = [];
    let lastIndex = 0;

    textPositions.forEach((item) => {
      const textNode = text.slice(lastIndex, item.start);
      if (textNode.length) {
        result.push(textNode);
      }

      const translate = dictionary.find((i) => item.text === i.text);
      if (translate) {
        result.push(<TranslatePanel dictionary={translate} key={item.start} />);
      }
      lastIndex = item.end;
    });

    const endNode = text.slice(lastIndex);
    if (endNode.length) {
      result.push(endNode);
    }

    return result;
  }
}

export function isValidRange(range: Selection): boolean {
  if (Math.abs(range.focusOffset - range.anchorOffset) < 4) {
    return false;
  }

  if (range.anchorNode?.parentElement?.className !== 'text-panel') {
    return false;
  }

  if (range.focusNode?.parentElement?.className !== 'text-panel') {
    return false;
  }

  return true;
}

export function getTextPosition(text: string, range: Selection): TextPosition {
  const start = range.anchorOffset < range.focusOffset ? range.anchorOffset : range.focusOffset;
  const end = range.anchorOffset < range.focusOffset ? range.focusOffset : range.anchorOffset;

  return {
    text: text.slice(start, end),
    start,
    end
  };
}

export function getTranslatePosition(text: string, dictionary: Array<Dictionary>): Array<TextPosition> {
  return dictionary.reduce((acc: Array<TextPosition>, item: Dictionary) => {
    const match = Array.from(text.matchAll(RegExp(item.text, 'gi')));

    match.forEach((matched) => {
      if (matched.index !== undefined) {
        acc.push({
          text: item.text,
          start: matched.index,
          end: matched.index + item.text.length
        });
      }
    });

    return acc;
  }, [])
}