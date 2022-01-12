import { PrivatePalette } from "./privatePalette";
import "./color.css";
import { Container } from "semantic-ui-react";
import { PublicPalette } from "./publicPalette";

export function PaletteList(props) {
  const palettes = props.palettes || [];
  const list = palettes.map((pal, index) => {
    if (props.private) {
      return <PrivatePalette key={pal.name} palette={pal} index={index}></PrivatePalette>;
    } else {
      return <PublicPalette key={pal.name} palette={pal} index={index}></PublicPalette>;
    }
  });

  return <ul className="paletteList">{list}</ul>;
}
