import TextInput from "ui/inputs/text";
import SelectInput from "ui/inputs/select";

function FieldLabel({ label }) {
  return <Text style={tw("pb-1 text-blue-400")}>{label}</Text>;
}

const inputMap = {
  text: TextInput,
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

  return (
    <View style={tw("mt-4")}>
      <FieldLabel label={label} />
      <Input {...props} onChange={handleOnChange} />
    </View>
  );
}
