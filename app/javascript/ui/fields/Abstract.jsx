import TimeInput from "ui/inputs/time";
import DurationInput from "ui/inputs/duration";
import TextInput from "ui/inputs/text";
import SelectInput from "ui/inputs/select";
import BoolInput from "ui/inputs/bool";
import NumberInput from "ui/inputs/number";

import FieldLabel from "ui/fields/Label";

const inputMap = {
  bool: BoolInput,
  number: NumberInput,
  text: TextInput,
  time: TimeInput,
  duration: DurationInput,
  select: SelectInput,
};

export default function AbstractField({
  name,
  label,
  type,
  onChange,
  wrapperTws = "",
  ...props
}) {
  const handleOnChange = useCallback(({ value }) => {
    if (onChange) {
      onChange({ [name]: value });
    }
  });

  const Input = inputMap[type];

  if (type == "bool") {
    return <Input {...props} label={label} onChange={handleOnChange} />;
  }

  return (
    <View style={tw("mt-4", wrapperTws)}>
      <FieldLabel label={label} />
      <Input {...props} onChange={handleOnChange} label={label} />
    </View>
  );
}
