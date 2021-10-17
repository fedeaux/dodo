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
      {formWokeupAt && <Button label="Save" onClick={onSave} />}
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

  if (showForm) return <WokeupAtForm day={day} save={save} />;

  return (
    <TouchableOpacity onPress={openForm}>
      {day.wokeupAt ? (
        <View style={tw("dodone-dodoable-trigger")}>
          <Text style={tw("dodone-dodoable-trigger-text")}>
            Wokeup @ {format(day.wokeupAt, "HH:mm")}
          </Text>
        </View>
      ) : (
        <View style={tw("pending-dodoable-trigger")}>
          <Text style={tw("pending-dodoable-trigger-text")}>Track Woke Up</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}
