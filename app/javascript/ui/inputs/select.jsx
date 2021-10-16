import useBoolState from "util/useBoolState";
import { TouchableOpacity } from "react-native";

export default function SelectInput({ value, options, onChange }) {
  const [selectOpen, closeSelect, openSelect] = useBoolState();

  const selectOption = useCallback(
    (value) => {
      onChange({ value });
      closeSelect();
    },
    [value, onChange]
  );

  const selectedOption = options.find((option) => {
    return option.value == value;
  });

  return (
    <TouchableOpacity onPress={openSelect}>
      <Text>{selectedOption?.label}</Text>

      {selectOpen &&
        options.map((option) => {
          return (
            <TouchableOpacity
              key={option.label}
              onPress={() => {
                return selectOption(option.value);
              }}
            >
              <Text>{option.label}</Text>
            </TouchableOpacity>
          );
        })}
    </TouchableOpacity>
  );
}
