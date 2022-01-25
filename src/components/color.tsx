import "./color.css";
import { useContext } from "react";

export function Color(props) {
  return <div className="color" onClick={copyToClip} style={{ backgroundColor: props.hex }}></div>;

  function copyToClip() {
    navigator.clipboard.writeText(props.hex);
  }
}
