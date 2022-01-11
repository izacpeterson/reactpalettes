import { SmallPalette } from "./paletteSmall";
import "./color.css";

export function PaletteList(props) {
  const palettes = props.palettes || [];
  const list = palettes.map((pal) => {
    return <SmallPalette palette={pal}></SmallPalette>;
  });

  return <ul className="paletteList">{list}</ul>;
}
