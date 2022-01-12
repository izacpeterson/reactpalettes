import "./color.css";

export function Color(props) {
  return <div className="color" style={{ backgroundColor: props.hex }}></div>;
}
