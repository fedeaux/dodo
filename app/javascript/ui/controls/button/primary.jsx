import Button from "ui/controls/button";
import { colorVariations, sizeVariations } from "ui/controls/button/variations";

export default function PrimaryButton({
  size = "default",
  color = "default",
  tws = "",
  ...props
}) {
  const sizeVariation = sizeVariations[size];
  const colorVariation = colorVariations[color];

  return (
    <Button
      {...props}
      style={tw(
        "rounded text-center",
        sizeVariation.style,
        colorVariation.style,
        tws
      )}
      textStyle={tw(sizeVariation.textStyle, colorVariation.textStyle)}
    />
  );
}
