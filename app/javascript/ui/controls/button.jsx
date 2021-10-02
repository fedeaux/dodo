export default function Button({ label, onClick }) {
  return (
    <View onClick={onClick}>
      <Text>{label}</Text>
    </View>
  );
}
