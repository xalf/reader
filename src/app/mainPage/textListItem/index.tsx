import {TextListItemProps} from "./types";
import {Link} from "react-router-dom";
import './index.css';

export default function TextListItem(props: TextListItemProps) {
  return <Link className='text-list-item'  to={'/texts/' + props.text.id}>
    <div className="text-list-item__text">
      {props.text.title}
      <span className="text-list-item__subtext"> ({props.text.text.slice(0, 30)}...)</span>
    </div>
    <span className="text-list-item__count">{props.text.dictionary.length}</span>
  </Link>
}