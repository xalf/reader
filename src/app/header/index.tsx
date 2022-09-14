import {Link} from "react-router-dom";
import CreateText from "./createTextButton";
import React from "react";
import './index.css';

export default function Header(props: any) {
  return <header className="header">
    <div className="header__links">
      <Link className="header__title" to="/">Reader</Link>
      <Link className="header__dictionary-link" to="/dictionary">Dictionary</Link>
    </div>
    <CreateText storage={props.storage} />
  </header>
}