import TextInput from "ui/inputs/text";
import SquareButton from "ui/controls/button/square";

export default function NumberInput({ value, onChange }) {
  const handleOnChange = useCallback(
    ({ value }) => {
      onChange({ value: parseInt(value.replace(/\D/g, "")) });
    },
    [onChange]
  );

  const minus = useCallback(() => {
    onChange({ value: parseInt(value) - 1 });
  }, [onChange, value]);

  const plus = useCallback(() => {
    onChange({ value: parseInt(value) + 1 });
  }, [onChange, value]);

  return (
    <View style={tw("flex-row items-center")}>
      <SquareButton onClick={minus} icon={{ name: "minus" }} size="input" />
      <TextInput
        value={value + ""}
        style={tw("p-2 bg-gray-900 bg-opacity-60 rounded flex-1 text-xl", {
          width: 10,
        })}
        keyboardType="numeric"
        onChange={handleOnChange}
      />
      <SquareButton onClick={plus} icon={{ name: "plus" }} size="input" />
    </View>
  );
}
