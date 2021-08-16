export default function SubtleTitle({ className = "", children }) {
  return (
    <View style={tw("mt-2", className)}>
      <Text style={tw("text-sm font-bold text-blue-300")}>{children}</Text>
    </View>
  );
}
