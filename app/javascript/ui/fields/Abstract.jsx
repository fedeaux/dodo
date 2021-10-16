import TimeInput from "ui/inputs/time";
import TextInput from "ui/inputs/text";
import SelectInput from "ui/inputs/select";
import BoolInput from "ui/inputs/bool";

import FieldLabel from "ui/fields/Label";

const inputMap = {
  bool: BoolInput,
  text: TextInput,
  time: TimeInput,
  select: SelectInput,
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

  const Input = inputMap[type];

  if (type == "bool") {
    return (
      <View style={tw("mt-4 flex-row")}>
        <Input {...props} onChange={handleOnChange} />
        <FieldLabel label={label} tws="ml-2" />
      </View>
    );
  }

  return (
    <View style={tw("mt-4")}>
      <FieldLabel label={label} />
      <Input {...props} onChange={handleOnChange} />
    </View>
  );
}