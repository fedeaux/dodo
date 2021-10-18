import { TouchableOpacity } from "react-native";
import FieldLabel from "ui/fields/Label";

export default function BoolInput({ value, label, onChange }) {
  const toogleValue = useCallback(() => {
    onChange({ value: !value });
  });

  const style = value
    ? { circle: "bg-green-600 border-green-400", text: "text-green-400 " }
    : { circle: "bg-gray-600 border-gray-700", text: "text-gray-400" };

  return (
    <TouchableOpacity
      value={value}
      onPress={toogleValue}
      style={tw("flex-row items-center mt-2")}
    >
      <View style={tw("h-5 w-5 rounded-full border", style.circle)} />
      <FieldLabel
        label={label}
        tws={["ml-4 pt-1 flex-grow text-lg", style.text]}
      />
    </TouchableOpacity>
  );
}
