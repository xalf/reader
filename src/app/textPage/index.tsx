import React, {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {TextPageProps} from "./types";
import Dictionary from "../../components/dictionary";
import PagePanel from "../../components/pagePanel";
import Title from "../../components/title";
import './index.css';
import TextPanel from "./textPanel";
import MobileMenuPanel from "../../components/mobileMenuPanel";

export default function TextPage(props: TextPageProps) {
  const params: any = useParams();
  const id: string = params.textId;
  const text = props.storage.getTextById(id);

  const [ dictionary, setDictionary ] = useState(text.dictionary);

  return <PagePanel>
    <div className="text-page">
      <div className="text-page__text">
        <Title>{text.title}</Title>
        <TextPanel
          dictionary={dictionary}
          text={text.text}
          textId={params.textId}
          addToDictionary={(value) => {
            const newDictionary = props.storage.addToDictionary(value);
            setDictionary(newDictionary);
          }}
        />
      </div>
      <MobileMenuPanel>
        <Dictionary
          items={dictionary}
          addToDictionary={(value) => {
            const newDictionary = props.storage.addToDictionary(value);
            setDictionary(newDictionary);
          }}
          deleteFromDictionary={(value) => {
            const newDictionary = props.storage.deleteFromDictionary(value);
            setDictionary(newDictionary);
          }}
        />
      </MobileMenuPanel>
    </div>
  </PagePanel>;
}