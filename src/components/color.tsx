import "./color.css";
import { useContext } from "react";

export function Color(props) {
  return <div className="color" style={{ backgroundColor: props.hex }}></div>;
}
