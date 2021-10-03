import { format } from "date-fns";
import TimeInput from "ui/inputs/time";
import Button from "ui/controls/button";
import { useApiUpdateDay } from "generated/api";
import { TouchableOpacity } from "react-native";

function WokeupAtForm({ day, save }) {
  const [formWokeupAt, setFormWokeupAt] = useState(day.wokeupAt);

  const onChange = useCallback((e) => {
    setFormWokeupAt(e.value);
  }, []);

  const onSave = useCallback(() => {
    return save({ wokeupAt: formWokeupAt });
  }, [formWokeupAt]);

  return (
    <>
      <TimeInput value={day.wokeupAt || new Date()} onChange={onChange} />
      {formWokeupAt && <Button label="save" onClick={onSave} />}
    </>
  );
}

export default function DayFieldWokeupAt({ day }) {
  const [showForm, setShowForm] = useState(false);
  const { update, isLoading } = useApiUpdateDay();

  const openForm = useCallback(
    (e) => {
      setShowForm(true);
    },
    [day]
  );

  const save = useCallback(
    async (attributes) => {
      const response = await update({
        dayId: day.id,
        dayAttributes: attributes,
      });

      setShowForm(false);
    },
    [day.id]
  );

  const display = day.wokeupAt ? format(day.wokeupAt, "HH:mm") : "Wokeup ?";

  if (showForm) return <WokeupAtForm day={day} save={save} />;

  return (
    <TouchableOpacity onPress={openForm}>
      <View style={tw("p-2 rounded bg-gray-900 bg-opacity-60")}>
        <Text style={tw("text-blue-300 text-xs")}>{display}</Text>
      </View>
    </TouchableOpacity>
  );
}
