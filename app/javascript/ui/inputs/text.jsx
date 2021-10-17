import { TextInput as RNTextInput } from "react-native";

export default function TextInput({
  value,
  onChange,
  selectTextOnFocus = true,
  ...props
}) {
  const handleOnChange = useCallback((text) => {
    onChange({ value: text });
  });

  return (
    <RNTextInput
      value={value}
      style={tw("p-2 bg-gray-900 bg-opacity-60 rounded text-xl")}
      onChangeText={handleOnChange}
      selectTextOnFocus={selectTextOnFocus}
      {...props}
    />
  );
}
