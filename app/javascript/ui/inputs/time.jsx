import { format, setHours, setMinutes } from "date-fns";
import { TextInput } from "react-native";

export default function TimeInput({ value, onChange }) {
  const [textValue, setTextValue] = useState(format(value, "HH:mm"));

  const handleOnChange = useCallback((text) => {
    setTextValue(text);

    if (text.match(/\d\d:\d\d/)) {
      const parts = text.split(":");
      onChange({ value: setMinutes(setHours(value, parts[0]), parts[1]) });
    }
  });

  return <TextInput value={textValue} onChangeText={handleOnChange} />;
}
