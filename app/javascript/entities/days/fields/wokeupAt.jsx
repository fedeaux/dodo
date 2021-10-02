import { format } from "date-fns";
import TimeInput from "ui/inputs/time";
import Button from "ui/controls/button";
import { useApiUpdateDay } from "generated/api";

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

  const openForm = useCallback((e) => {
    setShowForm(true);
  }, []);

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

  const display = day.wokeupAt ? format(day.wokeupAt, "HH:mm") : "";

  return (
    <View onClick={openForm}>
      {showForm ? (
        <WokeupAtForm day={day} save={save} />
      ) : (
        <Text>{display}</Text>
      )}
    </View>
  );
}
