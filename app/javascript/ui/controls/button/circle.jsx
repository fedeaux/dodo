import Button from "ui/controls/button";
import { colorVariations } from "ui/controls/button/variations";
import Icon from "react-native-vector-icons/FontAwesome";

const sizeVariations = {
  default: {
    style: "",
  },
  small: {
    style: "",
  },
  large: {
    style: "",
  },
};

export default function CircleButton({
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
        "flex-row text-center items-center",
        colorVariation.style,
        tws,
        {
          width: 30,
          height: 30,
          borderRadius: 100,
        }
      )}
    >
      <Icon name={icon.name} style={tw("flex-grow")} />
    </Button>
  );
}
