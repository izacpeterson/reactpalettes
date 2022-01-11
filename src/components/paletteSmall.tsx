import { Container, Header } from "semantic-ui-react";
import Palette from "../myTypes";
import { Color } from "./color";

export function SmallPalette(props) {
  const pal: Palette = props.palette;
  const colors = pal.colors.map((color) => {
    return <Color hex={color}></Color>;
  });

  return (
    <div className="paletteSmall">
      <h2>{pal.name}</h2>
      <ul className="colorList">{colors}</ul>
    </div>
  );
}
