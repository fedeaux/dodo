import TextInput from "ui/inputs/text";

export default function NumberInput({ value, onChange }) {
  const handleOnChange = useCallback(({ value }) => {
    onChange({ value: parseInt(value.replace(/\D/g, "")) });
  });

  return (
    <TextInput
      value={value + ""}
      style={tw("p-2 bg-gray-900 bg-opacity-60 rounded text-xl")}
      keyboardType="numeric"
      onChange={handleOnChange}
    />
  );
}
