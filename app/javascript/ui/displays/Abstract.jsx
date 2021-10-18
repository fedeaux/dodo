import { format } from "date-fns";
import FieldLabel from "ui/fields/Label";
import Icon from "react-native-vector-icons/FontAwesome";
import TimeDisplay from "ui/displays/time";
import TextDisplay from "ui/displays/text";

function BoolDisplay({ value }) {
  return (
    <View style={tw("mt-1")}>
      {value ? (
        <Icon size={12} name="check" />
      ) : (
        <Icon size={12} name="close" />
      )}
    </View>
  );
}

function SelectDisplay({ value }) {
  return (
    <View style={tw("mt-1")}>
      <Text style={tw("text-lg")}>{value}</Text>
    </View>
  );
}

const displayMap = {
  bool: BoolDisplay,
  text: TextDisplay,
  time: TimeDisplay,
  select: SelectDisplay,
};

export default function AbstractDisplay({
  name,
  label,
  type,
  onChange,
  ...props
}) {
  const handleOnChange = useCallback(({ value }) => {
    if (onChange) {
      onChange({ [name]: value });
    }
  });

  const Display = displayMap[type];

  if (type == "bool") {
    return (
      <View style={tw("mt-4 flex-row")}>
        <FieldLabel label={label} />
        <Display {...props} onChange={handleOnChange} />
      </View>
    );
  }

  return (
    <View style={tw("mt-4")}>
      <FieldLabel label={label} />
      <Display {...props} onChange={handleOnChange} />
    </View>
  );
}
