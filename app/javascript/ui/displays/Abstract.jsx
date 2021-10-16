import { format } from "date-fns";
import FieldLabel from "ui/fields/Label";
import Icon from "react-native-vector-icons/FontAwesome";

function BoolDisplay({ value }) {
  return (
    <View style={tw("mt-2")}>
      {value ? (
        <Icon size={12} name="check" />
      ) : (
        <Icon size={12} name="close" />
      )}
    </View>
  );
}

function TextDisplay({ value }) {
  return (
    <View style={tw("mt-2")}>
      <Text style={tw("text-lg")}>{value}</Text>
    </View>
  );
}

function TimeDisplay({ value }) {
  return (
    <View style={tw("mt-2")}>
      {value ? (
        <Text style={tw("text-lg italic")}>{format(value, "HH:mm")}</Text>
      ) : (
        <Text style={tw("text-lg italic")}>Not set</Text>
      )}
    </View>
  );
}

function SelectDisplay({ value }) {
  return (
    <View style={tw("mt-2")}>
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

export default function AbstractField({
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