import React from "react";
import {Text} from "../types";
import {MainPageProps} from "./types";
import TextListItem from "./textListItem";
import './index.css';
import PagePanel from "../../components/pagePanel";

export default function MainPage(props: MainPageProps){
  const texts = props.storage.getTexts();
  return<PagePanel>
    {texts.map((item: Text) => <TextListItem key={item.id} text={item} />)}
  </PagePanel>;
}