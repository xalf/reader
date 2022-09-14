import React from 'react';
import './App.css';
import {BrowserRouter as Router, Link, Route, Routes} from "react-router-dom";
import MainPage from "./mainPage";
import TextPage from "./textPage";
import DictionaryPage from "./dictionaryPage";
import {getStorage, ITextStorage} from "./textStorage";
import Header from "./header";

function App() {
  const storage: ITextStorage = getStorage();
  return (
    <div className="app">
      <Router>
        <Header storage={storage} />
        <Routes>
          <Route path="/" element={<MainPage storage={storage} />} />
          <Route path="dictionary" element={<DictionaryPage storage={storage} />} />
          <Route path="texts/:textId" element={<TextPage storage={storage} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App
