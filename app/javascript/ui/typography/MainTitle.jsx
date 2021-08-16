export default function MainTitle({ className = "", children }) {
  return (
    <View style={tw("mt-2", className)}>
      <Text style={tw("text-xl font-bold text-center text-blue-800")}>
        {children}
      </Text>
    </View>
  );
}
