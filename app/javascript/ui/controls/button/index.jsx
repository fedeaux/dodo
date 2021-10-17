import { TouchableOpacity } from "react-native";
import { useHistory } from "lib/router";

export default function Button({
  label,
  onClick,
  disabled = false,
  block = false,
  textStyle = {},
  style,
  to,
  ...props
}) {
  const disabledStyle = disabled ? "opacity-50" : "";
  const blockStyle = block ? "flex-grow" : "";
  const history = useHistory();

  const onPress = useCallback((e) => {
    if (disabled) return;

    if (onClick) {
      onClick(e);
    }

    if (to) {
      history.push(to);
    }
  });

  return (
    <TouchableOpacity
      onPress={onPress}
      style={tw(disabledStyle, blockStyle, style)}
      {...props}
    >
      <Text style={textStyle}>{label}</Text>
    </TouchableOpacity>
  );
}
