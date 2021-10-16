import { format, setHours, setMinutes } from "date-fns";
import { TextInput } from "react-native";

export default function TimeInput({ value, onChange }) {
  const [textValue, setTextValue] = useState(format(value, "HH:mm"));

  const handleOnChange = useCallback((text) => {
    setTextValue(text);

    if (text.match(/\d\d:\d\d/)) {
      const parts = text.split(":");
      onChange({ value: setMinutes(setHours(value, parts[0]), parts[1]) });
    } else {
      onChange({ value: null });
    }
  });

  return (
    <TextInput
      autoFocus={true}
      value={textValue}
      style={tw("p-2 bg-gray-900 bg-opacity-60 rounded text-xl")}
      onChangeText={handleOnChange}
    />
  );
}
