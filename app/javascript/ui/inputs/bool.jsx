import { CheckBox } from "react-native";

export default function BoolInput({ value, onChange }) {
  const handleOnChange = useCallback((value) => {
    onChange({ value });
  });

  return (
    <CheckBox
      value={value}
      onValueChange={handleOnChange}
      /* style={tw("p-2 bg-gray-900 bg-opacity-60 rounded text-xl")} */
    />
  );
}
