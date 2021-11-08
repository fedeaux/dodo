import Button from "ui/controls/button";
import { colorVariations } from "ui/controls/button/variations";
import Icon from "react-native-vector-icons/FontAwesome";

const sizeVariations = {
  default: {
    width: 30,
    height: 30,
  },
  small: {
    width: 22,
    height: 22,
  },
  large: {
    style: "",
  },
  input: {
    width: 30,
    height: 36,
  },
};

export default function SquareButton({
  size = "default",
  color = "default",
  tws = "",
  icon = {},
  ...props
}) {
  const sizeVariation = sizeVariations[size];
  const colorVariation = colorVariations[color];

  return (
    <Button
      {...props}
      style={tw(
        "flex-row text-center rounded items-center",
        colorVariation.style,
        tws,
        {
          borderRadius: 0,
          ...sizeVariation,
        }
      )}
    >
      <Icon name={icon.name} style={tw("flex-grow")} />
    </Button>
  );
}
