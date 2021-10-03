import { TouchableOpacity } from "react-native";

export default function Button({ label, onClick }) {
  return (
    <TouchableOpacity onPress={onClick}>
      <Text>{label}</Text>
    </TouchableOpacity>
  );
}
