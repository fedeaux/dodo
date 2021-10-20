import Icon from "react-native-vector-icons/FontAwesome";
import FieldLabel from "ui/fields/Label";

export default function BoolDisplay({ value, label }) {
  const style = value
    ? {
        icon: { name: "check", color: getColor("green-600") },
        text: "text-green-400 ",
      }
    : {
        icon: { name: "close", color: getColor("gray-600") },
        text: "text-gray-400",
      };

  return (
    <View style={tw("flex-row items-center mt-1")}>
      <FieldLabel label={label} tws={["mr-2", style.text]} />
      <Icon size={12} name={style.icon.name} color={style.icon.color} />
    </View>
  );
}
