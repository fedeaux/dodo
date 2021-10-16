import { TouchableOpacity } from "react-native";

export default function Button({ label, onClick, ...props }) {
  return (
    <TouchableOpacity onPress={onClick} {...props}>
      <Text>{label}</Text>
    </TouchableOpacity>
  );
}
