import { format, setHours, setMinutes } from "date-fns";
import { TextInput } from "react-native";
import PrimaryButton from "ui/controls/button/primary";

export default function TimeInput({ value, onChange }) {
  const [textValue, setTextValue] = useState(
    format(value || new Date(), "HH:mm")
  );

  const handleOnChange = useCallback((text) => {
    setTextValue(text);

    if (text.match(/\d\d:\d\d/)) {
      const parts = text.split(":");
      onChange({
        value: setMinutes(setHours(value || new Date(), parts[0]), parts[1]),
      });
    } else {
      onChange({ value: null });
    }
  });

  const setTimeToNow = useCallback(() => {
    const now = new Date();
    // onChange({ value: now });
    setTextValue(format(now, "HH:mm"));
  });

  return (
    <View style={tw("flex-row")}>
      <TextInput
        autoFocus={true}
        value={textValue}
        style={tw(
          "p-2 mr-2 bg-gray-900 bg-opacity-60 rounded text-xl flex-grow"
        )}
        onChangeText={handleOnChange}
      />
      <PrimaryButton label="Now" size="large" onClick={setTimeToNow} />
    </View>
  );
}
