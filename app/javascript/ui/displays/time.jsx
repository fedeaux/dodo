import { format, isValid } from "date-fns";

export default function TimeDisplay({ value }) {
  return (
    <View style={tw("mt-1")}>
      {isValid(value) ? (
        <Text style={tw("text-lg italic")}>{format(value, "HH:mm")}</Text>
      ) : (
        <Text style={tw("text-lg italic")}>Not set</Text>
      )}
    </View>
  );
}
