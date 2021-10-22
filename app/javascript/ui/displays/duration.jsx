import { format, isValid } from "date-fns";

export default function DurationDisplay({ value }) {
  return (
    <View style={tw("mt-1")}>
      {Number.isInteger(value) ? (
        <Text style={tw("text-lg italic")}>{value}</Text>
      ) : (
        <Text style={tw("text-lg italic")}>Not set</Text>
      )}
    </View>
  );
}
