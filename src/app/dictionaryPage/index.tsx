import {DictionaryPageProps} from "./types";
import Dictionary from "../../components/dictionary";
import PagePanel from "../../components/pagePanel";
import Title from "../../components/title";
import React, {useState} from "react";
import './index.css';

export default function DictionaryPage(props: DictionaryPageProps) {
  const dict = props.storage.getDictionary();

  const [ dictionary, setDictionary ] = useState(dict);

  return <PagePanel>
    <div className="dictionary-page">
      <Title>Dictionary page</Title>
      <Dictionary items={dictionary} addToDictionary={(value) => {
        const newDictionary = props.storage.addToDictionary(value);
        setDictionary(newDictionary);
      }} />
    </div>
  </PagePanel>;
}