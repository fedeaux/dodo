export default function TextDisplay({ value }) {
  return (
    <View style={tw("mt-1")}>
      <Text style={tw("text-lg")}>{value}</Text>
    </View>
  );
}
