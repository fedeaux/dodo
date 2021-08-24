import { format, setHours, setMinutes } from "date-fns";

export default function TimeInput({ value, onChange }) {
  const [textValue, setTextValue] = useState(format(value, "HH:mm"));

  const handleOnChange = useCallback((e) => {
    const v = e.target.value;
    setTextValue(v);

    if (v.match(/\d\d:\d\d/)) {
      const parts = v.split(":");
      onChange(setMinutes(setHours(value, parts[0]), parts[1]));
    }
  });

  return <input value={textValue} onChange={handleOnChange} />;
}
