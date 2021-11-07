import PrimaryButton from "ui/controls/button/primary";
import CollectionInputItem from "ui/inputs/collection_item";

export default function CollectionInput({ value, onChange, fields, ...props }) {
  const handleOnChange = useCallback(({ index, ...payload }) => {
    const itemValue = { ...value[index], ...payload };
    value.splice(index, 1, itemValue);

    onChange({
      value,
    });
  });

  const removeItem = useCallback((index) => {
    value.splice(index, 1);

    onChange({
      value,
    });
  });

  const addItem = useCallback((index) => {
    const newValue = {};

    Object.values(fields).map((field) => {
      newValue[field.name] = field.default;
    });

    value.push(newValue);

    onChange({
      value,
    });
  });

  if (typeof value.map != "function") {
    return null;
  }

  return (
    <>
      <View style={tw("mb-2")}>
        {value.map((valueItem, valueIndex) => {
          return (
            <CollectionInputItem
              key={valueIndex}
              index={valueIndex}
              value={valueItem}
              fields={fields}
              onChange={handleOnChange}
              removeItem={removeItem}
            />
          );
        })}
      </View>
      <PrimaryButton label="add" onClick={addItem} />
    </>
  );
}
