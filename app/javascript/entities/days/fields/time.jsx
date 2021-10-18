import TimeInput from "ui/inputs/time";
import { useApiUpdateDay } from "generated/api";
import { format } from "date-fns";

function DayTimeFieldDisplay({ value, prefix, triggerText }) {
  return value ? (
    <View style={tw("dodone-dodoable-trigger")}>
      <Text style={tw("dodone-dodoable-trigger-text")}>
        {prefix} {format(value, "HH:mm")}
      </Text>
    </View>
  ) : (
    <View style={tw("pending-dodoable-trigger")}>
      <Text style={tw("pending-dodoable-trigger-text")}>{triggerText}</Text>
    </View>
  );
}

export default function DayTimeField({ day, name, ...props }) {
  const { update, isLoading } = useApiUpdateDay();
  const [formValue, setFormValue] = useState(day[name]);

  const onChange = useCallback(({ value }) => {
    setFormValue(value);
  });

  const save = useCallback(() => {
    return update({ dayId: day.id, dayAttributes: { [name]: formValue } });
  }, [formValue]);

  return (
    <TimeInput
      value={formValue}
      onChange={onChange}
      onConfirm={save}
      Display={({ value }) => {
        return <DayTimeFieldDisplay value={value} {...props} />;
      }}
    />
  );
}
