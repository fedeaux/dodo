import { TouchableOpacity } from "react-native";
import { useHistory } from "lib/router";

export default function Button({
  label,
  onClick,
  disabled = false,
  block = false,
  textStyle = {},
  style = "",
  to,
  children,
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
      {...props}
      onPress={onPress}
      style={tw(disabledStyle, blockStyle, style)}
    >
      {children ? (
        children
      ) : (
        <Text style={tw(textStyle, "text-center")}>{label}</Text>
      )}
    </TouchableOpacity>
  );
}
